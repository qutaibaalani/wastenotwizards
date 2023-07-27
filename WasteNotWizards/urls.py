from django.urls import path
from WasteNotWizards import views


urlpatterns = [
    path("profile/<username>/", views.ProfileViewSet.as_view(), name="user_detail"),
    path("posts", views.AllPostView.as_view(), name="post_list"),
    path("api/posts/<int:pk>/", views.OnePostView.as_view(), name="post_detail"),
    path(
        "profile/<username>/posts/",
        views.ProviderPostsView.as_view(),
        name="posts-created",
    ),
    path(
        "reservations/receiver/<str:username>/",
        views.ReceiverReservationListView.as_view(),
        name="receiver_reservation_list",
    ),
    path(
        "api/reservations/<int:pk>/",
        views.ReservationUpdateDestroyView.as_view(),
        name="reservation_detail",
    ),
    path("geocode", views.geocode_user_address, name="geocode"),
    path("post-addresses", views.postAddresses.as_view(), name="post-addresses")
]
