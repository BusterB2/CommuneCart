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
    for(let item of items) {
        let button = document.createElement('li');
        button.class = 'item-button';
        button.textContent = item[1];
        button.addEventListener('dblclick', () => {
            remove(ref(database, `Entries/${item[0]}`));
        })
        ele.append(button);
    }
}

//fetch from firebase
onValue(listItems, function(snapshot) {
    let itemsArr = Object.entries(snapshot.val());
    console.log(itemsArr);

    let div = document.getElementById('cart');
    div.innerHTML = "";

    let ul = document.createElement('ul');
    div.append(ul);
    appendItemstoCart(itemsArr, ul);
})

document.getElementsByTagName('input')[0].addEventListener('focusin', () => {document.getElementsByTagName('input')[0].value = "";})
document.getElementsByTagName('input')[0].addEventListener('focusout', () => {document.getElementsByTagName('input')[0].value = "Bread";})