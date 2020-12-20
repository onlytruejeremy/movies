export const movieAPI = {
  key: process.env.REACT_APP_MOVIE_API_KEY,
  movie: process.env.REACT_APP_MOVIE_API_MOVIE,
  image: process.env.REACT_APP_MOVIE_API_IMAGE,
  details: process.env.REACT_APP_MOVIE_API_DETAILS,
  search: process.env.REACT_APP_MOVIE_API_SEARCH,
};

export const firebaseAPI = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
  appId: process.env.REACT_APP_FIREBASE_APP,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT,
};

export default { movieAPI, firebaseAPI };
