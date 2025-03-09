let edittexxt1 = document.getElementById("edittext1");
let edittexxt2 = document.getElementById("edittext2");
let button1 = document.getElementById("button1");
let modal = document.getElementById("myModal");

let alert1 = document.getElementById("alert1");
let alertText1 = document.getElementById("alertText1");

alert1.style.display = "none";
const url = "http://localhost:3000/auth/login";



button1.addEventListener("click", (event) => {
    event.preventDefault();
    alert1.style.display = "block";
  
    let data = {
      phone: `${edittexxt1.value}`,
      password: `${edittexxt2.value}`
    };
  
   
      loginUser(url, data);
   
  });
  
  async function loginUser(url, data) {
    
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
        setCookie("id", result.id,10);
        setCookie("username", result.username, 10);
        alertText1.textContent = getCookie("id");
        window.location.href="../index.html";
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