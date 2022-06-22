const editForm = document.querySelector("#form-edit");

console.log(editForm);

const updateNote = async (e) => {
  e.preventDefault();
  let id = document.querySelector("#id-task").innerHTML;

  const data = new FormData(editForm);
  const payload = Object.fromEntries(data);

  payload.id = id;

  console.log("update note", payload);

  // iscompleted value is a string, so convert it to boolean

  payload.isCompleted
    ? (payload.isCompleted = true)
    : (payload.isCompleted = false);

  console.log(`edit`, payload);

  try {
    const { data } = await axios.put(`/note`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Note updated successfully");
    window.location.href = "/dashboard";
  } catch (err) {
    const { data } = err.response;
    console.log(data);
    alert(data.message);
    window.location.href = "/dashboard";
  }
};

editForm.addEventListener("submit", updateNote);
