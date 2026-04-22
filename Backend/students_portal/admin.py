from django.contrib import admin
from .models import Announcement, FeeRecord


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display  = ['title', 'is_active', 'created_at']
    list_editable = ['is_active']
    search_fields = ['title']


@admin.register(FeeRecord)
class FeeRecordAdmin(admin.ModelAdmin):
    list_display  = ['student', 'description', 'amount', 'paid', 'status', 'due_date']
    list_filter   = ['status']
    list_editable = ['paid', 'status']
    search_fields = ['student__email', 'student__first_name']

from .models import ModuleProgress

@admin.register(ModuleProgress)
class ModuleProgressAdmin(admin.ModelAdmin):
    list_display  = ['student', 'module', 'completed', 'completed_at']
    list_filter   = ['completed']
    search_fields = ['student__email', 'module__title']