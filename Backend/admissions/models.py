from django.db import models


class Application(models.Model):
    STATUS_CHOICES = [
        ('pending',      'Pending Review'),
        ('shortlisted',  'Shortlisted'),
        ('accepted',     'Accepted'),
        ('rejected',     'Rejected'),
    ]
    QUALIFICATION_CHOICES = [
        ('kcse',     'KCSE Certificate'),
        ('diploma',  'Diploma'),
        ('bachelor', "Bachelor's Degree"),
        ('other',    'Other'),
    ]
    PROGRAM_CHOICES = [
        ('computer',     'Computer Packages'),
        ('catering',     'Catering'),
        ('baking',       'Baking & Pastry'),
        ('beauty',       'Beauty Therapy / Cosmetology'),
        ('hairdressing', 'Hairdressing'),
        ('barbering',    'Barbering'),
        ('housekeeping', 'Housekeeping & Front Office'),
    ]

    full_name     = models.CharField(max_length=200)
    email         = models.EmailField()
    phone         = models.CharField(max_length=30)
    program       = models.CharField(max_length=50, choices=PROGRAM_CHOICES)
    qualification = models.CharField(max_length=20, choices=QUALIFICATION_CHOICES)
    institution   = models.CharField(max_length=200)
    status        = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes         = models.TextField(blank=True)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.full_name} — {self.get_program_display()} ({self.status})'