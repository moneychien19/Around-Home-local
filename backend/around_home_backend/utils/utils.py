import math

# Calculate latitude-longitude distance using 'haversine' formula
# Reference: https://www.movable-type.co.uk/scripts/latlong.html
def get_distance_from_lat_lng(lat1, lng1, lat2, lng2):
    # Earth's radius in meters
    R = 6371e3
    phi1 = lat1 * math.pi/180 
    phi2 = lat2 * math.pi/180
    delta_phi = (lat2-lat1) * math.pi/180
    delta_lambda = (lng2-lng1) * math.pi/180

    a = (math.sin(delta_phi/2) * math.sin(delta_phi/2)
        + math.cos(phi1) * math.cos(phi2) *
        math.sin(delta_lambda/2) * math.sin(delta_lambda/2))

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c
    return d


def around_house(lat1, lng1, lat2, lng2, threshold):
    if lat2 is None or lng2 is None:
        return False
        
    d = get_distance_from_lat_lng(lat1, lng1, float(lat2), float(lng2))
    return d <= threshold


def get_objects_around(objects, distance, latitude, longitude):
    objects_around = [obj for obj in objects
                      if around_house(latitude, longitude, obj['latitude'], obj['longitude'], distance)]
    return objects_around


def get_objects_lately(objects, time_start, time_end):
    objects_lately = [obj for obj in objects
                      if time_start <= obj['date'] <= time_end]
    return objects_lately


def get_closest_objects(objects, n, latitude, longitude):
    sorted_objects = sorted(objects, key=lambda obj: get_distance_from_lat_lng(latitude, longitude, 
                                        float(obj['latitude']), float(obj['longitude'])))
    return sorted_objects[:n]


def get_lat_lng(request):
    err = 0
    try:
        longitude = request.data['longitude']
        latitude = request.data['latitude']
    except KeyError:
        err = 1
        return err, Response('Longitude and latitude required', status=status.HTTP_400_BAD_REQUEST)

    try:
        longitude = float(longitude)
        latitude = float(latitude)
    except ValueError:
        err = 1
        return err, Response('Longitude and latitude must be numerical', status=status.HTTP_400_BAD_REQUEST)

    # Todo: check if the coordinate is located in Taiwan

    return err, (longitude, latitude)