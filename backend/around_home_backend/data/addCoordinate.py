import googlemaps
import pandas as pd
import time
from tqdm import tqdm

bike = pd.read_csv('臺北市自行車竊盜點位資訊-UTF8-BOM.csv')
scooter = pd.read_csv('臺北市機車竊盜點位資訊.csv')
vehicle = pd.read_csv('臺北市汽車竊盜點位資訊-UTF8-BOM.csv')
burglary = pd.read_csv('臺北市住宅竊盜點位資訊-UTF8-BOM.csv')

robbery = pd.read_csv('臺北市街頭隨機強盜案件點位資訊.csv')
robbery = robbery.drop('備註', 1)
snatch = pd.read_csv('臺北市街頭隨機搶奪案件點位資訊.csv')
snatch = snatch.drop('備註', 1)

frame_names = ['bike', 'scooter', 'vehicle', 'burglary', 'robbery', 'snatch']
frames = [bike, scooter, vehicle, burglary, robbery, snatch]

# Add prefix to ids
for name, frame in zip(frame_names, frames):
    frame['編號'] = frame['編號'].apply(lambda _id: f'{name}-{_id}')

theft = pd.concat(frames)

lats, lngs = [] , []
gmaps = googlemaps.Client(key=YOUR_API_KEY)
for address in tqdm(theft['發生地點']):
    # Remove remark in brackets, such as "臺北市南港區三重里南港路1段(南港展覽館5號" 
    address = address.split('(')[0]
    results = gmaps.geocode(address)

    # Response doc: https://developers.google.com/maps/documentation/geocoding/overview
    if len(results) != 0:    
        latitude = results[0]['geometry']['location']['lat']
        longitude = results[0]['geometry']['location']['lng']
    else:
        latitude = None
        longitude = None

    lats.append(latitude)
    lngs.append(longitude)
    
    # Geocoding API usage limit: 50 requests per second (QPS)
    time.sleep(0.1)

theft['latitude'] = lats
theft['longitude'] = lngs
theft.to_csv('theft.csv', index=False)