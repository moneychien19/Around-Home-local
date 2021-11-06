from django.db import models

class Accident(models.Model):
    accident_id = models.AutoField(primary_key=True)
    accident_date = models.CharField(max_length=50, null=True)
    accident_address = models.CharField(max_length=100, null=True)
    casualties = models.CharField(max_length=20, null=True)
    vehicle_type = models.TextField(null=True)
    longitude = models.FloatField()
    latitude = models.FloatField()

    class Meta:
        db_table = 'accident'

    def __str__(self):
        return f'{self.accident_date}-{self.accident_address}'


class Theft(models.Model):
    theft_id = models.CharField(max_length=20, primary_key=True)
    theft_type = models.CharField(max_length=20, null=True)
    theft_date = models.CharField(max_length=20, null=True)
    theft_time = models.CharField(max_length=20, null=True)
    theft_address = models.CharField(max_length=100, null=True)
    longitude = models.FloatField()
    latitude = models.FloatField()

    class Meta:
        db_table = 'theft'

    def __str__(self):
        return f'{self.theft_date}-{self.theft_address}'
