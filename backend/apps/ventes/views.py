from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.medicaments.models import Medicament
from .models import Vente, LigneVente
from .serializers import VenteSerializer, LigneVenteSerializer
from django.db import transaction

class VenteViewSet(viewsets.ModelViewSet):
    queryset = Vente.objects.all()
    serializer_class = VenteSerializer


    @action(detail=True, methods=['post'])
    def annuler(self, request, pk=None):
        vente = self.get_object()
        if vente.statut == "annulée":
            return Response({"detail": "Vente déjà annulée"}, status=status.HTTP_400_BAD_REQUEST)
        with transaction.atomic():
            lignes = vente.lignes.all()
            for ligne in lignes:
                medicament = ligne.medicament
                medicament.stock_actuel += ligne.quantite
                medicament.save()
            vente.statut = "annulée"
            vente.save()
        return Response({"detail": "Vente annulée avec succès"}, status=status.HTTP_200_OK)