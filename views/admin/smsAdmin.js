
import api from "./crudApiAdmin.js";



let edittexxt1 = document.getElementById("saedittext1");
let edittexxt2 = document.getElementById("saedittext2");
let edittexxt3 = document.getElementById("saedittext3");
let buttonadd = document.getElementById("sabuttonadd");

let edittexxt4 = document.getElementById("samedittext1");
let edittexxt5 = document.getElementById("samedittext2");
let edittexxt6 = document.getElementById("samedittext3");
let modalUpdate = document.getElementById("modalUpdateSms");
let modalUptSmsBtn = document.getElementById("modalUptSmsBtn");
let modalProgress = document.getElementById("modalProgress");
let modalDelete = document.getElementById("modalDeleteSms");
let modalDelText = document.getElementById("deletedSms");
let modalDelBtn = document.getElementById("modalDelBtnSms");
let smsTable = document.querySelector(".sms-table");
const tbody = document.getElementById("sms-tbody");

let smslist = [];
let smsIndex = -1;


const urladd = "http://localhost:3000/sms/add";
const urlgetall = "http://localhost:3000/sms/getall";
const urldelete = "http://localhost:3000/sms/delete";
const urlupdate = "http://localhost:3000/sms/update";





buttonadd.addEventListener("click", (event)=>{
        event.preventDefault();
        let data={
            sms:`${edittexxt1.value}`,
            ussd:`${edittexxt2.value}`,
            price:`${edittexxt3.value}`
        }
        addSms(urladd, data);


});

async function addSms(url,data) {
    let modalAdd = new bootstrap.Modal(modalProgress, {
        keyboard: false,
      });
      modalAdd.show();
    await api.add(url,data);
    modalProgress.addEventListener('shown.bs.modal', () => {
        modalAdd.hide();
    })
    readAllSms();
}

// READSMS

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
                    <a href="#" class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">O'zgartirish</a>
                    <a href="#" class="link-danger ms-1 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">O'chirish</a>
                  </td>
                </tr>    
          `;
}

  // READSMS


//DELETE SMS
smsTable.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("link-danger")) {
    let listGroupItems = document.querySelectorAll(".sms-table .link-danger");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", smslist[index].id);
    smsIndex = smslist[index].id;
    let modalDel = new bootstrap.Modal(modalDelete, {
      keyboard: false,
    });
    modalDel.show();
    modalDelText.textContent = `${smslist[index].sms}`;
  }
});  

async function delSms() {
   let delSms = await api.deletee(urldelete, smsIndex);
    console.log(delSms.message);
    readAllSms();
    smsIndex = -1;
}

modalDelBtn.addEventListener("click", (event) => {
  delSms();
});
//DELETE SMS  



//UPDATE SMS  

smsTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-warning")) {
    let listGroupItems = document.querySelectorAll(".sms-table .link-warning");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", smslist[index].id);
    smsIndex = smslist[index].id;
    let modalUptS = new bootstrap.Modal(modalUpdate, {
      keyboard: false,
    });
    modalUptS.show();
    edittexxt4.value= `${smslist[index].sms}`;
    edittexxt5.value= `${smslist[index].ussd}`;
    edittexxt6.value= `${smslist[index].price}`;
  }
});  

async function uptSms() {

  let data={
    sms:`${edittexxt4.value}`,
    ussd:`${edittexxt5.value}`,
    price:`${edittexxt6.value}`,
  }

  let uptSms = await api.update(urlupdate,smsIndex,data);
   console.log(uptSms.message);
   readAllSms();
   smsIndex = -1;
}

modalUptSmsBtn.addEventListener("click",()=>{
  uptSms();
});

//UPDATE SMS  


