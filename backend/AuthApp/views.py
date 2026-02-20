from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from AuthApp.models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# -----------------------
# Register
# -----------------------
from rest_framework.parsers import MultiPartParser, FormParser
# @parser_classes([MultiPartParser, FormParser])
@api_view(['POST'])
@permission_classes([AllowAny])
def Register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "User registered successfully",
            "id": user.id,
            "role": user.role
        }, status=201)
    return Response(serializer.errors, status=400)

# -----------------------
# Login (JWT)
# -----------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def Login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=400)

    user = authenticate(request, email=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=401)

    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    return Response({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        },
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })

# -----------------------
# Profile (JWT protected)
# -----------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Profile(request, user_id):
    if request.user.id != user_id:
        return Response({"error": "Unauthorized"}, status=403)

    serializer = UserSerializer(request.user)
    return Response(serializer.data)
