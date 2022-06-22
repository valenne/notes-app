// appear the span with class complete when the status from status_task is true

const isCompleted = document.querySelectorAll(".isCheck");

const banner = document.querySelectorAll(".complete");

for (let i = 0; i < isCompleted.length; i++) {
  if (isCompleted[i].checked === true) {
    banner[i].style.display = "block";
  }
}
