from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationCreateView(APIView):
    """POST /api/admissions/apply/"""

    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            application = serializer.save()
            self._send_notification(application)
            return Response(
                {'message': 'Application received. We will contact you within 2–3 business days.'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _send_notification(self, app):
        subject = f'[AceRich] New Application — {app.get_program_display()}'
        body = (
            f'A new application has been submitted.\n\n'
            f'Name:          {app.full_name}\n'
            f'Email:         {app.email}\n'
            f'Phone:         {app.phone}\n'
            f'Program:       {app.get_program_display()}\n'
            f'Qualification: {app.get_qualification_display()}\n'
            f'Institution:   {app.institution}\n'
        )
        try:
            send_mail(
                subject, body,
                'noreply@acerich.ac.ke',
                [settings.ADMISSIONS_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass