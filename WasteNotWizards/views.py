from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
)
from .models import User, Provider, Post, Reservation
from .serializers import (
    ProviderListSerializer,
    PostListSerializer,
    ReservationSerializer,
    ProfileSerializer,
    PostAddressSerializer,
)
from django.http import JsonResponse
from .utils import get_coordinates_from_address, geocode_address
from django.views.decorators.csrf import csrf_exempt
from .models import User, Post


@csrf_exempt
def geocode_addresses_post(request):
    posts = Post.objects.all()
    pins = []

    for post in posts:
        latitude, longitude = geocode_address(post.address)
        post.latitude = latitude
        post.longitude = longitude
        pins.append([longitude, latitude])
        post.save()

    return JsonResponse({"status": "success", "pins": pins})

@csrf_exempt
def geocode_addresses_user(request):
    users = User.objects.all()
    permission_classes = [IsAuthenticated]
    latitude, longitude = geocode_address(request.user.address)
    request.user.user_latitude = latitude
    request.user.user_longitude = longitude
    request.user.save()

    return JsonResponse({"status": "success", "latitude": latitude, "longitude": longitude})


@csrf_exempt
def geocode_user_address(request):
    if request.method == "POST":
        address = request.POST.get("address")
        access_token ='sk.eyJ1IjoiZXhvMzAiLCJhIjoiY2xra21rMHJvMDM0NDNqbzVuNXQ5M3l4ciJ9.-g5BHTGRGDy1DT9wfrGfNQ'  # Replace this with your actual Mapbox access token

        latitude, longitude = get_coordinates_from_address(address, access_token)

        if latitude is not None and longitude is not None:
            # Save the latitude and longitude to your UserAddress model and return a success response
            # (code for saving to the database is omitted here)
            return JsonResponse({"status": "success", "latitude": latitude, "longitude": longitude})
        else:
            return JsonResponse({"status": "error", "message": "Invalid address or geocoding failed."})


# ----------------------------------------- GENERAL VIEWS -----------------------------------


# Home view for rendering the index.html template
def home(request):
    return render(request, "index.html")


# ----------------------------------------- LOG IN VIEWS -----------------------------------


# View for retrieving, updating, and deleting user profiles
class ProfileViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "username"
    # Only authenticated users can access this view
    permission_classes = [IsAuthenticated]


# ----------------------------------------- PROVIDER VIEWS -----------------------------------


# View for listing and creating providers
class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer
    # # Only admin users can create providers
    permission_classes = [IsAdminUser]


# View for listing posts related to a provider
class ProviderPostsView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    # Only authenticated users can access this view
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            # If authenticated, return posts posted by the authenticated user
            return Post.objects.filter(posted_by_user=self.request.user)
        else:
            # If anonymous, return an empty queryset to indicate no posts are available.
            return Post.objects.none()


# View for retrieving, updating, and deleting a specific post
class OnePostView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    # Authenticated users can update/delete, everyone can read
    permission_classes = [IsAuthenticatedOrReadOnly]

class postAddresses(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostAddressSerializer


# -----------------------------------------RECEIVER VIEWS----------------------------------


# View for listing and creating all posts
class AllPostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    # Authenticated users can create, everyone can read
    permission_classes = [IsAuthenticatedOrReadOnly]


# View for listing reservations related to a receiver instance
class ReceiverReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    # The `lookup_field` is set to "username" to retrieve reservations based on the username of the associated receiver's user.
    lookup_field = "username"
    # Only authenticated users can access this view
    permission_classes = [IsAuthenticated]


# View for retrieving, updating, and deleting a specific reservation
class ReservationUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    # Only authenticated users can access this view
    permission_classes = [IsAuthenticated]
