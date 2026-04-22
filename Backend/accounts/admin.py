from django.contrib import admin
from .models import StudentProfile


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'program', 'fee_balance', 'is_student', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'program']
    list_editable = ['fee_balance']