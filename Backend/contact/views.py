from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

from .serializers import ContactMessageSerializer


class ContactMessageCreateView(APIView):
    """POST /api/contact/"""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            msg = serializer.save()
            self._forward_to_inbox(msg)
            return Response(
                {'message': 'Thank you! Your message has been sent successfully.'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _forward_to_inbox(self, msg):
        subject = f'[AceRich Contact] {msg.subject}'
        body = (
            f'New message from the website.\n\n'
            f'From:    {msg.full_name} <{msg.email}>\n'
            f'Subject: {msg.subject}\n\n'
            f'Message:\n{msg.message}'
        )
        try:
            send_mail(
                subject, body,
                msg.email,
                [settings.CONTACT_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass