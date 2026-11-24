from django.urls import path
from . import api_views

urlpatterns = [
    path("auth/register/", api_views.register),
    path("auth/login/", api_views.login_view),
    path("auth/logout/", api_views.logout_view),
    path("me/", api_views.me),
]