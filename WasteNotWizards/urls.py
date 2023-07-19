from django.urls import path
from WasteNotWizards import views

urlpatterns = [
    path('api/profile/<username>/', views.ProfileViewSet.as_view(), name='user_detail')
]
