/* ----- delete cookie and redirects to login page ----- */
const deleteCookie = () => {
  document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/login";
};
