from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/',          admin.site.urls),
    path('api/auth/',       include('accounts.urls')),
    path('api/courses/',    include('courses.urls')),
    path('api/admissions/', include('admissions.urls')),
    path('api/contact/',    include('contact.urls')),
    path('api/newsletter/', include('newsletter.urls')),
    path('api/students/',    include('students_portal.urls')),
    path('api/admin-panel/', include('admin_panel.urls')),
]

