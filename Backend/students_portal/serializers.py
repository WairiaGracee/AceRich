from rest_framework import serializers
from .models import Announcement, FeeRecord, ModuleProgress
from admissions.models import Application


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Announcement
        fields = ['id', 'title', 'body', 'created_at']


class FeeRecordSerializer(serializers.ModelSerializer):
    balance = serializers.ReadOnlyField()

    class Meta:
        model  = FeeRecord
        fields = ['id', 'description', 'amount', 'paid', 'balance', 'status', 'due_date', 'created_at']


class ModuleProgressSerializer(serializers.ModelSerializer):
    module_title = serializers.CharField(source='module.title', read_only=True)
    module_order = serializers.IntegerField(source='module.order', read_only=True)

    class Meta:
        model  = ModuleProgress
        fields = ['id', 'module', 'module_title', 'module_order', 'completed', 'completed_at']


class StudentDashboardSerializer(serializers.Serializer):
    """Assembles everything a student needs in one response."""
    full_name       = serializers.CharField()
    email           = serializers.CharField()
    phone           = serializers.CharField()
    program         = serializers.CharField()
    fee_balance     = serializers.DecimalField(max_digits=10, decimal_places=2)
    app_status      = serializers.CharField()
    announcements   = AnnouncementSerializer(many=True)
    fee_records     = FeeRecordSerializer(many=True)
    module_progress = ModuleProgressSerializer(many=True)