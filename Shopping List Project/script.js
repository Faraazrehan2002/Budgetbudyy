// const inputItem = document.querySelector('.form-control input');
// const itemButton = document.querySelector('.btn');
// const ul = document.querySelector('.items');
// const clearBtn = document.getElementById('clear');
// const filter = document.querySelector('.form-input-filter');
// let ourString = "";

// // Function to create a new item
// const createNewItem = (text) => {
//     let li = document.createElement('li');
//     li.className = 'item';

//     let btn = document.createElement('button');
//     btn.className = 'remove-item btn-link text-red';

//     let icon = document.createElement('i');
//     icon.className = 'fa-solid fa-xmark'; 

//     btn.appendChild(icon);

//     let textNode = document.createTextNode(text);
//     li.appendChild(textNode);
//     li.appendChild(btn);

//     return li;
// };

// // Event Handlers
// const onClick = (e) => {
//     e.preventDefault();
//     let inputValue = inputItem.value.trim();
//     if (inputValue !== '') {
//         let newItem = createNewItem(inputValue);
//         ul.appendChild(newItem);
//         inputItem.value = '';
//     }
// };

// const removeOnClickIcon = (e) => {
//     e.preventDefault();
//     let removeBtn = e.target.closest('.remove-item');
//     if (removeBtn) {
//         let li = removeBtn.parentElement;
//         ul.removeChild(li);
//     }
// };

// const clearAll = (e) => {
//     e.preventDefault();
//     ul.innerHTML = '';
// };

// const filterItems = (e) => {
//     if (e.key === 'Enter') {
//         const filterValue = ourString.trim().toLowerCase(); 
//         const items = ul.querySelectorAll('.item');
//         items.forEach(item => {
//             let text = item.textContent.trim().toLowerCase(); 
//             if (text.includes(filterValue)) {
//                 ul.removeChild(item);
//             }
//         });
//         ourString = '';
//         filter.value = '';
//     } else if (e.key === 'Backspace') {
//         ourString = ourString.slice(0, -1); 
//         filter.value = ourString;
//     } else if (e.key.length === 1) {
//         ourString += e.key.toLowerCase(); 
//         filter.value = ourString;
//     }
// };

// const onKeyPress = (e) => {
//     if (e.key === 'Enter') {
//         onClick(e);
//     }
// };

// // Event Listeners
// inputItem.addEventListener('keypress', onKeyPress);
// itemButton.addEventListener('click', onClick);
// ul.addEventListener('click', removeOnClickIcon);
// clearBtn.addEventListener('click', clearAll);
// filter.addEventListener('keyup', filterItems);


const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Functions

const displayItemsOnPage = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => {
        addItemtoDOM(item);
    });
    checkUI();
};

const onaddItemSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ''){
        alert('Add item');
        return;
    }

    if(isEditMode){
        let itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        location.reload();
    }else{
        if(checkIfItemExists(newItem.toLowerCase())){
            alert('The item already exists');
            return;
        }
    }
    addItemtoDOM(newItem);
    addItemtoStorage(newItem);
    itemInput.value = '';

    checkUI();
};

const addItemtoDOM = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
};

const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
};

const createIcon = (classes) => {
    const icon = document.createElement('icon');
    icon.className = classes;
    return icon;
};

const addItemtoStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
};

const onClickItem = (e) => {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItemFromDOM(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
};

const setItemToEdit = (item) => {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    itemInput.value = item.textContent;
    formBtn.innerHTML = '<i class = "fa-solid fa-pen font-styling"> Update Item</i>';
    formBtn.style.backgroundColor = "#228B22";
};

const checkIfItemExists = (item) => {
    let itemsFromStorage = getItemsFromStorage();
    let itemsFromStorageLowerCase = itemsFromStorage.map((i) => i.toLowerCase());
    return itemsFromStorageLowerCase.includes(item);
};

const removeItemFromDOM = (targetElement) => {
    if(confirm('Are you sure?')){
        let targetElementText = targetElement.textContent;
        targetElement.remove();
        removeItemFromStorage(targetElementText);
    }
    checkUI();
};

const removeItemFromStorage = (targetElementText) => {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter(i => i !== targetElementText);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const clearAllItems = () => {
    if(confirm('Are you sure?')){
        while(itemList.firstChild){
            itemList.removeChild(itemList.firstChild);
        }
        localStorage.removeItem('items');
        checkUI();
    }
};


const filterItems = (e) => {
    const items = document.querySelectorAll('li');
    const typedInput = e.target.value.toLowerCase();
    items.forEach(item => {
        const textContent = item.firstChild.textContent.toLowerCase();
        if(textContent.indexOf(typedInput) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    });
};

const checkUI = () => {
    itemInput.value = '';
    const items = document.querySelectorAll('li');
    if(items.length === 0){
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus font-styling"> Add Item</i>';
    formBtn.backgroundColor = "#333";


    isEditMode = false;
};

// Initialize App

function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onaddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearAllItems);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItemsOnPage);

    checkUI();
}

init();