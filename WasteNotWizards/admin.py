from django.contrib import admin
from .models import User, Provider, Receiver, Post, Reservation

# Register your models here.
admin.site.register(User)
admin.site.register(Provider)
admin.site.register(Receiver)
admin.site.register(Post)
admin.site.register(Reservation)