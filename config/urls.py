"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include

urlpatterns = [
    path('', include('WasteNotWizards.urls')),
=======
from django.urls import path
from WasteNotWizards.views import home



urlpatterns = [
    path("", home, name="home"),
>>>>>>> 785b0cc554cc26518e8f52530301a415851ae2da
    path('admin/', admin.site.urls),
]
