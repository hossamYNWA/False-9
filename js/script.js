if (!localStorage.getItem("totalQty")) {
    localStorage.setItem("totalQty", 0)
}
const menuToggle = document.querySelector(".menu-toggle i")
const menuItems = document.querySelectorAll("nav .nav-items li")
const jers = document.querySelector(".jers")
const menuList = document.querySelectorAll(".menu-list")
menuToggle.addEventListener('click', function() {
    menuList[1].classList.toggle('show-menu');
});

jers.addEventListener('mouseover', function() {
    menuList[0].classList.add('show-menu');
})
jers.addEventListener('mouseout', function() {
    menuList[0].classList.remove('show-menu');
})


// dealing with login icon
let logged = localStorage.getItem("loggedIn")
const loginLi = document.getElementById('login') || []
const loginLi2 = document.getElementById('login2') || []

const setlogin = (logged) => {
    if (logged ==="true") {
        loginLi.innerHTML = `<a href="cart.html" class="logged-user"><i class="fa-solid fa-cart-shopping"></i><span>${localStorage.getItem("totalQty")}</span></a>
        <div class="log-icons"><a href="login.html"><i class="fa-regular fa-user"></i></a><a onclick="logout()" ><i class="fa-solid fa-arrow-right-from-bracket"></i></a></div>`
        loginLi2.innerHTML = `<a href="cart.html" class="logged-user"><i class="fa-solid fa-cart-shopping"></i><span>${localStorage.getItem("totalQty")}</span></a>
            <div class="log-icons"><a href="login.html"><i class="fa-regular fa-user"></i></a><a onclick="logout()" ><i class="fa-solid fa-arrow-right-from-bracket"></i></a></div>`}
    else {
        loginLi.innerHTML = `<a href="login.html">Log in</a>`
        loginLi2.innerHTML = `<a href="login.html">Log in</a>`
    }
}


function logout() {
    console.log("logging out")
    localStorage.setItem("loggedIn", false)
    location.href = "./index.html"
    setlogin(false)
}
setlogin(logged)