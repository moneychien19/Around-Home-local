from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from safety.models import Accident, Theft, TheftType
from datetime import datetime
from dateutil.relativedelta import relativedelta
from utils import utils

@api_view(['POST'])
def accident_list(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000

    # Set default time span to be six months earlier
    months = float(request.data['month']) if 'month' in request.data else 6

    # Only 2020 accident data is available
    time_end = datetime.fromisoformat('2020-12-31')
    time_start = time_end - relativedelta(months=months)

    accidents_around = utils.get_objects_around(Accident.objects.values().order_by('date'), distance, latitude, longitude)
    accidents_lately = utils.get_objects_lately(accidents_around, time_start, time_end)

    return Response(accidents_lately, status=status.HTTP_200_OK)


@api_view(['POST'])
def theft_list(request):
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000

    # Set default time span to be six months earlier
    months = float(request.data['month']) if 'month' in request.data else 6
    time_end = datetime.today()
    time_start = time_end - relativedelta(months=months)

    thefts_around = utils.get_objects_around(Theft.objects.values().order_by('date'), distance, latitude, longitude)
    thefts_lately = utils.get_objects_lately(thefts_around, time_start, time_end) 
    
    # Add description of theft type and remove theft_type_id
    theft_type = TheftType.objects.values().order_by('theft_type_id')
    for theft in thefts_lately:
        theft['theft_type'] = theft_type[theft['theft_type_id']-1]['theft_type']
        theft.pop('theft_type_id', None)

    return Response(thefts_lately, status=status.HTTP_200_OK)
