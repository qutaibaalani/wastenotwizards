from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
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
from django.db.models import F
from django.contrib.gis.measure import Distance as DistanceFunc

@csrf_exempt
def get_nearby_coordinates(request):
    user_latitude = float(request.GET.get('latitude', 0))
    user_longitude = float(request.GET.get('longitude', 0))
    radius = 10 # 0.1 degrees as an example radius, adjust as needed

    # Calculate the bounding box for the search area
    min_latitude = user_latitude - radius
    max_latitude = user_latitude + radius
    min_longitude = user_longitude - radius
    max_longitude = user_longitude + radius

    # Filter coordinates within the bounding box
    nearby_coordinates = Post.objects.filter(
        latitude__range=(min_latitude, max_latitude),
        longitude__range=(min_longitude, max_longitude)
    )

    data = [{
        'id': coord.id,
        'foodlist': coord.food_list,
        'user_long': user_longitude,
        'user_lat': user_latitude,
        'latitude': coord.latitude,
        'longitude': coord.longitude,
        'address': coord.address,
        'posted_by': coord.posted_by_user
    } for coord in nearby_coordinates]

    return JsonResponse(data, safe=False)

@csrf_exempt
def get_reserved_posts(request):
    user = request.GET.get('reserved_by')

    posts = Post.objects.filter(
        reserved_by=user,
    )
    return JsonResponse(posts)

@csrf_exempt
def get_nearby_coordinates(request):
    user_latitude = float(request.GET.get('latitude', 0))
    user_longitude = float(request.GET.get('longitude', 0))
    radius = 100 # 0.1 degrees as an example radius, adjust as needed

    # Calculate the bounding box for the search area
    min_latitude = user_latitude - radius
    max_latitude = user_latitude + radius
    min_longitude = user_longitude - radius
    max_longitude = user_longitude + radius

    # Filter coordinates within the bounding box
    nearby_coordinates = Post.objects.filter(
        latitude__range=(min_latitude, max_latitude),
        longitude__range=(min_longitude, max_longitude),
        reservation_status="Open"
    )

    data = [{
        'id': coord.id,
        'foodlist': coord.food_list,
        'latitude': coord.latitude,
        'longitude': coord.longitude,
        'address': coord.address,
    } for coord in nearby_coordinates]

    return JsonResponse(data, safe=False)


@csrf_exempt
def geocode_addresses_post():
    posts = Post.objects.all()

    for post in posts:
        latitude, longitude = geocode_address(post.address)
        post.latitude = latitude
        post.longitude = longitude
        post.save()

    return JsonResponse({"status": "success", "latitude": latitude, "longitude": longitude})

@csrf_exempt
def geocode_addresses_user(request):
    users = User.objects.all()

    for user in users:
        latitude, longitude = geocode_address(user.address)
        user.user_latitude = latitude
        user.user_longitude = longitude
        user.save()

    return JsonResponse({"status": "success", "latitude": latitude, "longitude": longitude})


@csrf_exempt
def geocode_user_address(request):
    users = User.objects.all()

    for user in users:
        latitude, longitude = geocode_address(user.address)
        user.user_latitude = latitude
        user.user_longitude = longitude
        user.save()
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
    def perform_create(self, serializer):
        address = self.request.data.get('address')
        latitude, longitude = geocode_address(address)
        serializer.save(latitude=latitude, longitude=longitude)


# View for listing reservations related to a receiver instance
class ReceiverReservationListView(generics.ListCreateAPIView):
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
