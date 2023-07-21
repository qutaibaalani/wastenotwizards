from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from .models import User, Provider, Post, Reservation
from .serializers import (
    ProviderListSerializer,
    PostListSerializer,
    ReservationSerializer,
    ProfileSerializer,
)


def home(request):
    return render(request, "index.html")


# Create your views here.


# -----------------------------------------LOG IN VIEWS-----------------------------------
class ProfileViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "username"


# -----------------------------------------PROVIDER VIEWS-----------------------------------


# -----------------------------------------GENERICS----------------------------------


class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer


# For listing instances of the `Post` model.
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


# For listing reservations related to a `Receiver` instance.
class ReceiverReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    # The `lookup_field` is set to "receiver__user__username" to retrieve reservations based on the username of the associated receiver's user.
    lookup_field = "receiver__user__username"
