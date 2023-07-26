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
)


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
