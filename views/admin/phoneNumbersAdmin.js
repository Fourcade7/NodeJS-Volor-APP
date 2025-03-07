import api from "./crudApiAdmin.js";



let edittexxt1 = document.getElementById("nedittext1");
let edittexxt2 = document.getElementById("nedittext2");
let buttonadd = document.getElementById("nbutton1");

let edittexxt3 = document.getElementById("pdedittext1");
let edittexxt4 = document.getElementById("pdedittext2");
let modalUpdate = document.getElementById("modalUpdatePhone");
let modalUptPhoneDBtn = document.getElementById("modalUptPhoneDBtn");
let modalProgress = document.getElementById("modalProgress");
let modalDelete = document.getElementById("modalDeletePhone");
let modalDelText = document.getElementById("deletedPhone");
let modalDelBtn = document.getElementById("modalDelBtnPhone");
let phoneTable = document.querySelector(".phone-table");
const tbody = document.getElementById("phone-tbody");

let phonelist = [];
let phoneIndex = -1;


const urladd = "http://localhost:3000/phone/add";
const urlgetall = "http://localhost:3000/phone/getall";
const urldelete = "http://localhost:3000/phone/delete";
const urlupdate = "http://localhost:3000/phone/update";





buttonadd.addEventListener("click", (event)=>{
        event.preventDefault();
        let data={
            number:`${edittexxt1.value}`,
            price:`${edittexxt2.value}`
        }
        addPhoneNumber(urladd, data);


});

async function addPhoneNumber(url,data) {
    let modalAdd = new bootstrap.Modal(modalProgress, {
        keyboard: false,
      });
      modalAdd.show();
    await api.add(url,data);
    modalProgress.addEventListener('shown.bs.modal', () => {
        modalAdd.hide();
    })
    readAllPhone();
}

// READPHONE

readAllPhone();


async function readAllPhone() {
  let phoneList=await api.getAll(urlgetall);
  phonelist=phoneList;
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
                    <a href="#" class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">O'zgartirish</a>
                    <a href="#" class="link-danger ms-3 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">O'chirish</a>
                  </td>
                </tr>    
          `;
}

  // READPHONE


//DELETE USER
phoneTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-danger")) {
    let listGroupItems = document.querySelectorAll(".phone-table .link-danger");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", phonelist[index].id);
    phoneIndex = phonelist[index].id;
    let modalDel = new bootstrap.Modal(modalDelete, {
      keyboard: false,
    });
    modalDel.show();
    modalDelText.textContent = `${phonelist[index].number}`;
  }
});  

async function delPhone() {
   let delPh = await api.deletee(urldelete, phoneIndex);
    console.log(delPh.message);
    readAllPhone();
    phoneIndex = -1;
}

modalDelBtn.addEventListener("click", (event) => {
  delPhone();
});
//DELETE USER  



//UPDATE USER  

phoneTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-warning")) {
    let listGroupItems = document.querySelectorAll(".phone-table .link-warning");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", phonelist[index].id);
    phoneIndex = phonelist[index].id;
    let modalUptP = new bootstrap.Modal(modalUpdate, {
      keyboard: false,
    });
    modalUptP.show();
    edittexxt3.value= `${phonelist[index].number}`;
    edittexxt4.value= `${phonelist[index].price}`;
  }
});  

async function uptPhone() {

  let data={
    number:`${edittexxt3.value}`,
    price:`${edittexxt4.value}`,
  }

  let uptPh = await api.update(urlupdate,phoneIndex,data);
   console.log(uptPh.message);
   readAllPhone();
   phoneIndex = -1;
}

modalUptPhoneDBtn.addEventListener("click",()=>{
  uptPhone();
});

//UPDATE USER  


