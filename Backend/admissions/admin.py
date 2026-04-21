from django.contrib import admin
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display    = ['full_name', 'email', 'phone', 'program', 'qualification', 'status', 'created_at']
    list_filter     = ['status', 'program', 'qualification']
    search_fields   = ['full_name', 'email', 'phone']
    list_editable   = ['status']
    readonly_fields = ['created_at', 'updated_at']
    ordering        = ['-created_at']