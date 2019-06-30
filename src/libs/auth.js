import decode from 'jwt-decode';

const getToken = () => {
  const token = localStorage.getItem('token') || '';
  return `Bearer ${token}`;
};

const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const loggedIn = () => {
  const token = getToken().split(' ')[1];
  return !!token && !isTokenExpired(token);
};

const setToken = idToken => {
  localStorage.setItem('token', idToken);
};

const updateToken = idToken => {
  setToken(idToken);
};

const logout = () => {
  localStorage.removeItem('token');
};

const getProfile = () => {
  if (loggedIn()) {
    const profile = decode(getToken());

    return profile;
  }

  return null;
};

export {
  loggedIn,
  isTokenExpired,
  setToken,
  getToken,
  logout,
  getProfile,
  updateToken
};
