import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const FIREBASE = {
  databaseURL:
    "https://add-to-cart-b6af7-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const initApp = () => {
  //connect to database
  const app = initializeApp(FIREBASE);
  const database = getDatabase(app);
  const cartDB = ref(database, "Items");
  //Dom element
  const addToCart = document.getElementById("AddToCart");
  const userInput = document.getElementById("userInput");

  //take user input
  addToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = userInput.value;
    push(cartDB, item);
    console.log(`${userInput.value} added to database`);

    clearInput();
    S;
  });
};

const clearInput = () => {
  userInput.value = "";
};

initApp();
