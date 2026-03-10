from django.urls import path
from .views import LoginLogListAPIView, RegisterAPIView, MeAPIView , CustomTokenObtainPairView , LogoutAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='auth-register'),
    path('me/', MeAPIView.as_view(), name='auth-me'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),    
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path("logs/", LoginLogListAPIView.as_view(), name="login_logs"),
]