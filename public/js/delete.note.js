const deleteNote = async (id) => {
  try {
    const data = await axios.delete(`/note/${id}`);

    alert(data.data.message);
    window.location.href = "/dashboard";
  } catch ({ response }) {
    const data = response;
    console.log({ status: data.statusText, code: data.status });
    alert(data.statusText);
    window.location.href = "/dashboard";
  }
};
