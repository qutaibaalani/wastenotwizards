from django.urls import path
from .views import (
    ProviderListCreateView,
    ReceiverListView,
    ProviderProfileView,
    ReceiverProfileView,
    PostListView,
    ReceiverReservationListView,
)

urlpatterns = [
    # Provider URLs \ listing and creating providers
    path("providers/", ProviderListCreateView.as_view(), name="provider-list-create"),
    # For accessing a provider's profile
    path(
        "providers/<str:user__username>/",
        ProviderProfileView.as_view(),
        name="provider-profile",
    ),
    # Receiver URLs \ for listing receivers
    path("receivers/", ReceiverListView.as_view(), name="receiver-list"),
    # For accessing a receiver's profile
    path(
        "receivers/<str:user__username>/",
        ReceiverProfileView.as_view(),
        name="receiver-profile",
    ),
    # Post URLs \ for listing posts
    path("posts/", PostListView.as_view(), name="post-list"),
    # Reservation URLs \ for listing reservations for a specific receiver
    path(
        "reservations/<str:receiver__user__username>/",
        ReceiverReservationListView.as_view(),
        name="receiver-reservation-list",
    ),
]
