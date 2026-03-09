from rest_framework import serializers
from .models import Medicament
from apps.categories.models import Categorie

class MedicamentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicament
        fields = [
            'id', 'nom', 'dci', 'categorie', 'forme', 'dosage',
            'prix_achat', 'prix_vente', 'stock_actuel', 'stock_minimum',
            'date_expiration', 'ordonnance_requise', 'date_creation', 'est_actif'
        ]

    def validate_stock_actuel(self, value):
        if value < 0:
            raise serializers.ValidationError("Le stock actuel ne peut pas être négatif.")
        return value

    def validate_stock_minimum(self, value):
        if value < 0:
            raise serializers.ValidationError("Le stock minimum ne peut pas être négatif.")
        return value

    def validate_prix_achat(self, value):
        if value < 0:
            raise serializers.ValidationError("Le prix d'achat doit être positif.")
        return value

    def validate_prix_vente(self, value):
        if value < 0:
            raise serializers.ValidationError("Le prix de vente doit être positif.")
        return value