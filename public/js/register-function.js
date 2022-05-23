// REGISTER PROCESS
const form = document.querySelector("form");
console.log(form);

const register = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const dataProcess = Object.fromEntries(data);

  // values to lowercase
  const payload = {
    name: dataProcess.firstName.toLowerCase().trim(),
    lastname: dataProcess.lastName.toLowerCase().trim(),
    email: dataProcess.email.toLowerCase().trim(),
    username: dataProcess.username.toLowerCase().trim(),
    password: dataProcess.password.trim(),
  };

  try {
    const { data } = await axios.post(`/register`, payload);
    alert(
      `Congrats your register was done, welcome: ${data.first_name} ${data.last_name}`
    );
    window.location.href = "/login";
  } catch ({ response }) {
    const data = response;
    console.log({ status: data.statusText, code: data.status });
    alert(data.statusText);
    window.location.href = "/register";
  }
};

form.addEventListener("submit", register);

// SHOWING DATE ON A REGISTER PAGE FOOTER

const formatDate = (date) => {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(date);
};

// REFRESHING DATE

const date = () => {
  document.querySelector("#register-date").innerHTML = formatDate(new Date());
};

setInterval(date, 1000);
