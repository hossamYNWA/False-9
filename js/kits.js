const allKits = [
    {
        name: "celta away",
        price: "8",
        image: "../images/kits/celta.png",
        faved: false,
    },
    {
        name: "juventus home",
        price: "17",
        faved: false,
        image: "../images/kits/juv.png"
    },
    {
        name: "bor. dortmund home",
        price: "14",
        faved: false,
        image: "../images/kits/bd.png"
    },
    {
        name: "napoli home",
        price: "16",
        faved: false,
        image: "../images/kits/nap.png"
    },
    {
        name: "arsenal home",
        price: "18",
        faved: false,
        image: "../images/kits/ars.png"
    },
    {
        name: "real madrid",
        price: "22",
        faved: false,
        image: "../images/kits/real.png"
    },
    {
        name: "fiorentina away",
        price: "10",
        faved: false,
        image: "../images/kits/fio.png"
    },
    {
        name: "liverpool home",
        price: "27",
        faved: false,
        image: "../images/kits/liv.png"
    },
    {
        name: "porto home",
        price: "11",
        faved: false,
        image: "../images/kits/porto.png"
    },
    {
        name: "porto away",
        price: "37",
        faved: false,
        image: "../images/kits/porto2.png"
    },
    {
        name: "tottenham away",
        price: "19",
        faved: false,
        image: "../images/kits/tot.png"
    },
    {
        name: "zamalek classic",
        price: "47",
        faved: false,
        image: "../images/kits/zm.png"
    },
    {
        name: "PSG away",
        price: "20",
        faved: false,
        image: "../images/kits/psg.png"
    }, {
        name: "lyon away",
        price: "21",
        faved: false,
        image: "../images/kits/ol.png"
    },
    {
        name: "manchester united home",
        price: "23",
        faved: false,
        image: "../images/kits/manu.png"
    }
]
// make function to ckeck item in fav or cart Array
function checkInArray(id, array) {
    const items = JSON.parse(localStorage.getItem(`${array}`)) || []
    return items.some(item => item.id === id)
}
// make function to add item to cart Array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
function addToCart(i) {
    if (!JSON.parse(localStorage.getItem("loggedIn"))) {
        location.href = 'login.html'
        return false;
    }
    if (checkInArray(i, "favs")) {
        let favs = JSON.parse(localStorage.getItem("favs"))
        favs = favs.filter(fav => fav.id !== i)
        localStorage.setItem("favs", JSON.stringify(favs))
        document.querySelectorAll(".product-card button[name='favBtn']")[i].innerHTML = '<i class="fa-regular fa-heart"></i>'
    }
    console.log("adding kit")
    if (cartItems.findIndex(item => item.id === i) === -1) {
        cartItems.push({ id: i, name: allKits[i].name, price: Number(allKits[i].price), quantity: 1, img: allKits[i].image })
    }
    else {
        cartItems.find(item => item.id === i).quantity++
    }
    const totalQty = cartItems.length;
    const qtySpan = document.querySelectorAll(".logged-user span")
    qtySpan[0].innerHTML = totalQty
    qtySpan[1].innerHTML = totalQty
    localStorage.setItem("totalQty", totalQty)
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}
function cardMaker(name, price, image, i, faved) {
    return `<div class="product-card">
    <img class="product-image" src="${image}" alt="Product Image">
    <div class="product-name">${name}</div>
    <div class="product-price">$${price}</div>
    <button class="btn " onclick="addToCart(${i})"><i class="fas fa-shopping-cart"></i></button>
    <button class="btn" name="favBtn">${faved ? '<i class="fas fa-heart faved"></i>' : '<i class="fa-regular fa-heart"></i>'}</button>
</div>`
}

const container = document.getElementById("kits_container")
function fillContainer(arr) {
    container.innerHTML = ""
    arr.forEach((kit, index) => container.innerHTML += cardMaker(kit.name, kit.price, kit.image, index, kit.faved))
}
fillContainer(allKits)
// search field onunhandler
const searchField = document.getElementById("search-input")
searchField.addEventListener("keyup", () => {
    const searchTerm = searchField.value.trim().toLowerCase()
    const filteredKits = allKits.filter(kit => kit.name.toLowerCase().includes(searchTerm))
    fillContainer(filteredKits)
})

// dealing with favourites 
const favBtns = document.querySelectorAll("button[name='favBtn']")
let favs = JSON.parse(localStorage.getItem("favs")) || [];
favBtns.forEach((btn, i) => btn.addEventListener("click", () => {
    if (!JSON.parse(localStorage.getItem("loggedIn"))) {
        location.href = 'login.html'
        return false;
    }
    const favedKit = { ...allKits[i], id: i, faved: true }
    cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
    if (checkInArray(i, "cartItems")) {
        alert("this kit is already in your cart!")
        return false;
    }
    else {
        if (btn.children[0].classList.contains("fa-regular")) {
            btn.innerHTML = '<i class="fas fa-heart faved"></i>'
            if (!allKits[i].faved) {
                allKits[i].faved = true
                favs.push(favedKit)
            }
        }
        else {
            allKits[i].faved = false
            btn.innerHTML = '<i class="fa-regular fa-heart"></i>'
            favs = favs.filter(fav => fav.id !== i)
        }
        localStorage.setItem("favs", JSON.stringify(favs))
    }

}))

const cardsNames = document.querySelectorAll(".product-name")
cardsNames.forEach(card => {
    if (card.textContent.length > 16) {
        card.style.fontSize = "14px"
    }
})
