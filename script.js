import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js';

const appSettings = {
    databaseURL: "https://shared-cart-30380-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listItems = ref(database, "Entries");

document.getElementById('add-button').addEventListener('click', function () {
    let inputElement = document.getElementById('input');

    push(listItems, inputElement.value);
    console.log(`${inputElement.value} is added to database`);

    inputElement.value = "";
})

document.addEventListener('DOMContentLoaded', function() {
    let div = document.createElement('div');
    document.body.append(div);
    div.id = "cart";
    div.innerHTML = `<p>There are currently no items</p>`;
})

function appendItemstoCart(items, ele) {
    let s = '';
    for(let item of items) 
    //  s += `<p>${item}</p>`;
        s += `<button class="item-button">${item[1]}</button>`;
    ele.innerHTML = s;
}

//fetch from firebase
//whenever DB updates - but how does it work at start too?
onValue(listItems, function(snapshot) {
    let itemsArr = Object.entries(snapshot.val());
    console.log(itemsArr);

    let div = document.getElementById('cart');
    div.innerHTML = "";

    appendItemstoCart(itemsArr, div);
})


/*
Storage:
Get all from DB
Add new             push()
Delete

Display:
Get all from DB
Add new directly
Delete directly
*/