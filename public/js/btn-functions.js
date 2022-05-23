// make the split button appear when the undo button is clicked
const splitChild = () => {
  const splitButton = document.querySelector(".split-button-main");
  const splitButtonChild = document.querySelector(".split-button-child");
  splitButtonChild.classList.toggle("hidden");
  splitButton.classList.toggle("hidden");
};

// make the split button disappear when the undo button is clicked
const heroUndo = () => {
  const splitButton = document.querySelector(".split-button-main");
  const splitButtonChild = document.querySelector(".split-button-child");
  const heroUndo = document.querySelector(".hero-undo");

  splitButtonChild.classList.toggle("hidden");
  splitButton.classList.toggle("hidden");
};
