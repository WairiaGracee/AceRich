from django.db import models
from django.contrib.auth.models import User


class StudentProfile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    phone       = models.CharField(max_length=30, blank=True)
    program     = models.CharField(max_length=100, blank=True)
    fee_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_student  = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.get_full_name()} — {self.program}'