from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from admissions.models import Application
from .models import Announcement, FeeRecord, ModuleProgress
from .serializers import (
    StudentDashboardSerializer,
    AnnouncementSerializer,
    FeeRecordSerializer,
)

from django.utils import timezone
from courses.models import CourseModule, Course


class StudentDashboardView(APIView):
    """GET /api/student/dashboard/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user    = request.user
        profile = user.student_profile

        # Find their application by email
        application = Application.objects.filter(
            email=user.email
        ).order_by('-created_at').first()

        # Get their fee records
        fee_records = FeeRecord.objects.filter(student=user)

        # Get active announcements
        announcements = Announcement.objects.filter(is_active=True)
        # Get their module progress
        progress = ModuleProgress.objects.filter(
            student=user
        ).select_related('module', 'course')


        data = {
            'full_name':     user.get_full_name(),
            'email':         user.email,
            'phone':         profile.phone,
            'program':       profile.program,
            'fee_balance':   profile.fee_balance,
            'app_status':    application.get_status_display() if application else 'No application found',
            'announcements': AnnouncementSerializer(announcements, many=True).data,
            'fee_records':   FeeRecordSerializer(fee_records, many=True).data,
            'module_progress': ModuleProgressSerializer(progress, many=True).data,
        }

        return Response(data)


class StudentFeesView(APIView):
    """GET /api/student/fees/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        fee_records = FeeRecord.objects.filter(student=request.user)
        return Response(FeeRecordSerializer(fee_records, many=True).data)


class ModuleProgressView(APIView):
    """
    GET  /api/student/progress/        — get all module progress
    POST /api/student/progress/        — toggle a module complete/incomplete
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        progress = ModuleProgress.objects.filter(
            student=request.user
        ).select_related('module', 'course')
        from .serializers import ModuleProgressSerializer
        return Response(ModuleProgressSerializer(progress, many=True).data)

    def post(self, request):
        module_id = request.data.get('module_id')
        if not module_id:
            return Response(
                {'error': 'module_id is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            module = CourseModule.objects.get(pk=module_id)
        except CourseModule.DoesNotExist:
            return Response(
                {'error': 'Module not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        progress, created = ModuleProgress.objects.get_or_create(
            student=request.user,
            module=module,
            defaults={'course': module.course}
        )

        # Toggle completed state
        progress.completed = not progress.completed
        progress.completed_at = timezone.now() if progress.completed else None
        progress.save()

        from .serializers import ModuleProgressSerializer
        return Response(ModuleProgressSerializer(progress).data)