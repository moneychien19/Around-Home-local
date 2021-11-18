# Around Home

輸入台北市範圍內的住家地址，以查詢住家附近的治安及環境品質。

### Contributors

李佳欣、錢紫翎、周敦翔、莊翔安

## Backend & Database

### Set Your Database

1. Open pgadmin.
2. Create a database called `AroundHome` (or whatever name you like, but remember to change the database name in .env file)
3. Restore the database with `AroundHome_backup.sql`, which can be found in `backend/around_home_backend/data` folder.

<!-- ![](https://i.imgur.com/IDnynRR.jpg)
![](https://i.imgur.com/3GZX8bg.jpg) -->

<div style="text-align: center">
    <img src="https://i.imgur.com/IDnynRR.jpg" width="300" /> <img src="https://i.imgur.com/3GZX8bg.jpg" width="450"/>
</div>

### Run Backend

1. Execute the following commands.

```
git clone https://github.com/moneychien19/db1101_midterm.git
cd db1101_midterm/backend

# Activate virtual enviroment
python -m venv env
source env/bin/activate  # or env\Scripts\activate.bat for Windows
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

### API

- /api/safety/accident
- /api/safety/theft
- /api/environment/air-quality
- /api/environment/uv
- /api/environment/waste-disposal
- /api/environment/water-quality
- /api/eco/clothes-recycle
- /api/eco/garbage-truck
- /api/eco/green-store
- /api/eco/reward-store

## Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Set Your Google API Key

You have to create a `key.js` file under the `/src` folder, and write the following code:

```
const API_KEY = {YOUR_GOOGLE_API_KEY};
export default API_KEY;
```

Otherwise you can't use the Google API.

### Yarn

Type the following command in CMD

```
yarn
yarn start
```

and the app will run the [local host in port 3000](http://localhost:3000) for you.
