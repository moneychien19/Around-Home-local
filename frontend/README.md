This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

Type the following command in CMD

```
yarn start
yarn
```

and the app will run the [http://localhost:3000] for you.

## API Key Security

You have to create a `key.js` file under the "/src" folder, and write the following code:

```
const API_KEY = {YOUR_GOOGLE_API_KEY};
export default API_KEY;
```

Otherwise you can't use the Google API.
