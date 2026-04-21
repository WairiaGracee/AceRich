from django.urls import path
from .views import CategoryListView, CourseListView, CourseDetailView

urlpatterns = [
    path('',               CourseListView.as_view(),    name='course-list'),
    path('categories/',    CategoryListView.as_view(),  name='category-list'),
    path('<int:pk>/',      CourseDetailView.as_view(),  name='course-detail'),
]