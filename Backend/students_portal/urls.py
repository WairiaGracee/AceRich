from django.urls import path
from .views import StudentDashboardView, StudentFeesView, ModuleProgressView

urlpatterns = [
    path('dashboard/', StudentDashboardView.as_view(), name='student-dashboard'),
    path('fees/',      StudentFeesView.as_view(),      name='student-fees'),
    path('progress/',  ModuleProgressView.as_view(),   name='module-progress'),
]
