from django.urls import path
from .views import (
    AdminStatsView,
    AdminApplicationListView,
    AdminApplicationDetailView,
    AdminStudentListView,
    AdminStudentFeeView,
    AdminMessageListView,
    AdminMessageDetailView,
    AdminAnnouncementView,
    AdminAnnouncementDetailView,
)

urlpatterns = [
    path('stats/',                        AdminStatsView.as_view(),               name='admin-stats'),
    path('applications/',                 AdminApplicationListView.as_view(),      name='admin-applications'),
    path('applications/<int:pk>/',        AdminApplicationDetailView.as_view(),    name='admin-application-detail'),
    path('students/',                     AdminStudentListView.as_view(),          name='admin-students'),
    path('students/<int:pk>/fees/',       AdminStudentFeeView.as_view(),           name='admin-student-fees'),
    path('messages/',                     AdminMessageListView.as_view(),          name='admin-messages'),
    path('messages/<int:pk>/',            AdminMessageDetailView.as_view(),        name='admin-message-detail'),
    path('announcements/',                AdminAnnouncementView.as_view(),         name='admin-announcements'),
    path('announcements/<int:pk>/',       AdminAnnouncementDetailView.as_view(),   name='admin-announcement-detail'),
]