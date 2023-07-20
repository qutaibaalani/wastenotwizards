from .models import Provider, Post, Reservation, User
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


# Serializer for Provider model to include all fields
class ProviderListSerializer(serializers.ModelSerializer):
    username = serializers.SlugRelatedField(
        slug_field="username", queryset=User.objects.all()
    )

    class Meta:
        model = Provider
        fields = [
            "user",
            "address",
            "provider_type",
            "email",
            "phone_number",
            "username",
        ]


# Serializer class for the Post model
class PostListSerializer(serializers.ModelSerializer):
    posted_by_user = serializers.SlugRelatedField(
        slug_field='username', queryset=User.objects.all()
    )

    class Meta:
        model = Post
        fields = '__all__'


# Serializer for the Reservation model
class ReservationSerializer(serializers.ModelSerializer):
    receiver = serializers.SlugRelatedField(
        slug_field="username", queryset=User.objects.all()
    )

    class Meta:
        model = Reservation
        fields = [
            "id",
            "receiver",
            "reserved_at",
            "picked_up",
        ]


# # Define the serializer for the Post model to include all fields
# class PostListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = "__all__"


# # Serializer for Reservation model to include all fields
# class ReservationListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Reservation
#         fields = "__all__"
