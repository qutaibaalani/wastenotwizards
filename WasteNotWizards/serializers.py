from .models import User, Receiver, Provider, Post, Reservation
from rest_framework import serializers


class ProviderListSerializer(serializers.ModelSerializer):
    pass


class ProviderProfile(serializers.ModelSerializer):
    pass


class ReceiverListSerializer(serializers.ModelSerializer):
    pass


class ReceiverProfile(serializers.ModelSerializer):
    pass


class PostListSerializer(serializers.ModelSerializer):
    pass


class ReservationListSerializer(serializers.ModelSerializer):
    pass
