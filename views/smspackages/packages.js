import api from "../admin/crudApiAdmin.js";


let smsTable = document.querySelector(".sms-table");
let gbTable = document.querySelector(".gb-table");
const tbody = document.getElementById("sms-tbody");
const gbtbody = document.getElementById("gb-tbody");

let modalPSms = document.getElementById("modalPSms");
let modalPSmsText = document.getElementById("modalPSmsText");
let modalPSmsBtn = document.getElementById("modalPSmsBtn");


let modalGb = document.getElementById("modalPGb");
let modalPGbText = document.getElementById("modalPGbText");
let modalPGbBtn = document.getElementById("modalPGbBtn");


let myModal = document.getElementById("myModal");
let textViewAlertMessage = document.getElementById("textViewAlertMessage");



const urlgetall = "http://localhost:3000/sms/getall";
const urlgetallgb = "http://localhost:3000/gb/getall";
const urlpackagesms = "http://localhost:3000/auth/updatesms";
const urlpackagegb = "http://localhost:3000/auth/updategb";



let smslist = [];
let smsIndex = -1;

let userIndex = getCookie("id");



let gblist = [];
let gbIndex = -1;




// READGB

readAllGb();


async function readAllGb() {
  let gbList=await api.getAll(urlgetallgb);
  gblist=gbList;
  gbtbody.innerHTML = ""; // Eski ma'lumotlarni tozalash
  gbList.forEach((item) => {
    let trow = tableRowGb(item);
    gbtbody.insertAdjacentHTML("beforeend", trow);
  });
}


function tableRowGb(item) {
    return `<tr>
                  <th scope="row">${item.id}</th>
                  <td>${item.gb}</td>
                  <td>${item.ussd}</td>
                  <td>${item.price}</td>
                  <td>
                    <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Ulanish</a>
                   
                  </td>
                </tr>    
          `;
}

  // READGB



readAllSms();


async function readAllSms() {
  let smsList=await api.getAll(urlgetall);
  smslist=smsList;
  tbody.innerHTML = ""; // Eski ma'lumotlarni tozalash
  smsList.forEach((item) => {
    let trow = tableRow(item);
    tbody.insertAdjacentHTML("beforeend", trow);
  });
}


function tableRow(item) {
    return `<tr>
                  <th scope="row">${item.id}</th>
                  <td>${item.sms}</td>
                  <td>${item.ussd}</td>
                  <td>${item.price}</td>
                  <td>
                    <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Ulanish</a>
                  </td>
                </tr>    
          `;
}

  // READSMS


  //UPDATE PACKAGE SMS
  smsTable.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("link-primary")) {
      let listGroupItems = document.querySelectorAll(".sms-table .link-primary");
      let index = Array.from(listGroupItems).indexOf(event.target);
      console.log("clicked, Index:", index);
      console.log("clicked, Index:", smslist[index].id);
      smsIndex = smslist[index].id;
      smsIndex=index;
      let modalS = new bootstrap.Modal(modalPSms, {
        keyboard: false,
      });
      modalS.show();
      modalPSmsText.textContent = `${smslist[index].sms} SMS  ni ${smslist[index].price} UZS ga`;
    }
  });  


   async function updateSmsPackage() {
      console.log(userIndex);
      let data={
        
        psms:smslist[smsIndex].sms,
        
        
      }
       
      let uptPsms = await api.update(urlpackagesms, userIndex,data);  //userIndex need
      console.log(uptPsms.message);
      let modalA = new bootstrap.Modal(myModal, {
        keyboard: false,
      });
      modalA.show();
      textViewAlertMessage.textContent = "Yangi paket ulandi";
      readAllSms();
      smsIndex = -1;
    }
    
    modalPSmsBtn.addEventListener("click", (event) => {
      updateSmsPackage();
    });
  //UPDATE PACKAGE SMS



   //UPDATE PACKAGE GB
   gbTable.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("link-primary")) {
      let listGroupItems = document.querySelectorAll(".gb-table .link-primary");
      let index = Array.from(listGroupItems).indexOf(event.target);
      console.log("clicked, Index:", index);
      console.log("clicked, Index:", gblist[index].id);
      gbIndex = gblist[index].id;
      gbIndex=index;
      let modalG = new bootstrap.Modal(modalGb, {
        keyboard: false,
      });
      modalG.show();
      modalPGbText.textContent = `${gblist[index].gb} GB  ni ${gblist[index].price} UZS ga`;
    }
  });  


   async function updateGbPackage() {
      console.log(userIndex);
      let data={
        
        pgb:gblist[gbIndex].gb,
        
        
      }
       
      let uptPgb = await api.update(urlpackagegb, userIndex,data);  //userIndex need
      console.log(uptPgb.message);
      let modalA = new bootstrap.Modal(myModal, {
        keyboard: false,
      });
      modalA.show();
      textViewAlertMessage.textContent = "Yangi paket ulandi";
      readAllSms();
      gbIndex = -1;
    }
    
    modalPGbBtn.addEventListener("click", (event) => {
      updateGbPackage();
    });
  //UPDATE PACKAGE GB





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