from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from .models import User, Provider, Receiver, Post, Reservation
from .serializers import (
    ProviderListSerializer,
    ReceiverListSerializer,
    ProviderProfileSerializer,
    ReceiverProfileSerializer,
    PostListSerializer,
    ReservationListSerializer,
)

# Create your views here.

# Receiver List, Provider Profile, Receiver Profile, Post list, Receiver Reservation list


# For listing and creating instances of the `Provider` model.
class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer


# For listing instances of the `Receiver` model.
class ReceiverListView(generics.ListAPIView):
    queryset = Receiver.objects.all()
    serializer_class = ReceiverListSerializer


# For retrieving and updating the profile of a `Provider` instance.
class ProviderProfileView(generics.RetrieveUpdateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderProfileSerializer
    # The `lookup_field` is set to "user__username" to retrieve the profile based on the username of the associated user.
    lookup_field = "user__username"


# For retrieving and updating the profile of a `Receiver` instance.
class ReceiverProfileView(generics.RetrieveUpdateAPIView):
    queryset = Receiver.objects.all()
    serializer_class = ReceiverProfileSerializer
    # The `lookup_field` is set to "user__username" to retrieve the profile based on the username of the associated user.
    lookup_field = "user__username"


# For listing instances of the `Post` model.
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


# For listing reservations related to a `Receiver` instance.
class ReceiverReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationListSerializer
    # The `lookup_field` is set to "receiver__user__username" to retrieve reservations based on the username of the associated receiver's user.
    lookup_field = "receiver__user__username"
