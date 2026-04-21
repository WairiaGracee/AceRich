from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from .models import Category, Course
from .serializers import (
    CategorySerializer,
    CourseListSerializer,
    CourseDetailSerializer,
)


class CategoryListView(generics.ListAPIView):
    """GET /api/courses/categories/"""
    queryset         = Category.objects.all()
    serializer_class = CategorySerializer


class CourseListView(generics.ListAPIView):
    """
    GET /api/courses/
    GET /api/courses/?category=catering
    GET /api/courses/?search=baking
    """
    serializer_class = CourseListSerializer
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['title', 'description', 'category__name']

    def get_queryset(self):
        qs = Course.objects.filter(is_active=True).select_related('category')
        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        return qs


class CourseDetailView(APIView):
    """GET /api/courses/<id>/"""

    def get(self, request, pk):
        try:
            course = (
                Course.objects
                .prefetch_related('outcomes', 'modules')
                .select_related('category')
                .get(pk=pk, is_active=True)
            )
        except Course.DoesNotExist:
            raise NotFound('Course not found.')

        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)