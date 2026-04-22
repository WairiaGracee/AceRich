from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from admissions.models import Application
from .models import StudentProfile


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name  = serializers.CharField(max_length=100)
    email      = serializers.EmailField()
    password   = serializers.CharField(min_length=6, write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def create(self, validated_data):
        # Check if they have an application with this email
        application = Application.objects.filter(
            email=validated_data['email']
        ).first()

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        # Create student profile
        StudentProfile.objects.create(
            user=user,
            phone=application.phone if application else '',
            program=application.get_program_display() if application else '',
        )

        return user


class LoginSerializer(serializers.Serializer):
    email    = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data['email'],
            password=data['password']
        )
        if not user:
            raise serializers.ValidationError('Invalid email or password.')
        if not user.is_active:
            raise serializers.ValidationError('This account has been disabled.')
        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    is_admin   = serializers.SerializerMethodField()
    fee_balance = serializers.SerializerMethodField()
    program    = serializers.SerializerMethodField()
    phone      = serializers.SerializerMethodField()

    class Meta:
        model  = User
        fields = [
            'id', 'first_name', 'last_name', 'email',
            'is_admin', 'fee_balance', 'program', 'phone'
        ]

    def get_is_admin(self, obj):
        return obj.is_staff

    def get_fee_balance(self, obj):
        if hasattr(obj, 'student_profile'):
            return str(obj.student_profile.fee_balance)
        return None

    def get_program(self, obj):
        if hasattr(obj, 'student_profile'):
            return obj.student_profile.program
        return None

    def get_phone(self, obj):
        if hasattr(obj, 'student_profile'):
            return obj.student_profile.phone
        return None