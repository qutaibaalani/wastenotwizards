from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
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


class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer


# class ProviderPostsView(generics.ListAPIView):
#     queryset = Post.objects.all()

#     def get_queryset(self):
#         return self.request.user.posted_by_user

#     serializer_class = PostListSerializer


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


class OnePostView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)


# -----------------------------------------RECEIVER VIEWS----------------------------------


# For listing instances of the `Post` model.
class AllPostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


# For listing reservations related to a `Receiver` instance.
class ReceiverReservationListView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    # The `lookup_field` is set to "receiver__user__username" to retrieve reservations based on the username of the associated receiver's user.
    lookup_field = "username"


# For retrieving, updating, and deleting a specific reservation
class ReservationUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
