from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    USER_CHOICES = [
        ("Provider", "Provider"),
        ("Receiver", "Receiver"),
    ]
    user_type = models.CharField(max_length=12, choices=USER_CHOICES, blank=True, null=True)

class Provider(models.Model):
    PROVIDER_CHOICES = [
        ("Business", "Business"),
        ("Resident", "Resident"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(blank=True, null=True)
    Provider_type = models.CharField(max_length=20, choices=PROVIDER_CHOICES)
    email = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=15)

    

class Receiver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=30, blank=True, null=True)
    phone_number = models.CharField(max_length=15)



class Post(models.Model):
    provider = models.OneToOneField(Provider, on_delete=models.CASCADE)
    food_list = models.TextField()
    monetary_value = models.IntegerField(blank=True, null=True)
    location = models.TextField()


class Reservation(models.Model):
    receiver = models.OneToOneField(Receiver, on_delete=models.CASCADE)
    post = models.OneToOneField(Post, on_delete=models.CASCADE)