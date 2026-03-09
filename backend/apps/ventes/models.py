from django.db import models

from apps.medicaments.models import Medicament

class Vente(models.Model):
    reference = models.CharField(max_length=100)

    date_vente = models.DateTimeField(auto_now_add=True)

    total_ttc = models.DecimalField(max_digits=10, decimal_places=2)

    statut = models.CharField(max_length=50)

    notes = models.TextField(blank=True)

    def __str__(self):
        return self.reference


class LigneVente(models.Model):
    vente = models.ForeignKey(Vente, on_delete=models.CASCADE, related_name="lignes")

    medicament = models.ForeignKey(Medicament, on_delete=models.CASCADE)

    quantite = models.IntegerField()

    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2)

    sous_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.medicament.nom} x {self.quantite}"