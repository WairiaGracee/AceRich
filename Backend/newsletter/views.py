from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Subscriber
from .serializers import SubscriberSerializer


class SubscribeView(APIView):
    """POST /api/newsletter/subscribe/"""

    def post(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            subscriber, created = Subscriber.objects.get_or_create(email=email)

            if not created and subscriber.is_active:
                return Response(
                    {'message': 'You are already subscribed!'},
                    status=status.HTTP_200_OK
                )

            subscriber.is_active = True
            subscriber.save(update_fields=['is_active'])

            return Response(
                {'message': 'Thank you for subscribing!'},
                status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UnsubscribeView(APIView):
    """POST /api/newsletter/unsubscribe/"""

    def post(self, request):
        email = request.data.get('email', '').strip()
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            subscriber = Subscriber.objects.get(email=email)
            subscriber.is_active = False
            subscriber.save(update_fields=['is_active'])
            return Response({'message': 'You have been unsubscribed successfully.'})
        except Subscriber.DoesNotExist:
            return Response({'error': 'Email not found.'}, status=status.HTTP_404_NOT_FOUND)