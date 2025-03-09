let modal = document.getElementById("myModal");
let edittexxt1 = document.getElementById("edittext1");
let edittexxt2 = document.getElementById("edittext2");
let edittexxt3 = document.getElementById("edittext3");
let edittexxt4 = document.getElementById("edittext4");
let edittexxt5 = document.getElementById("edittext5");
let button1 = document.getElementById("button1");
let alert1 = document.getElementById("alert1");
let alertText1 = document.getElementById("alertText1");

alert1.style.display = "none";

const url = "http://localhost:3000/auth/register";

button1.addEventListener("click", (event) => {
  event.preventDefault();
  alert1.style.display = "block";

  let data = {
    username: `${edittexxt1.value}`,
    lastname: `${edittexxt2.value}`,
    phone: `${edittexxt3.value}`,
    password: `${edittexxt4.value}`,
  };

  if (edittexxt4.value === edittexxt5.value) {
    registerUser(url, data);
  } else {
    alertText1.textContent = "Parol da xatolik";
  }
});

async function registerUser(url, data) {
  //alert1.style.display="none";
  let myModal = new bootstrap.Modal(modal, {
    keyboard: false,
  });
  myModal.show();

  try {
    let response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    let result = await response.json();
    console.log(result);

    if (response.ok) {
      alert1.classList.remove("alert-danger");
      alert1.classList.add("alert-primary");
      alertText1.textContent = result.message;
      setCookie("phone", edittexxt3.value, 10);
      setCookie("id", result.user.id, 10);
      console.log(result.user.id);
      alertText1.textContent = getCookie("phone");
      window.location.href="login.html";
    } else {
      alert1.classList.remove("alert-primary");
      alert1.classList.add("alert-danger");
      alertText1.textContent = result.message;
    }
    modal.addEventListener("shown.bs.modal", () => {
      myModal.hide();
    });
  } catch (error) {
    alert1.classList.remove("alert-primary");
    alert1.classList.add("alert-danger");
    alertText1.textContent = error.message;
    modal.addEventListener("shown.bs.modal", () => {
      myModal.hide();
    });
  }
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

//setCookie("username", "Fourcade", 7); // 7 kun saqlanadi

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    let [key, value] = cookies[i].split("=");
    if (key === name) return value;
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// deleteCookie("username");

//console.log(getCookie("username")); // "Fourcade"
//console.log(document.cookie);
