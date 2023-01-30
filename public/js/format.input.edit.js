// set value on a inputdate

const settingDate = () => {
  const fecha = document.querySelector("#fecha").innerHTML;

  // make a array of date
  const newFecha = fecha.split("/");

  // set if the day and month are less than 10 to add a 0
  for (i = 0; i < newFecha.length; i++) {
    if (Number(newFecha[i] < 10)) {
      newFecha[i] = "0" + newFecha[i];
    }
  }

  // format the date as year/month/day
  const fechaYMD = `${newFecha[0]}-${newFecha[1]}-${newFecha[2]}`;

  // capture the input node
  const date = document.querySelector("#nDate");

  // set the value of the input
  return (date.value = fechaYMD);
};

settingDate();

//CHECKBOX

// capture the hidden value of note status
const estatus = document.querySelector("#estatus").innerHTML;

const checkbox = document.querySelector("[type=checkbox]");

// set the value of the checkbox comparing the hidden value
if (estatus === "true") {
  checkbox.checked = true;
} else {
  checkbox.checked = false;
}

export default settingDate;
