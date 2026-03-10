from django.contrib import admin
from .models import LoginLog

@admin.register(LoginLog)
class LoginLogAdmin(admin.ModelAdmin):
    list_display = ("user", "login_time", "logout_time")
    list_filter = ("user", "login_time")