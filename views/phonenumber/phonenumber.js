import api from "../admin/crudApiAdmin.js";

let phoneTable = document.querySelector(".phone-table");
const tbody = document.getElementById("number-tbody");
const edittextSearch = document.getElementById("edittextSearch");

const urlgetall = "http://localhost:3000/phone/getall";
const urlgphonenumberupdate = "http://localhost:3000/auth/updatephone";

let modalPhn = document.getElementById("modalPhn");
let modalPhnText = document.getElementById("modalPhnText");
let modalPhnBtn = document.getElementById("modalPhnBtn");

let phonelist = [];
let phoneIndex = -1;

let userIndex = getCookie("id");


getALlPhone();
async function getALlPhone(){
  // let phoneList = await api.getAll(urlgetall);
  // phonelist = phoneList;
  // readAllPhone(phonelist);
  try {
    let phoneList = await api.getAll(urlgetall);
    
    console.log(" 📡 API dan kelgan ma'lumot:", phoneList); // 🔍 Tekshirish
    
    if (!Array.isArray(phoneList)) {
      console.error(" Xatolik: API noto‘g‘ri formatda ma’lumot qaytardi!", phoneList);
      phoneList = []; // Agar noto‘g‘ri bo‘lsa, bo‘sh massiv qilib qo‘yamiz
    }

    phonelist = phoneList;
    readAllPhone(phonelist);
  } catch (error) {
    console.error(" Xatolik: API dan ma’lumot olishda muammo!", error);
    phonelist = []; // Agar API xatolik bersa, bo‘sh massiv qilib qo‘yamiz
    readAllPhone(phonelist);
  }
  
}



// READPHONE
// SEARCH

edittextSearch.addEventListener("input", (event) => {
  //const searchText = this.value.toLowerCase();
  const searchText = event.target.value.toLowerCase();
  const filteredData = phonelist.filter(
    (phone) =>
      phone.number.toLowerCase().includes(searchText) ||
      phone.price.toLowerCase().includes(searchText)
  );
  phonelist=filteredData;
  
  if(event.target.value==""){
    getALlPhone();
  }else{
    readAllPhone(filteredData);
  }
});
// SEARCH


function readAllPhone(phoneList) { 
  console.log(phoneList);
  if (!Array.isArray(phoneList)) {
    console.error("❌ Xatolik: readAllPhone() ga noto‘g‘ri ma’lumot yuborildi!", phoneList);
    return; // Agar noto‘g‘ri bo‘lsa, funksiyani to‘xtatamiz
  } 
  tbody.innerHTML = ""; // Eski ma'lumotlarni tozalash
  phoneList.forEach((item) => {
    let trow = tableRow(item);
    tbody.insertAdjacentHTML("beforeend", trow);
  });
}

function tableRow(item) {
  return `<tr>
                  <th scope="row">${item.id}</th>
                  <td>${item.number}</td>
                  <td>${item.price}</td>
                 
                  <td>
                    <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Ulanish</a>
                  </td>
                </tr>    
          `;
}

// READPHONE






//UPDATE PACKAGE PHONE NUMBER
phoneTable.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("link-primary")) {
    let listGroupItems = document.querySelectorAll(".phone-table .link-primary");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", phonelist[index].id);
    phoneIndex = phonelist[index].id;
    phoneIndex = index;
    let modalPn = new bootstrap.Modal(modalPhn, {
      keyboard: false,
    });
    modalPn.show();
    modalPhnText.textContent = `${phonelist[index].number} Raqamni  ni ${phonelist[index].price} UZS ga`;
  }
});

async function updatePhoneN() {
  console.log(userIndex);
  let data = {
    phone:phonelist[phoneIndex].number,
  };

  let uptPhn = await api.update(urlgphonenumberupdate, userIndex, data); //userIndex need
  console.log(uptPhn.phone);
  
  
  phoneIndex = -1;
}

modalPhnBtn.addEventListener("click", (event) => {
  updatePhoneN();
  edittextSearch.value="";
  getALlPhone();
 
 
});
//UPDATE PACKAGE PHONE NUMBER





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
function deleteAllCookies() {
  let cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    let [key] = cookies[i].split("=");
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
}

// deleteAllCookies(); // Barcha cookie-larni o‘chiradi

