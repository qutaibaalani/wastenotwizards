from .models import Provider, Post, Reservation, User
from rest_framework import serializers


# ----------------------------------------- PROFILE SERIALIZER -----------------------------------------


# Serializer for the User model to include all fields
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


# ----------------------------------------- PROVIDER SERIALIZER -----------------------------------------


# Serializer for the Provider model to include selected fields
class ProviderListSerializer(serializers.ModelSerializer):
    # Include the username of the related User model as a slug field
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


# ----------------------------------------- POST SERIALIZER -----------------------------------------


# Serializer for the Post model to include selected fields
class PostListSerializer(serializers.ModelSerializer):
    # Include the username of the related User model as a slug field
    posted_by_user = serializers.SlugRelatedField(
        slug_field="username", queryset=User.objects.all()
    )

    class Meta:
        model = Post
        fields = "__all__"


class PostAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["location"]


# ----------------------------------------- RESERVATION SERIALIZER -----------------------------------------


# Serializer for the Reservation model to include selected fields
class ReservationSerializer(serializers.ModelSerializer):
    # Include the username of the related User model as a slug field
    receiver = serializers.SlugRelatedField(
        slug_field="username", queryset=User.objects.all()
    )

    post = serializers.SlugRelatedField(
        slug_field="food_list", queryset=Post.objects.all()
    )

    #foodList = serializers.SlugRelatedField(
        #slug_field="food_list", queryset=Post.objects.all()
    #)

    class Meta:
        model = Reservation
        fields = [
            "id",
            "receiver",
            "post",
            #"foodList"
        ]
