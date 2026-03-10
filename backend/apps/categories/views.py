from django.shortcuts import render

from rest_framework import viewsets
from .models import Categorie
from .serializers import CategorieSerializer
from rest_framework.permissions import IsAuthenticated

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes = [IsAuthenticated]