from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from environment.models import AirQuality, AirSite, UV, UVSite, WasteDisposal
from utils import utils

def get_observation(site_id, observations):
    for obs in observations:
        if obs['site_id'] == site_id:
            return obs
    return None


@api_view(['POST'])
def air_quality(request):
    # Try to fetch latitude and longitude from request body
    err, response = utils.get_lat_lng(request)
    if err != 0:
        return response
    else:
        longitude, latitude = response

    closest_site = utils.get_closest_object(AirSite.objects.values(), latitude, longitude)
    obs = get_observation(closest_site['site_id'], AirQuality.objects.values())

    if obs is None:
        return Response('Cannot find observation', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        quality = {
            'aqi': obs['aqi'],
            'status': obs['status'],
            'scounty': closest_site['scounty'],
            'sname': closest_site['sname'],
            'published_time': obs['published_time']
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

    closest_site = utils.get_closest_object(UVSite.objects.values(), latitude, longitude)
    obs = get_observation(closest_site['site_id'], UV.objects.values())

    if obs is None:
        return Response('Cannot find closest observation', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        quality = {
            'uvi': obs['uvi'],
            'utime': obs['utime'],
            'county': closest_site['county'],
            'agency': closest_site['agency'],
            'site_name': closest_site['site_name']
        }
        return Response(quality, status=status.HTTP_200_OK)


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
