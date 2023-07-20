from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    is_provider = models.BooleanField(default=False)
    is_receiver = models.BooleanField(default=False)
    
    email = models.CharField(max_length=30, blank=True, null=True)
    phone_number = models.CharField(max_length=12, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)


    def __str__(self):
        return self.username


class Provider(models.Model):
    PROVIDER_CHOICES = [
        ("Business", "Business"),
        ("Resident", "Resident"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    provider_type = models.CharField(max_length=20, choices=PROVIDER_CHOICES)

    def __str__(self):
        return self.user


# Define the Post model
class Post(models.Model):
    provider = models.OneToOneField(Provider, on_delete=models.CASCADE)
    food_list = models.TextField()
    monetary_value = models.IntegerField(blank=True, null=True)
    location = models.TextField()

    def __str__(self):
        return self.provider


class Reservation(models.Model):
    receiver = models.OneToOneField(User, on_delete=models.CASCADE)
    post = models.OneToOneField(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.receiver
