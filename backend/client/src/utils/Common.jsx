// Handle  localStorage storage func

export const serverURL = "http://localhost:8000"

export const getUserEmail = () => {
  const userStr = localStorage.getItem("useremail");
  if (userStr) return userStr;
  else return null;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const getUserName = () => {
  const userStr = localStorage.getItem("username");
  if (userStr) return userStr;
  else return null;
};

export const removeUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("useremail");
  localStorage.removeItem("username");
};

export const setUserSession = (token, email, name) => {
  const tokenStr = localStorage.getItem("token");
  const userEmail = localStorage.getItem("useremail");
  const userName = localStorage.getItem("username");
  if (!tokenStr && !userEmail && !userName) {
    localStorage.setItem("token", token);
    localStorage.setItem("useremail", email);
    localStorage.setItem("username", name);
  }
};
