from rest_framework import serializers
from .models import Vente, LigneVente
from apps.medicaments.models import Medicament

class LigneVenteSerializer(serializers.ModelSerializer):

    class Meta:
        model = LigneVente
        fields = ['id', 'vente', 'medicament', 'quantite', 'prix_unitaire', 'sous_total']

    
    def validate_quantite(self, value):
        if value <= 0:
            raise serializers.ValidationError("La quantité doit être supérieure à 0.")
        return value

    def validate_prix_unitaire(self, value):
        if value < 0:
            raise serializers.ValidationError("Le prix unitaire doit être positif.")
        return value

    def validate_sous_total(self, value):
        if value < 0:
            raise serializers.ValidationError("Le sous-total doit être positif.")
        return value


class VenteSerializer(serializers.ModelSerializer):
    lignes = LigneVenteSerializer(many=True, read_only=True)

    class Meta:
        model = Vente
        fields = ['id', 'reference', 'date_vente', 'total_ttc', 'statut', 'notes', 'lignes']

 