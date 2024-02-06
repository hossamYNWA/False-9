// register user handler


function registerUser() {
    console.log("registring user")
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const pw = document.getElementById('pw');
    const rePw = document.getElementById('re_pw');
    const mail = document.getElementById('mail').value;
    if (pw.value !== rePw.value) {
        pw.style.outlineColor = "red"
        rePw.style.outlineColor = "red"
        document.querySelector("form").innerHTML += "<p style='color:red'>passwords do not match</p>";
        return false;
    }
    if (pw.value.length < 6) {
        pw.style.outlineColor = "red"
        document.querySelector("form").innerHTML += "<p style='color:red'>password too short</p>";
        return false;
    }
    if (localStorage.getItem(username)) {
        document.querySelector("form").innerHTML += "<p style='color:red'>this username has been used before </p>";
        return false;
    }
    if (name && username && pw.value && mail) {
        const userData = JSON.stringify({ name, username, password: pw.value, mail })
        localStorage.setItem(username, userData)
        location.href = "login.html"
        return false
    }
    else {
        alert("Please fill in all fields")
    }

}

// user login handler
function loginUser() {
    console.log("logging in user")
    const username = document.getElementById('username').value;
    const pw = document.getElementById('pw').value;
    if (!localStorage.getItem(username)) {
        document.querySelector("form").innerHTML += "<p style='color:red'>incorrect username</p>";
        return false;
    }
    else {
        const userData = JSON.parse(localStorage.getItem(username));
        if (pw === userData.password) {
            document.querySelector('main').innerHTML = `<h1>Welcome ${userData.name}</h1>`
            setTimeout(function() {
                location.href = "jerseys.html"
            }, 1000)
            localStorage.setItem("loggedIn", true)
        }
        else {
            document.querySelector("form").innerHTML += "<p style='color:red'>incorrect password</p>";
        }
    }
    return false
}