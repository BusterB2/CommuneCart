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
    let ul = document.createElement('ul');
    document.body.append(ul);
    ul.id = "cart";
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

    let ul = document.getElementById('cart');
    ul.innerHTML = "";

    if(snapshot.exists()) {
        let itemsArr = Object.entries(snapshot.val());
        appendItemstoCart(itemsArr, ul);
    } else {
        ul.innerHTML = `No items here... yet`;
    }
    
})

document.getElementsByTagName('input')[0].addEventListener('focusin', () => {document.getElementsByTagName('input')[0].value = "";})
