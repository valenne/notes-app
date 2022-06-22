const form = document.querySelector("#form-add");

const addNote = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const payload = Object.fromEntries(data);

  console.log(payload);

  try {
    const { data } = await axios.post(`/note`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Note added successfully");
    window.location.href = "/dashboard";
  } catch (err) {
    const { data } = err.response;
    console.log(data);
    alert(data.message);
    window.location.href = "/dashboard";
  }
};

form.addEventListener("submit", addNote);

const checkpoint = 250;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
  } else {
    opacity = 0;
  }
  document.querySelector(".dash-formNotes").style.opacity = opacity;
});
