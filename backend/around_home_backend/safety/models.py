from django.db import models

class Accident(models.Model):
    aid = models.AutoField(primary_key=True)
    aadd = models.CharField(max_length=100, null=True)
    longitude = models.FloatField(db_column='alon')
    latitude = models.FloatField(db_column='alat')
    injured = models.IntegerField()
    death = models.IntegerField()
    date = models.DateTimeField(null=True, db_column='adate')

    class Meta:
        db_table = 'accident'

    def __str__(self):
        return f'{self.date}-{self.aadd}'


class TheftType(models.Model):
    theft_type_id = models.IntegerField(primary_key=True)
    theft_type = models.CharField(max_length=10)

    class Meta:
        db_table = 'theft_type'

    def __str__(self):
        return f'{self.theft_type_id}-{self.theft_type}'


class Theft(models.Model):
    theft_add = models.CharField(max_length=100, null=True)
    latitude = models.FloatField(null=True, db_column='theft_lat')
    longitude = models.FloatField(null=True, db_column='theft_lon')
    theft_type_id = models.IntegerField(null=True)
    theft_id = models.IntegerField(primary_key=True)
    date = models.DateTimeField(null=True, db_column='theft_date')

    class Meta:
        db_table = 'theft'

    def __str__(self):
        return f'{self.date}-{self.theft_add}'
