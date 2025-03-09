import api from "./admin/crudApiAdmin.js";


let planRow = document.querySelector(".plan-row");
let textviewUsername = document.getElementById("textviewUsername");
let textviewLogin = document.getElementById("textviewLogin");
let textviewRegister = document.getElementById("textviewRegister");
let userContent = document.getElementById("userContent");

if(getCookie("username")==null){
 textviewLogin.style.display="block";
 textviewRegister.style.display="block";
 userContent.style.display="none";
 textviewUsername.textContent="";

}else{
  textviewLogin.style.display="none";
  textviewRegister.style.display="none";
  userContent.style.display="block";
  textviewUsername.textContent=getCookie("username");

}




let planlist = [];
let planIndex = -1;



const urlgetall = "http://localhost:3000/plan/getall";



readAllplan();


async function readAllplan() {
  let planList=await api.getAll(urlgetall);
  planlist=planList;
  planRow.innerHTML = ""; // Eski ma'lumotlarni tozalash
  planList.forEach((item) => {
    let planColAdd = planCol(item);
    planRow.insertAdjacentHTML("beforeend", planColAdd);
  });
}


  // READPLAN
function planCol(item) {
    return `
    <div class="col mt-1 mt-sm-1 mt-lg-2 mt-md-2">
              <div class="card" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                   <p class="card-title"><small>${item.description}</small></p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${item.gb} GB</li>
                  <li class="list-group-item">${item.sms} SMS</li>
                  <li class="list-group-item">${item.minute} MINUT</li>
                  <li class="list-group-item">${item.price} UZS / oyiga</li>
                </ul>
                <div class="card-body d-grid">
                  <a href="/views/plans/plans.html" class="card-link btn btn-outline-primary">Ulanish</a>
                </div>
              </div>
    </div> `;
}

  // READPLAN




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