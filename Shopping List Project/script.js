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

// Functions
const onaddItemSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ''){
        alert('Add item');
        return;
    }

    addItemtoDOM(newItem);
    itemInput.value = '';

    checkUI();
};

const addItemtoDOM = (item) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    addItemtoStorage(item);
};

const addItemtoStorage = (item) => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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

const removeItem = (e) => {
    if(confirm('Are you sure?')){
        if(e.target.parentElement.classList.contains('remove-item')){
            e.target.parentElement.parentElement.remove();
        }
    }
};

const clearAllItems = () => {
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
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
    const items = document.querySelectorAll('li');
    if(items.length === 0){
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    }
};

// Event Listeners
itemForm.addEventListener('submit', onaddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAllItems);
filter.addEventListener('input', filterItems);

checkUI();