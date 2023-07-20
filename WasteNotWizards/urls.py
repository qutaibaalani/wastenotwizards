from django.urls import path
from WasteNotWizards import views


urlpatterns = [
    path("api/profile/<username>/", views.ProfileViewSet.as_view(), name="user_detail"),
    path("api/posts/", views.PostListView.as_view(), name="post_list"),
    path(
        "api/reservations/receiver/<str:username>/",
        views.ReceiverReservationListView.as_view(),
        name="receiver_reservation_list",
    ),
]
