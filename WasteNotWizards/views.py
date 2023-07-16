from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from .models import User, Provider, Receiver, Post, Reservation
from .serializers import ProviderListSerializer

# Create your views here.

# Receiver List, Provider Profile, Receiver Profile, Post list, Receiver Reservation list


# View for listing and creating Provider objects
class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer


# View for listing Receiver objects
class ReceiverListView(generics.ListAPIView):
    queryset = Receiver.objects.all()
    serializer_class = ReceiverSerializer


# View for retrieving and updating Provider profile
class ProviderProfileView(generics.RetrieveUpdateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    lookup_field = "user__username"


# View for retrieving and updating Receiver profile
class ReceiverProfileView(generics.RetrieveUpdateAPIView):
    queryset = Receiver.objects.all()
    serializer_class = ReceiverSerializer
    lookup_field = "user__username"


# View for listing Post objects
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# View for listing Receiver reservations
class ReceiverReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = "receiver__user__username"
