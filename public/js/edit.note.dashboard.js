async function editNote(id) {
  try {
    const note = await axios.get(`/note/${id}`);
    console.log("aqui");

    window.location.href = `/note/${id}`;
  } catch ({ response }) {
    const data = response;
    console.log({ status: data.statusText, code: data.status });
    alert(data.statusText);
    window.location.href = "/dashboard";
  }
}
