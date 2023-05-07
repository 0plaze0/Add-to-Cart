import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
      if (item.exists()) {
        shoppingList.innerHTML = "";
        let shoppingItem = Object.entries(item.val());
        for (let i = 0; i < shoppingItem.length; i++) {
          let currItem = shoppingItem[i];
          let currId = currItem[0];
          let currValue = currItem[1];
          createShoppingItem(shoppingList, currItem, database);
          console.log(currItem);
        }
        // obj.forEach((item) => createShoppingItem(shoppingList, item[1]));
        console.log(shoppingItem);
      } else {
        shoppingList.innerHTML = "No items here..yet";
      }
    });
    clearInput();
  });
};

const clearInput = () => {
  userInput.value = "";
};

function createShoppingItem(parent, currItem, database) {
  const li = document.createElement("li");
  let currId = currItem[0];
  let currValue = currItem[1];
  li.textContent = currValue;
  console.log(li);
  li.addEventListener("click", () => {
    let Item = ref(database, `Items/${currId}`);
    remove(Item);
  });
  parent.appendChild(li);
}

initApp();
