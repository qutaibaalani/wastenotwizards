from django.db import models
from django.contrib.auth.models import AbstractUser


# ----------------------------------------- USER MODEL -----------------------------------------


# Custom User model extending Django's AbstractUser.
class User(AbstractUser):
    STATE_CHOICES = [
        ("AK", "Alaska"),
        ("AL", "Alabama"),
        ("AR", "Arkansas"),
        ("AZ", "Arizona"),
        ("CA", "California"),
        ("CO", "Colorado"),
        ("CT", "Connecticut"),
        ("DC", "District of Columbia"),
        ("DE", "Delaware"),
        ("FL", "Florida"),
        ("GA", "Georgia"),
        ("HI", "Hawaii"),
        ("IA", "Iowa"),
        ("ID", "Idaho"),
        ("IL", "Illinois"),
        ("IN", "Indiana"),
        ("KS", "Kansas"),
        ("KY", "Kentucky"),
        ("LA", "Louisiana"),
        ("MA", "Massachusetts"),
        ("MD", "Maryland"),
        ("ME", "Maine"),
        ("MI", "Michigan"),
        ("MN", "Minnesota"),
        ("MO", "Missouri"),
        ("MS", "Mississippi"),
        ("MT", "Montana"),
        ("NC", "North Carolina"),
        ("ND", "North Dakota"),
        ("NE", "Nebraska"),
        ("NH", "New Hampshire"),
        ("NJ", "New Jersey"),
        ("NM", "New Mexico"),
        ("NV", "Nevada"),
        ("NY", "New York"),
        ("OH", "Ohio"),
        ("OK", "Oklahoma"),
        ("OR", "Oregon"),
        ("PA", "Pennsylvania"),
        ("RI", "Rhode Island"),
        ("SC", "South Carolina"),
        ("SD", "South Dakota"),
        ("TN", "Tennessee"),
        ("TX", "Texas"),
        ("UT", "Utah"),
        ("VA", "Virginia"),
        ("VT", "Vermont"),
        ("WA", "Washington"),
        ("WI", "Wisconsin"),
        ("WV", "West Virginia"),
        ("WY", "Wyoming"),
    ]

    is_provider = models.BooleanField(default=False)
    is_receiver = models.BooleanField(default=False)

    email = models.CharField(max_length=30, blank=True, null=True)
    phone_number = models.CharField(max_length=12, blank=True, null=True)
    street_address = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(
        max_length=50, choices=STATE_CHOICES, blank=True, null=True
    )
    zip_code = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username


# ----------------------------------------- PROVIDER MODEL -----------------------------------------


# Model to represent providers.
class Provider(models.Model):
    PROVIDER_CHOICES = [
        ("Business", "Business"),
        ("Resident", "Resident"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    provider_type = models.CharField(max_length=20, choices=PROVIDER_CHOICES)

    def __str__(self):
        return self.provider_type


# ----------------------------------------- POST MODEL -----------------------------------------


# Model to represent posts.
class Post(models.Model):
    posted_by_user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="posted_by_user",
    )
    food_list = models.TextField()
    monetary_value = models.IntegerField(blank=True, null=True)
    location = models.TextField()

    def __str__(self):
        return self.food_list


# ----------------------------------------- RESERVATION MODEL -----------------------------------------


# Model to represent reservations.
class Reservation(models.Model):
    receiver = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.receiver)
