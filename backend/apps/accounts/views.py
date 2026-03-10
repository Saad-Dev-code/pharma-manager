from django.shortcuts import render

from rest_framework import generics, permissions , status
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated , IsAdminUser

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils.timezone import now
from .models import LoginLog
from .serializers import LoginLogSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class MeAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            user = User.objects.get(username=request.data["username"])

            LoginLog.objects.create(
                user=user,
                login_time=now()
            )

            response.data["user"] = {
                "username": user.username,
                "is_superuser": user.is_superuser
            }

        return response
 
class LoginLogListAPIView(ListAPIView):
    queryset = LoginLog.objects.all().order_by("-login_time")
    serializer_class = LoginLogSerializer
    permission_classes = [IsAdminUser]

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception:
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST
            )