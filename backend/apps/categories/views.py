from django.shortcuts import render

from rest_framework import viewsets
from .models import Categorie
from .serializers import CategorieSerializer

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer