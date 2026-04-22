from django.db import models
from django.contrib.auth.models import User


class Announcement(models.Model):
    title      = models.CharField(max_length=200)
    body       = models.TextField()
    is_active  = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class FeeRecord(models.Model):
    STATUS_CHOICES = [
        ('paid',    'Paid'),
        ('partial', 'Partial'),
        ('unpaid',  'Unpaid'),
    ]

    student     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fee_records')
    description = models.CharField(max_length=200)
    amount      = models.DecimalField(max_digits=10, decimal_places=2)
    paid        = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status      = models.CharField(max_length=10, choices=STATUS_CHOICES, default='unpaid')
    due_date    = models.DateField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.student.get_full_name()} — {self.description}'

    @property
    def balance(self):
        return self.amount - self.paid


class ModuleProgress(models.Model):
    student      = models.ForeignKey(User, on_delete=models.CASCADE, related_name='module_progress')
    course       = models.ForeignKey('courses.Course', on_delete=models.CASCADE)
    module       = models.ForeignKey('courses.CourseModule', on_delete=models.CASCADE)
    completed    = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['student', 'module']
        ordering        = ['module__order']

    def __str__(self):
        status = '✓' if self.completed else '○'
        return f'{status} {self.student.get_full_name()} — {self.module.title}'