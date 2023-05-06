const form = document.getElementById("UserInput");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(document.getElementById("EnterText").value);
});
