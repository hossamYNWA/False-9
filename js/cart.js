// const cartItems = [{ id: "1", name: "real madrid", price: 100, quantity: 6, img: "../images/kits/rm.png" }, { id: "3", name: "real koko", price: 100, quantity: 6, img: "../images/kits/rm.png" }, { id: "2", name: "barcelona", price: 200, quantity: 5, img: "../images/kits/tot.png" }]

// qty change handler********************************************************

const tbody = document.querySelector('tbody');
const totalValueTd = document.getElementById("totalVal")
//function to check if the cart is empty
function checkCart() {
    qtySpanHandler()
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    if (cartItems.length === 0 && tbody.parentElement) {
        tbody.parentElement.innerHTML = "<h2 class='empty-h2'>Your cart is empty!</h2> <a href='./jerseys.html'>back to shopping</a>"
    }
}
checkCart()
// function to calculate the total value of the cart
function calculatingTotalValue() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    let totalValue = cartItems.reduce(function(acc, item) {
        return acc + item.price * item.quantity
    }, 0)
    totalValueTd.innerHTML = '$' + totalValue;
}
// + and - buttons handler function
function changeQty(id, action) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    let targetItemIndex = cartItems.findIndex(item => item.id === id)
    console.log("buton works")
    if (action === "increment") {
        cartItems[targetItemIndex].quantity++;
    }
    if (action === "decrement") {
        cartItems[targetItemIndex].quantity--;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    calculatingTotalValue()
}
// function to deal with the QTY span 
function qtySpanHandler() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    const totalQty = cartItems.length;
    localStorage.setItem("totalQty", totalQty)
    const qtySpan = document.querySelectorAll(".logged-user span")
    qtySpan[0].innerHTML = totalQty
    qtySpan[1].innerHTML = totalQty
}
// function to visualize cart items 
function drawTable() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    tbody.innerHTML = ""
    cartItems.forEach((item) => {
        tbody.innerHTML += `<tr data-key="${item.id}" class="cart-item-row">
                        <td class="item-img">
                        <button class="del-btn"><i class="fa-solid fa-trash-can"></i></button>
                            <img src="${item.img}" alt="${item.name}">
                        </td>
                        <td>${item.name}</td>
                        <td>$${item.price}</td>
                        <td class="item-qty">
                            <button data-key="${item.id}" class="decrement-btn">-</button>
                            <span>${item.quantity}</span>
                            <button data-key="${item.id}" class="increment-btn">+</button>
                        </td>
                        <td class="item-totPrice">$${item.quantity * item.price}</td>
                    </tr>`

    })
    addingButtonsHandlers()
    activatingDeleteBtns()
    checkCart()
}
drawTable()
// function to refine cart items from zero qty items 
function refineCart() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    cartItems = cartItems.filter(item => item.quantity > 0)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    drawTable()
}


function addingButtonsHandlers() {
    const incrementButtons = document.querySelectorAll('.increment-btn');
    const decrementButtons = document.querySelectorAll('.decrement-btn');

    incrementButtons.forEach((btn) => btn.addEventListener("click", () => {
        const qtySpan = btn.parentElement.children[1];
        const itemId = parseInt(btn.dataset.key);
        changeQty(itemId, "increment")
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
        const targetItem = cartItems.find(item => item.id === itemId)
        qtySpan.innerHTML = targetItem.quantity
        btn.parentElement.parentElement.children[4].innerHTML = `$${targetItem.quantity * targetItem.price}`
        calculatingTotalValue()
    }))
    decrementButtons.forEach((btn, i) => btn.addEventListener("click", () => {
        const qtySpan = btn.parentElement.children[1];
        const itemId = parseInt(btn.dataset.key);
        changeQty(itemId, "decrement")
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
        const targetItem = cartItems.find(item => item.id === itemId)
        qtySpan.innerHTML = targetItem.quantity
        btn.parentElement.parentElement.children[4].innerHTML = `$${targetItem.quantity * targetItem.price}`
        refineCart()
        calculatingTotalValue()

    }))
}


// delete row handler****************************************
function deleteHandler(btn) {
    const parentTr = btn.parentElement.parentElement;
    const key = parseInt(parentTr.dataset.key);
    let cartItems = JSON.parse(localStorage.getItem("cartItems"))
    cartItems = cartItems.filter(item => item.id !== key)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    drawTable()
    calculatingTotalValue()
    qtySpanHandler()
    checkCart()
    if (cartItems.length > 0) {
        const deleteBtns = document.querySelectorAll('.del-btn');
        deleteBtns.forEach((btn) => btn.addEventListener("click", () => deleteHandler(btn)))
    }
}

function activatingDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.del-btn');
    deleteBtns.forEach((btn) => btn.addEventListener("click", () => deleteHandler(btn)))
}


// function deleteRow(row, allRows) {
//     totalValue -= cartItems[row].price * cartItems[row].quantity;
//     allRows[row].remove();
//     totalValueTd.innerHTML = '$' + totalValue;
//     cartItems.splice(row, 1);
//     checkCart()
//     localStorage.setItem("cartItems", JSON.stringify(cartItems))
//     const totalQty = cartItems.length;
//     localStorage.setItem("totalQty", totalQty)
//     const qtySpan = document.querySelectorAll(".logged-user span")
//     qtySpan[0].innerHTML = totalQty
//     qtySpan[1].innerHTML = totalQty
//     if (tableRows.length > 0) {
//         delBtnsHndler(document.querySelectorAll('.del-btn'), document.querySelectorAll('.cart-item-row'), deleteRow)
//     }
// }

// function delBtnsHndler(btns, rows, fn) {
//     btns.forEach((btn, i) => btn.addEventListener('click', () => fn(i, rows)))
// }
// delBtnsHndler(deleteBtns, tableRows, deleteRow)
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////   FAVS PART   /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

let favsItems = JSON.parse(localStorage.getItem("favs")) || []
const favCont = document.querySelector(".favs-container")

if (favsItems.length === 0) {
    favCont.parentElement.style.display = "none"
}
else {
    favCont.style.diplay = "block"
    favsItems.forEach((item, i) => favCont.innerHTML += `<div class="product-card">
    <img class="product-image" src="${item.image}" alt="Product Image">
    <div class="product-name">${item.name}</div>
    <div class="product-price">$${parseInt(item.price)}</div>
    <button class="btn" onclick="addToCart(${item.id},${i})"><i class="fas fa-shopping-cart"></i></button>
    <button class="btn" onclick="removeItem(${item.id},${i})"><i class="fa-solid fa-trash-can"></i></button>
</div>`)
}
// fav buttons slider functions 
const contWidth = favCont.offsetWidth
let slideInterval = contWidth / favsItems.length
let slideValue = 0
function nextSlide() {
    if (slideValue >= -slideInterval * (favsItems.length / 3)) {
        slideValue -= slideInterval
        favCont.style.transform = `translateX(${slideValue}px)`
    }
    console.log(slideValue)
}
function prevSlide() {
    if (slideValue < slideInterval) {
        slideValue += slideInterval
        favCont.style.transform = `translateX(${slideValue}px)`
    }
    console.log(slideValue)
}
// delete button hundler 
const favCards = document.querySelectorAll(".favs .product-card")
function removeItem(id, i) {
    favsItems = favsItems.filter(fav => fav.id !== id)
    favCards[i].remove()
    localStorage.setItem("favs", JSON.stringify(favsItems))
    if (favsItems.length === 0) {
        favCont.parentElement.style.display = "none"
    }
}
//add to cart handler
function addToCart(id, i) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    const favedKit = favsItems.filter(kit => kit.id === id)[0]
    console.log(favedKit)
    if (cartItems.length === 0) {
        tbody.innerHTML = `<tr class="cart-item-row">
            <td class="item-img">
            <button class="del-btn"><i class="fa-solid fa-trash-can"></i></button>
                <img src="${favedKit.image}" alt="${favedKit.name}">
            </td>
            <td>${favedKit.name}</td>
            <td>$${parseInt(favedKit.price)}</td>
            <td class="item-qty">
                <button class="decrement-btn">-</button>
                <span>1</span>
                <button class="increment-btn">+</button>
            </td>
            <td class="item-totPrice">$${parseInt(favedKit.price)}</td>
        </tr>`
    }
    else {
        tbody.innerHTML += `<tr class="cart-item-row">
            <td class="item-img">
            <button class="del-btn"><i class="fa-solid fa-trash-can"></i></button>
                <img src="${favedKit.image}" alt="${favedKit.name}">
            </td>
            <td>${favedKit.name}</td>
            <td>$${parseInt(favedKit.price)}</td>
            <td class="item-qty">
                <button class="decrement-btn">-</button>
                <span>1</span>
                <button class="increment-btn">+</button>
            </td>
            <td class="item-totPrice">$${parseInt(favedKit.price)}</td>
        </tr>`
    }
    console.log("add to cart")
    cartItems.push({ id: i, name: favedKit.name, img: favedKit.image, price: parseInt(favedKit.price), quantity: 1 })
    console.log(cartItems)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    qtySpanHandler()
    drawTable()
    removeItem(id, i)
}
