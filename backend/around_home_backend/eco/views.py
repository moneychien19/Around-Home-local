from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from eco.models import ClothesRecycle, RecycleAgency, GarbageTruck, GreenStore, RewardStore
from utils import utils

@api_view(['POST'])
def clothes_recycle(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000
    recycle_list = utils.get_objects_around(ClothesRecycle.objects.values(), distance, latitude, longitude)

    # Add agency name and remove group id
    agencies = RecycleAgency.objects.values().order_by('group_id')
    for box in recycle_list:
        box['agency_name'] = agencies[box['group_id']-1]['group_name']
        box.pop('group_id', None)

    return Response(recycle_list, status=status.HTTP_200_OK)


@api_view(['POST'])
def garbage_truck(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000
    locations = utils.get_objects_around(GarbageTruck.objects.values().order_by('license_id'), distance, latitude, longitude)

    return Response(locations, status=status.HTTP_200_OK)

@api_view(['POST'])
def green_store(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000
    locations = utils.get_objects_around(GreenStore.objects.values(), distance, latitude, longitude)

    return Response(locations, status=status.HTTP_200_OK)


@api_view(['POST'])
def reward_store(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000
    locations = utils.get_objects_around(RewardStore.objects.values(), distance, latitude, longitude)

    requirement = ['自備筷子或湯匙或刀叉', '自備餐盒', '自備環保杯']
    for loc in locations:
        loc['requirement'] = requirement[loc['require_id']-1]
        loc.pop('require_id',  None)

    return Response(locations, status=status.HTTP_200_OK)