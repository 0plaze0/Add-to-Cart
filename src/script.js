import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
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
  const shoppingList = document.getElementById("shoppingList");
  console.log(shoppingList);

  //take user input
  addToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const item = userInput.value;
    push(cartDB, item);
    console.log(`${userInput.value} added to database`);
    onValue(cartDB, (item) => {
      shoppingList.innerHTML = "";
      let obj = Object.values(item.val());
      obj.forEach((item) => createShoppingItem(shoppingList, item));
      console.log(obj);
    });
    clearInput();
  });
};

const clearInput = () => {
  userInput.value = "";
};

function createShoppingItem(parent, item) {
  const li = document.createElement("li");
  li.textContent = item;
  parent.appendChild(li);
}

initApp();
