from django.db import models

class AirQuality(models.Model):
    aqi = models.IntegerField()
    status = models.CharField(max_length=5)
    site_id = models.IntegerField(primary_key=True)
    published_time = models.DateTimeField()

    class Meta:
        db_table = 'air_observe'

    def __str__(self):
        return f'site_id: {self.site_id}, aqi: {self.aqi}, status: {status}'


class AirSite(models.Model):
    site_id = models.IntegerField(primary_key=True, db_column='sid')
    scounty = models.CharField(max_length=5)
    sname = models.CharField(max_length=10)
    longitude = models.FloatField(db_column='slon')
    latitude = models.FloatField(db_column='slat')

    class Meta:
        db_table = 'air_site'

    def __str__(self):
        return f'{self.scounty}-{self.sname}'


class UV(models.Model):
    site_id = models.IntegerField(primary_key=True, db_column='uid')
    uvi = models.FloatField()
    utime = models.DateTimeField()

    class Meta:
        db_table = 'uv_observe'

    def __str__(self):
        return f'{self.site_id}-{self.uvi}'


class UVSite(models.Model):
    county = models.CharField(max_length=5)
    agency = models.CharField(max_length=15)
    site_name = models.CharField(max_length=5)
    site_id = models.IntegerField(primary_key=True, db_column='uid')
    latitude = models.FloatField(db_column='ulat')
    longitude = models.FloatField(db_column='ulon')

    class Meta:
        db_table = 'uv_site'

    def __str__(self):
        return f'{self.site_id}-{self.county}-{self.site_name}'

    
class WasteDisposal(models.Model):
    wname = models.CharField(max_length=40)
    wadd = models.CharField(max_length=50, null=True)
    aid = models.IntegerField(primary_key=True)
    wmethod = models.CharField(max_length=30, null=True)
    latitude = models.FloatField(db_column='wlat')
    longitude = models.FloatField(db_column='wlon')

    class Meta:
        db_table = 'waste_disposal'

    def __str__(self):
        return f'{self.wname}-{self.wadd}'