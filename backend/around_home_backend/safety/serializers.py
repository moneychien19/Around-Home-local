from rest_framework import serializers
from safety.models import Accident

class AccidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accident
        fields = '__all__'