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

   
    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            lignes_data = request.data.pop('lignes', [])
            vente_serializer = self.get_serializer(data=request.data)
            vente_serializer.is_valid(raise_exception=True)
            vente = vente_serializer.save()

            total = 0
            for ligne_data in lignes_data:
                medicament = Medicament.objects.get(id=ligne_data['medicament'])
                if medicament.stock_actuel < ligne_data['quantite']:
                    raise Exception(f"Stock insuffisant pour {medicament.nom}")
                medicament.stock_actuel -= ligne_data['quantite']
                medicament.save()

                ligne_data['vente'] = vente.id
                ligne_serializer = LigneVenteSerializer(data=ligne_data)
                ligne_serializer.is_valid(raise_exception=True)
                ligne_serializer.save()
                total += ligne_serializer.validated_data['sous_total']

            vente.total_ttc = total
            vente.save()
            return Response(VenteSerializer(vente).data, status=status.HTTP_201_CREATED)

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