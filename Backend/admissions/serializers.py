from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Application
        fields = [
            'id', 'full_name', 'email', 'phone',
            'program', 'qualification', 'institution',
        ]

    def validate_phone(self, value):
        if len(value.strip()) < 7:
            raise serializers.ValidationError('Enter a valid phone number.')
        return value