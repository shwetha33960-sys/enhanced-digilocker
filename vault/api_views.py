from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Profile


def user_data(user):
    """Turns a user into the details your pages need."""
    p, _ = Profile.objects.get_or_create(user=user)
    return {
        "id": user.id,
        "name": user.first_name,
        "email": user.email,
        "role": "admin" if user.is_staff else "user",
        "phone": p.phone,
        "city": p.city,
        "status": p.status,
        "settings": {
            "email": p.email_notifications,
            "activity": p.activity_alerts,
            "lang": p.language,
        },
    }


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    name = str(request.data.get("name", "")).strip()
    email = str(request.data.get("email", "")).strip().lower()
    password = str(request.data.get("password", ""))

    if not name or not email or len(password) < 8:
        return Response(
            {"error": "Name, email and a password of 8+ characters are required."},
            status=400,
        )
    if User.objects.filter(username=email).exists():
        return Response({"error": "An account with this email already exists."}, status=400)

    user = User.objects.create_user(
        username=email, email=email, password=password, first_name=name
    )
    login(request, user)
    return Response(user_data(user), status=201)


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def login_view(request):
    email = str(request.data.get("email", "")).strip().lower()
    password = str(request.data.get("password", ""))

    user = authenticate(request, username=email, password=password)
    if user is None:
        return Response({"error": "Email or password is incorrect."}, status=400)

    profile, _ = Profile.objects.get_or_create(user=user)
    if profile.status == "Suspended":
        return Response({"error": "This account is suspended."}, status=403)

    login(request, user)
    return Response(user_data(user))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"ok": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(user_data(request.user))