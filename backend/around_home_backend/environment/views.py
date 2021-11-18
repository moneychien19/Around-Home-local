from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from dateutil.relativedelta import relativedelta

from environment.models import AirQuality, AirSite, UV, UVSite, WasteDisposal
from environment.models import WaterQuality, DamSite
from utils import utils

def get_observation_list(site_id, observations):
    return [obs for obs in observations if obs['site_id'] == site_id]


@api_view(['POST'])
def air_quality(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    closest_site = utils.get_closest_objects(AirSite.objects.values(), 1, latitude, longitude)[0]
    obs_list = get_observation_list(closest_site['site_id'], AirQuality.objects.values())

    if len(obs_list) == 0:
        return Response('Cannot find observation', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        quality = {
            'aqi': obs_list[0]['aqi'],
            'status': obs_list[0]['status'],
            'scounty': closest_site['scounty'],
            'sname': closest_site['sname'],
            'published_time': obs_list[0]['published_time']
        }
        return Response(quality, status=status.HTTP_200_OK)


@api_view(['POST'])
def uv(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    closest_site = utils.get_closest_objects(UVSite.objects.values(), 1, latitude, longitude)[0]
    obs_list = get_observation_list(closest_site['site_id'], UV.objects.values().order_by('utime'))

    if len(obs_list) == 0:
        return Response('Cannot find closest observation', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        uvi_list = [{
            'uvi': obs['uvi'],
            'utime': obs['utime'],
            'county': closest_site['county'],
            'site_name': closest_site['site_name']
        } for obs in obs_list]
        return Response(uvi_list, status=status.HTTP_200_OK)


@api_view(['POST'])
def disposal_list(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    # Set default distance to be 1000 meters
    distance = float(request.data['distance']) if 'distance' in request.data else 1000
    disposal_around = utils.get_objects_around(WasteDisposal.objects.values(), distance, latitude, longitude)

    return Response(disposal_around, status=status.HTTP_200_OK)


@api_view(['POST'])
def water_quality(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    site_id = 70 # 翡翠水庫
    quality_list = get_observation_list(site_id, WaterQuality.objects.values().order_by('date'))

    # Set default time span to be six months earlier
    months = float(request.data['month']) if 'month' in request.data else 6
    time_end = datetime.today()
    time_start = time_end - relativedelta(months=months)

    quality_list = utils.get_objects_lately(quality_list, time_start, time_end)
    return Response(quality_list, status=status.HTTP_200_OK)