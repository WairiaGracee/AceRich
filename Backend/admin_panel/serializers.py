from rest_framework import serializers
from django.contrib.auth.models import User
from admissions.models import Application
from contact.models import ContactMessage
from accounts.models import StudentProfile
from students_portal.models import FeeRecord, Announcement


class AdminApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Application
        fields = [
            'id', 'full_name', 'email', 'phone',
            'program', 'qualification', 'institution',
            'status', 'notes', 'created_at',
        ]


class AdminStudentSerializer(serializers.ModelSerializer):
    full_name   = serializers.SerializerMethodField()
    email       = serializers.SerializerMethodField()
    fee_balance = serializers.DecimalField(
        source='student_profile.fee_balance',
        max_digits=10, decimal_places=2
    )
    program     = serializers.CharField(source='student_profile.program')
    phone       = serializers.CharField(source='student_profile.phone')

    class Meta:
        model  = User
        fields = ['id', 'full_name', 'email', 'phone', 'program', 'fee_balance']

    def get_full_name(self, obj):
        return obj.get_full_name()

    def get_email(self, obj):
        return obj.email


class AdminMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactMessage
        fields = ['id', 'full_name', 'email', 'subject', 'message', 'is_read', 'created_at']


class UpdateApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Application
        fields = ['status', 'notes']


class UpdateFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model  = StudentProfile
        fields = ['fee_balance']


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Announcement
        fields = ['id', 'title', 'body', 'is_active', 'created_at']


class AdminStatsSerializer(serializers.Serializer):
    total_applications  = serializers.IntegerField()
    pending_applications = serializers.IntegerField()
    accepted_applications = serializers.IntegerField()
    total_students      = serializers.IntegerField()
    total_messages      = serializers.IntegerField()
    unread_messages     = serializers.IntegerField()
    total_subscribers   = serializers.IntegerField()