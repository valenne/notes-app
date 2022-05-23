const form = document.querySelector("form");

const login = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const dataProcess = Object.fromEntries(data);

  // values to lowercase, prepare payload object
  const payload = {
    email: dataProcess.email.toLowerCase().trim(),
    password: dataProcess.password.trim(),
  };

  try {
    const { data } = await axios.post(`/login`, payload);

    alert(`Welcome ${data.name}`);
    window.location.href = "/dashboard";
  } catch (err) {
    const { data } = err.response;
    console.log(data);
    alert(data.message);
    window.location.href = "/login";
  }
};

form.addEventListener("submit", login);
