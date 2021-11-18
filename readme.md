## Backend

### Set Your Database

1. Open pgadmin.
2. Create a database called `AroundHome` (or whatever name you like, but remember to change the database name in .env file)
3. Restore the database with `AroundHome_backup.sql`, which can be found in `backend/around_home_backend/data` folder.

<!-- ![](https://i.imgur.com/IDnynRR.jpg)
![](https://i.imgur.com/3GZX8bg.jpg) -->

<div>
    <img src="https://i.imgur.com/IDnynRR.jpg" width="150" /> <img src="https://i.imgur.com/3GZX8bg.jpg" width="300"/>
</div>

### Run Backend

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
