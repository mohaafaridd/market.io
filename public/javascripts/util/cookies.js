import Cookies from 'js-cookie';

export const getCookie = wantedCookie => {
  const cookie = Cookies.get(wantedCookie);
  const object = JSON.parse(cookie);
  return object;
};
