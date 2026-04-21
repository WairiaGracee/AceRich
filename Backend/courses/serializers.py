from rest_framework import serializers
from .models import Category, Course, CourseOutcome, CourseModule


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class CourseOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOutcome
        fields = ['id', 'text', 'order']


class CourseModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseModule
        fields = ['id', 'title', 'order']


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight — used on the /programs listing page"""
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'category_name',
            'image_url', 'description', 'duration', 'level', 'mode', 'intake',
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    """Full detail — used on the /programs/:courseId page"""
    category_name  = serializers.CharField(source='category.name', read_only=True)
    level_display  = serializers.CharField(source='get_level_display', read_only=True)
    mode_display   = serializers.CharField(source='get_mode_display', read_only=True)
    what_you_learn = CourseOutcomeSerializer(source='outcomes', many=True, read_only=True)
    modules        = CourseModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'slug', 'category_name',
            'image_url', 'description', 'overview',
            'duration', 'level', 'level_display',
            'mode', 'mode_display', 'intake',
            'what_you_learn', 'modules',
        ]