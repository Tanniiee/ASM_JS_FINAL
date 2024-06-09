let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Bọ',
        image: 'img/bo1.jpg',
        price: 1200000
    },
    {
        id: 2,
        name: 'Mèo Ba Tư',
        image: 'img/cat5.jpg',
        price: 1200000
    },
    {
        id: 3,
        name: 'Mèo Anh Lông Ngắn',
        image: 'img/dt4.jpg',
        price: 2200000
    },
    {
        id: 4,
        name: 'Chuột Lang',
        image: 'img/hamter4.png',
        price: 1230000
    },
    {
        id: 5,
        name: 'Thỏ',
        image: 'img/habit3.jpg',
        price: 3200000
    },
    {
        id: 6,
        name: 'Chó teaCup',
        image: 'img/dog4.jpg',
        price: 1200000
    }
];

let listCards = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="showDetail(${key})">Detail</button>
            <button onclick="addToCard(${key})">Buy now</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function showDetail(key) {
    // Hiển thị chi tiết sản phẩm (chức năng này bạn có thể tùy chỉnh thêm)
    alert(`Chi tiết sản phẩm: ${products[key].name}`);
}

function addToCard(key){
    let productInCart = listCards.find(item => item.id === products[key].id);
    if(productInCart){
        productInCart.quantity++;
    } else {
        listCards.push({
            id: products[key].id,
            name: products[key].name,
            image: products[key].image,
            price: products[key].price,
            quantity: 1
        });
    }
    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="${value.image}"/></div>
            <div>${value.name}</div>
            <div>${(value.price * value.quantity).toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        listCards.splice(key, 1);
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}
