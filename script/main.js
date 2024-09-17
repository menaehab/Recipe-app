const searchBoxes = document.querySelectorAll(".searchBox");
const searchBtns = document.querySelectorAll(".searchBtn");
const cards = document.getElementById("cards");

searchBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
  });
});
