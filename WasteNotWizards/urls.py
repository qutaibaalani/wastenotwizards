from django.urls import path
from WasteNotWizards import views

# URL patterns for the app
urlpatterns = [
    # To retrieve, update, and delete a user's profile
    path("profile/<username>/", views.ProfileViewSet.as_view(), name="user_detail"),
    # To list and create all posts
    path("posts", views.AllPostView.as_view(), name="post_list"),
    # To retrieve, update, and delete a specific post
    path("posts/<int:pk>/", views.OnePostView.as_view(), name="post_detail"),
    # To list posts created by a provider based on the username
    path(
        "profile/<username>/posts/",
        views.ProviderPostsView.as_view(),
        name="posts-created",
    ),
    # To list reservations related to a receiver based on the username
    path(
        "reservations/receiver/<int:pk>/",
        views.ReceiverReservationListView.as_view(),
        name="receiver_reservation_list",
    ),
    # To retrieve, update, and delete a specific reservation
    path(
        "reservations/<int:pk>/",
        views.ReservationUpdateDestroyView.as_view(),
        name="reservation_detail",
    ),
    # This path is for geocoding a user's address.
    path("geocode", views.geocode_user_address, name="geocode"),
    # This path is for geocoding addresses related to a user.
    path("user/geocode", views.geocode_addresses_user, name="geocode_user"),
    # This path is for geocoding addresses related to posts.
    path("posts/geocode", views.geocode_addresses_post, name="geocode_posts"),
    # This path is for accessing and handling post addresses.
    path("post-addresses", views.postAddresses.as_view(), name="post-addresses"),
    # This path is for getting nearby coordinates for posts.
    path("closePosts", views.get_nearby_coordinates, name="closePosts"),
    # This path is for getting reserved posts.
    path("reservedPosts", views.get_reserved_posts, name="reserved_posts"),
]
