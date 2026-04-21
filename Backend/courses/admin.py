from django.contrib import admin
from .models import Category, Course, CourseOutcome, CourseModule


class CourseOutcomeInline(admin.TabularInline):
    model = CourseOutcome
    extra = 3
    fields = ['text', 'order']


class CourseModuleInline(admin.TabularInline):
    model = CourseModule
    extra = 3
    fields = ['title', 'order']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display  = ['title', 'category', 'level', 'duration', 'is_active', 'order']
    list_filter   = ['category', 'level', 'mode', 'is_active']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_active', 'order']
    inlines       = [CourseOutcomeInline, CourseModuleInline]
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'slug', 'category', 'description', 'overview', 'is_active', 'order'),
        }),
        ('Course Details', {
            'fields': ('duration', 'level', 'mode', 'intake'),
        }),
        ('Image', {
            'fields': ('image_url',),
        }),
    )