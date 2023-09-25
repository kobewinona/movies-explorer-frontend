export const moviesURL = 'https://api.nomoreparties.co';

export const mainApiConfig = {
  url: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const moviesApiConfig = {
  url: `${moviesURL}/beatfilm-movies`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const setRequest = (url, config) => {
  return fetch(url, config);
}

export const returnRes = res => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then(err => {
      const errorMessage = `Ошибка: ${res.status}: ${err.message}`;
      return Promise.reject(errorMessage);
    });
  }
};