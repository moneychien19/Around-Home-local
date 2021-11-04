## Contents
- [How to run the backend server](#How-to-run-the-backend-server)
- [APIs](#APIs)
- [Todo list](#Todo-list)

## How to run the backend server

### Database
1. Open pgadmin.
2. Create a database called `AroundHome` (or whatever name you like, but remember to change the database name in .env file)
3. Restore the database with `AroundHome_backup.sql`, which can be found in `data` folder.

![](https://i.imgur.com/IDnynRR.jpg)
![](https://i.imgur.com/3GZX8bg.jpg)

### Backend
1. Execute the following commands.
```
git clone https://github.com/moneychien19/db1101_midterm.git
cd db1101_midterm/backend

# Activate virtual enviroment
python3 -m venv env
source env/bin/activate
cd around_home_backend

# Install dependencies
pip install requirements.txt
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
Return A2 accidents that happened from January 2020 to June 2020 within the query distance.

#### Path
/api/accidents

#### Method
POST

#### Argument:
- `latitude`(required) 
- `longitude`(required)
- `distance`(optional, unit: meter): the default value is 1000 meters. 

#### Response
- `accident_id`
- `accident_date`
- `accident_address`
- `casualties`
- `vehicle_type`
- `longitude` where the accident happened
- `latitude` where the accident happened

#### Response example
```
{
    "accident_id": 173,
    "accident_date": "109年01月29日 22時45分00秒",
    "accident_address": "臺北市大安區和平東路2段 / 臺北市大安區建國南路2段",
    "casualties": "死亡1;受傷0",
    "vehicle_type": "自用-小客車;普通重型-機車",
    "longitude": 121.537907,
    "latitude": 25.025667
}
```

### 2. Thefts

#### Description
Return thefts within the query distance. 

#### Path
/api/theft

#### Method
POST

#### Argument
- `latitude`(required) 
- `longitude`(required)
- `distance`(optional, unit: meter): the default value is 1000 meters. 

#### Response
- `theft_id`
- `theft_type` could be `自行車竊盜`, `機車竊盜`, `汽車竊盜`, `住宅竊盜`, `強盜`, or `搶奪`
- `theft_date`
- `theft_time`
- `theft_address`
- `longitude` where the theft happened
- `latitude` where the theft happened

#### Response example
```    
{
    "theft_id": "burglary-262",
    "theft_type": "住宅竊盜",
    "theft_date": "1040510",
    "theft_time": "04~06",
    "theft_address": "臺北市大安區虎嘯里樂業街15巷1~30號",
    "longitude": 121.5500626,
    "latitude": 25.0240174
}
```

## Todo list
- [ ] Add remaining tables
- [ ] Add more accident data
- [ ] Perhaps add a date range filter? 
