from rest_framework import serializers
from .models import Vente, LigneVente
from apps.medicaments.models import Medicament

class LigneVenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LigneVente
        fields = ['medicament', 'quantite', 'prix_unitaire']

    def validate_quantite(self, value):
        if value <= 0:
            raise serializers.ValidationError("La quantité doit être supérieure à 0.")
        return value

    def validate_prix_unitaire(self, value):
        if value < 0:
            raise serializers.ValidationError("Le prix unitaire doit être positif.")
        return value

class VenteSerializer(serializers.ModelSerializer):
    lignes_vente = LigneVenteSerializer(many=True, write_only=True)
    
    lignes = LigneVenteSerializer(many=True, read_only=True)

    class Meta:
        model = Vente
        fields = ['id', 'reference', 'date_vente', 'total_ttc', 'statut', 'notes', 'lignes', 'lignes_vente']

    def create(self, validated_data):
        lignes_data = validated_data.pop('lignes_vente')
        vente = Vente.objects.create(**validated_data)
        total_ttc = 0

        for ligne in lignes_data:
            medicament = ligne['medicament']
            quantite = ligne['quantite']
            prix_unitaire = ligne['prix_unitaire']

            if quantite > medicament.stock_actuel:
                raise serializers.ValidationError(f"Stock insuffisant pour {medicament.nom}")

            sous_total = quantite * prix_unitaire
            total_ttc += sous_total

            LigneVente.objects.create(
                vente=vente,
                medicament=medicament,
                quantite=quantite,
                prix_unitaire=prix_unitaire,
                sous_total=sous_total
            )

            medicament.stock_actuel -= quantite
            medicament.save()

        vente.total_ttc = total_ttc
        vente.save()
        return vente