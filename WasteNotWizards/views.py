from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from .models import User, Provider, Receiver, Post, Reservation
from .serializers import ProviderListSerializer

# Create your views here.

class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer

#Receiver List, Provider Profile, Receiver Profile, Post list, Receiver Reservation list