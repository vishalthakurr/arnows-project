// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return userStr;
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// set the token and user from the session storage
export const setUserSession = (token, email) => {
  const tokenStr = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log(email, user);
  if (!tokenStr && !user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", email);
  }
};
