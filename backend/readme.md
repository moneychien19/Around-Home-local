## Contents
- [Todo list](#Todo-list)
- [How to run the backend server](#How-to-run-the-backend-server)
- [APIs](#APIs)
- [Convert address to coordinate in python](#Convert-address-to-coordinate-in-python)

## Todo list
- [x] Add remaining tables
- [x] Add more accident data
- [x] Perhaps add a date range filter? 
- [ ] Update AQI dataset dynamically (currently the observation was made at 2021-11-09 16:00)

## How to run the backend server

### Database
1. Open pgadmin.
2. Create a database called `AroundHome` (or whatever name you like, but remember to change the database name in .env file)
3. Restore the database with `AroundHome_backup.sql`, which can be found in `backend/around_home_backend/data` folder.

![](https://i.imgur.com/IDnynRR.jpg)
![](https://i.imgur.com/3GZX8bg.jpg)

### Backend
1. Execute the following commands.
```
git clone https://github.com/moneychien19/db1101_midterm.git
cd db1101_midterm/backend

# Activate virtual enviroment
python -m venv env
source env/bin/activate
cd around_home_backend

# Install dependencies
pip install -r requirements.txt
```
2. Modify the last line in `.env` file. Fill in your username, password and database name in the DATABASE_URL.

```
DATABASE_URL=postgres://{Username}:{Password}@127.0.0.1:5432/{DatabaseName}
```

3. Run the server.
```
python manage.py runserver
```

## APIs

### 1. Accidents

#### Description
Return accidents that happened from January 2020 to December 2020 within the query distance and during the time specified.

#### Path
/api/safety/accident

#### Method
POST

#### Argument:
- `latitude` (required) 
- `longitude` (required)
- `distance` (optional, unit: meter): the default value is 1000 meters.
- `month` (optional): the default value is 6 months. 

#### Response
- `aid` accident id
- `aadd` accident address
- `longitude` where the accident happened
- `latitude` where the accident happened
- `injured`
- `death`
- `date`

#### Response example
```
{
    "aid": 965,
    "aadd": "新北市板橋區新北市板橋區文化路1段與府後街",
    "longitude": 121.465128,
    "latitude": 25.018586,
    "injured": 1,
    "death": 1,
    "date": "2020-07-05T08:34:00"
}
```

### 2. Thefts

#### Description
Return thefts within the query distance and during the time specified. 

#### Path
/api/safety/theft

#### Method
POST

#### Argument
- `latitude` (required) 
- `longitude` (required)
- `distance` (optional, unit: meter): the default value is 1000 meters. 
- `month` (optional): the default value is 6 months.

#### Response
- `theft_add`
- `longitude` where the theft happened
- `latitude` where the theft happened
- `date`
- `theft_id`
- `theft_type` could be `自行車竊盜`, `機車竊盜`, `汽車竊盜`, `住宅竊盜`, `強盜`, or `搶奪`

#### Response example
```    
{
    "theft_add": "臺北市大安區仁慈里信義路4段31~60號",
    "latitude": 25.0334448,
    "longitude": 121.5442815,
    "theft_id": 2305,
    "date": "2021-07-10T00:00:00",
    "theft_type": "自行車竊盜"
}
```

### 3. Air Quality

#### Description
Return AQI from the nearest observatory.  

![](https://i.imgur.com/s84fOPO.png)

#### Path
/api/environment/airquality

#### Method
POST

#### Argument
- `latitude` (required) 
- `longitude` (required)

#### Response
- `aqi`
- `status` chinese description of AQI
- `scounty` the county where the observatory is located
- `sname` the location of the observatory
- `published_time` when the observation was published 

#### Response example
```    
{
    "aqi": 40,
    "status": "良好",
    "scounty": "新北市",
    "sname": "汐止",
    "published_time": "2021-11-09T16:00:00"
}
```

### 4. UV

#### Description
Find the nearest observatory and return UV index from 2021-11-01 to 2021-11-09 at 1 hour interval.  

#### Path
/api/environment/uv

#### Method
POST

#### Argument
- `latitude` (required) 
- `longitude` (required)

#### Response
- `uvi` UV index
- `utime`
- `county` the county where the observatory is located
- `site_name` the location of the observatory

#### Response example
```    
{
    "uvi": 3.94,
    "utime": "2021-11-09T11:00:00",
    "county": "臺北市",
    "site_name": "臺北"
}
```

### 5. Waste Disposal

#### Description
Return waste disposals within the query distance.

#### Path
/api/environment/waste-disposal

#### Method
POST

#### Argument:
- `latitude` (required) 
- `longitude` (required)
- `distance` (optional, unit: meter): the default value is 1000 meters.

#### Response
- `wname` waste disposal name
- `wadd` waste disposal address
- `aid` 
- `wmethod`
- `latitude`
- `longitude`

#### Response example
```
{
    "wname": "永清工程行",
    "wadd": "臺北市南港區成福路一二一巷三○號一樓",
    "aid": 153,
    "wmethod": null,
    "latitude": 25.040736,
    "longitude": 121.587888
}
```

## Convert address to coordinate in python
Reference: [googlemaps](https://github.com/googlemaps/google-maps-services-python) package
