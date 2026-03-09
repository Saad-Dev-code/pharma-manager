from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Medicament
from .serializers import MedicamentSerializer

class MedicamentViewSet(viewsets.ModelViewSet):
    queryset = Medicament.objects.filter(est_actif=True)
    serializer_class = MedicamentSerializer

    # Soft delete 
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.est_actif = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # alertes
    @action(detail=False, methods=['get'])
    def alertes(self, request):
        alertes = Medicament.objects.filter(stock_actuel__lte=models.F('stock_minimum'), est_actif=True)
        serializer = self.get_serializer(alertes, many=True)
        return Response(serializer.data)