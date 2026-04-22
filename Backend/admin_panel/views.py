from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.contrib.auth.models import User

from admissions.models import Application
from contact.models import ContactMessage
from accounts.models import StudentProfile
from students_portal.models import Announcement
from newsletter.models import Subscriber

from .serializers import (
    AdminApplicationSerializer,
    AdminStudentSerializer,
    AdminMessageSerializer,
    UpdateApplicationStatusSerializer,
    UpdateFeeSerializer,
    AnnouncementSerializer,
    AdminStatsSerializer,
)


class AdminStatsView(APIView):
    """GET /api/admin/stats/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        data = {
            'total_applications':   Application.objects.count(),
            'pending_applications': Application.objects.filter(status='pending').count(),
            'accepted_applications': Application.objects.filter(status='accepted').count(),
            'total_students':       User.objects.filter(is_staff=False).count(),
            'total_messages':       ContactMessage.objects.count(),
            'unread_messages':      ContactMessage.objects.filter(is_read=False).count(),
            'total_subscribers':    Subscriber.objects.filter(is_active=True).count(),
        }
        serializer = AdminStatsSerializer(data)
        return Response(serializer.data)


class AdminApplicationListView(APIView):
    """GET /api/admin/applications/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        status_filter = request.query_params.get('status')
        qs = Application.objects.all()
        if status_filter:
            qs = qs.filter(status=status_filter)
        serializer = AdminApplicationSerializer(qs, many=True)
        return Response(serializer.data)


class AdminApplicationDetailView(APIView):
    """PATCH /api/admin/applications/<id>/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, pk):
        try:
            application = Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateApplicationStatusSerializer(
            application, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(AdminApplicationSerializer(application).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminStudentListView(APIView):
    """GET /api/admin/students/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        students = User.objects.filter(
            is_staff=False
        ).select_related('student_profile')
        serializer = AdminStudentSerializer(students, many=True)
        return Response(serializer.data)


class AdminStudentFeeView(APIView):
    """PATCH /api/admin/students/<id>/fees/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, pk):
        try:
            profile = StudentProfile.objects.get(user__pk=pk)
        except StudentProfile.DoesNotExist:
            return Response({'error': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateFeeSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Fee balance updated.', 'fee_balance': str(profile.fee_balance)})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminMessageListView(APIView):
    """GET /api/admin/messages/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        messages = ContactMessage.objects.all()
        serializer = AdminMessageSerializer(messages, many=True)
        return Response(serializer.data)


class AdminMessageDetailView(APIView):
    """PATCH /api/admin/messages/<id>/ — mark as read"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, pk):
        try:
            message = ContactMessage.objects.get(pk=pk)
        except ContactMessage.DoesNotExist:
            return Response({'error': 'Message not found.'}, status=status.HTTP_404_NOT_FOUND)

        message.is_read = True
        message.save(update_fields=['is_read'])
        return Response({'message': 'Marked as read.'})


class AdminAnnouncementView(APIView):
    """
    GET  /api/admin/announcements/  — list all
    POST /api/admin/announcements/  — create new
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        announcements = Announcement.objects.all()
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminAnnouncementDetailView(APIView):
    """DELETE /api/admin/announcements/<id>/"""
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, pk):
        try:
            announcement = Announcement.objects.get(pk=pk)
        except Announcement.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        announcement.delete()
        return Response({'message': 'Announcement deleted.'})