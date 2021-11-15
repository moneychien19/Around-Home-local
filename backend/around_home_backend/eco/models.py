from django.db import models

class ClothesRecycle(models.Model):
    cid = models.IntegerField(primary_key=True)
    cadd = models.CharField(max_length=50)
    latitude = models.FloatField(db_column='clon')
    longitude = models.FloatField(db_column='clat')
    group_id = models.IntegerField()

    class Meta:
        db_table = 'clothes'

    def __str__(self):
        return f'{self.cid}-{self.cadd}'


class RecycleAgency(models.Model):
    group_id = models.IntegerField(primary_key=True)
    group_name = models.CharField(max_length=30)

    class Meta:
        db_table = 'cgroup'

    def __str__(self):
        return f'{self.group_id}-{self.group_name}'


class GarbageTruck(models.Model):
    tadd = models.CharField(max_length=50, primary_key=True)
    latitude = models.FloatField(db_column='tlon')
    longitude = models.FloatField(db_column='tlat')
    license_id = models.IntegerField()
    arrival = models.DateTimeField()
    leaving = models.DateTimeField()

    class Meta:
        db_table = 'trash'

    def __str__(self):
        return f'{self.license_id}-{self.tadd}'


class GreenStore(models.Model):
    gsname = models.CharField(max_length=70)
    gsadd = models.CharField(max_length=50, primary_key=True)
    latitude = models.FloatField(db_column='gslat')
    longitude = models.FloatField(db_column='gslon')
    store_type_id = models.IntegerField()

    class Meta:
        db_table = 'green_store'

    def __str__(self):
        return f'{self.gsname}-{self.gsadd}'


class RewardStore(models.Model):
    rname = models.CharField(max_length=300, primary_key=True)
    discount = models.CharField(max_length=100)
    latitude = models.FloatField(db_column='rlat')
    longitude = models.FloatField(db_column='rlon')
    store_type_id = models.IntegerField()
    require_id = models.IntegerField()

    class Meta:
        db_table = 'reward_store'

    def __str__(self):
        return self.rname