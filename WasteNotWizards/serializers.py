from .models import Receiver, Provider, Post, Reservation
from rest_framework import serializers


# Serializer for Provider model to include all fields
class ProviderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = "__all__"


# Serializer for Provider model to include all fields
class ProviderProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = "__all__"


# Serializer for Receiver model to include all fields
class ReceiverListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receiver
        fields = "__all__"


# Serializer for Receiver model to include all fields
class ReceiverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receiver
        fields = "__all__"


# Serializer for Post model to include all fields
class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


# Serializer for Reservation model to include all fields
class ReservationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = "__all__"
