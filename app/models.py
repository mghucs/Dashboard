from django.db import models

class Currency(models.Model): 
    date = models.DateField(max_length=12)
    usd = models.DecimalField(max_digits=5, decimal_places=2) 
    cad = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Date: {self.date}, USD: {self.usd}, CAD: {self.cad}"