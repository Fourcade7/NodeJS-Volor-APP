import api from "../admin/crudApiAdmin.js";


let planRow = document.querySelector(".plan-row");

let modalConnect = document.getElementById("modalConPlan");
let modalConText = document.getElementById("conPlanText");
let modalConBtn = document.getElementById("modalConBtnPlan");


let myModal = document.getElementById("myModal");
let textViewAlertMessage = document.getElementById("textViewAlertMessage");

let planlist = [];
let planIndex = -1;
let itemIndex = -1;
let userIndex = getCookie("id");



const urlgetall = "http://localhost:3000/plan/getall";
const urlconplan = "http://localhost:3000/auth/updateplan";

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


//READPLAN <img src="https://cdn1.ozone.ru/s3/multimedia-f/6286962459.jpg" class="card-img-top object-fit-cover" height="250" alt="...">
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
                  <a href="#" class="card-link btn btn-outline-primary">Ulanish</a>
                </div>
              </div>
    </div> `;
}

// READPLAN


//UPDATE PLAN
  planRow.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("btn-outline-primary")) {
      let listGroupItems = document.querySelectorAll(".plan-row .btn-outline-primary");
      let index = Array.from(listGroupItems).indexOf(event.target);
      console.log("clicked, Index:", index);
      console.log("clicked, Index:", planlist[index].id);
      planIndex = planlist[index].id;
      itemIndex=index;
      let modalC = new bootstrap.Modal(modalConnect, {
        keyboard: false,
      });
      modalC.show();
      modalConText.textContent = `${planlist[index].name}`;
    }
  });  
  
  async function conPlan() {
    console.log(userIndex);
    let data={
      planName:planlist[itemIndex].name,
      gb:planlist[itemIndex].gb,
      sms:planlist[itemIndex].sms,
      minute:planlist[itemIndex].minute,
      price:planlist[itemIndex].price,
      
    }
     
    let conPlan = await api.update(urlconplan, userIndex,data);  //userIndex need
    console.log(conPlan.message);
    
    let modalA = new bootstrap.Modal(myModal, {
      keyboard: false,
    });
    modalA.show();
    textViewAlertMessage.textContent = "Yangi tarifga ulandi";
    readAllplan();
    planIndex = -1;
  }
  
  modalConBtn.addEventListener("click", (event) => {
    conPlan();
  });




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
  
  //UPDATE PLAN  

  function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedMonth = month.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    console.log("Formatted Month:", formattedMonth);
    console.log("Formatted Time:", `${hours}:${formattedMinutes}:${seconds}`);

    return { year, month, day, hours, minutes, seconds, formattedMonth, formattedMinutes };
}
