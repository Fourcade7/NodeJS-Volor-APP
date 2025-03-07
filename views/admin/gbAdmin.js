
import api from "./crudApiAdmin.js";



let edittexxt1 = document.getElementById("gbedittext1");
let edittexxt2 = document.getElementById("gbedittext2");
let edittexxt3gb = document.getElementById("gbedittext3");
let buttonadd = document.getElementById("gbbuttonadd");

let edittexxt4 = document.getElementById("gbmedittext1");
let edittexxt5 = document.getElementById("gbmedittext2");
let edittexxt6 = document.getElementById("gbmedittext3");
let modalUpdate = document.getElementById("modalUpdateGb");
let modalUptGbBtn = document.getElementById("modalUptGbBtn");
let modalProgress = document.getElementById("modalProgress");
let modalDelete = document.getElementById("modalDeleteGb");
let modalDelText = document.getElementById("deletedGb");
let modalDelBtn = document.getElementById("modalDelBtnGb");
let gbTable = document.querySelector(".gb-table");
const tbody = document.getElementById("gb-tbody");

let gblist = [];
let gbIndex = -1;


const urladd = "http://localhost:3000/gb/add";
const urlgetall = "http://localhost:3000/gb/getall";
const urldelete = "http://localhost:3000/gb/delete";
const urlupdate = "http://localhost:3000/gb/update";





buttonadd.addEventListener("click", (event)=>{
        event.preventDefault();
        let data={
            gb:`${edittexxt1.value}`,
            ussd:`${edittexxt2.value}`,
            price:`${edittexxt3gb.value}`
        }
        addGb(urladd, data);


});

async function addGb(url,data) {
    let modalAdd = new bootstrap.Modal(modalProgress, {
        keyboard: false,
      });
      modalAdd.show();
    await api.add(url,data);
    modalProgress.addEventListener('shown.bs.modal', () => {
        modalAdd.hide();
    })
    readAllGb();
}

// READPHONE

readAllGb();


async function readAllGb() {
  let gbList=await api.getAll(urlgetall);
  gblist=gbList;
  tbody.innerHTML = ""; // Eski ma'lumotlarni tozalash
  gbList.forEach((item) => {
    let trow = tableRow(item);
    tbody.insertAdjacentHTML("beforeend", trow);
  });
}


function tableRow(item) {
    return `<tr>
                  <th scope="row">${item.id}</th>
                  <td>${item.gb}</td>
                  <td>${item.ussd}</td>
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
gbTable.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("link-danger")) {
    let listGroupItems = document.querySelectorAll(".gb-table .link-danger");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", gblist[index].id);
    gbIndex = gblist[index].id;
    let modalDel = new bootstrap.Modal(modalDelete, {
      keyboard: false,
    });
    modalDel.show();
    modalDelText.textContent = `${gblist[index].gb}`;
  }
});  

async function delGb() {
   let delGb = await api.deletee(urldelete, gbIndex);
    console.log(delGb.message);
    readAllGb();
    gbIndex = -1;
}

modalDelBtn.addEventListener("click", (event) => {
  delGb();
});
//DELETE USER  



//UPDATE USER  

gbTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-warning")) {
    let listGroupItems = document.querySelectorAll(".gb-table .link-warning");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", gblist[index].id);
    gbIndex = gblist[index].id;
    let modalUptG = new bootstrap.Modal(modalUpdate, {
      keyboard: false,
    });
    modalUptG.show();
    edittexxt4.value= `${gblist[index].gb}`;
    edittexxt5.value= `${gblist[index].ussd}`;
    edittexxt6.value= `${gblist[index].price}`;
  }
});  

async function uptGb() {

  let data={
    gb:`${edittexxt4.value}`,
    ussd:`${edittexxt5.value}`,
    price:`${edittexxt6.value}`,
  }

  let uptGb = await api.update(urlupdate,gbIndex,data);
   console.log(uptGb.message);
   readAllGb();
   gbIndex = -1;
}

modalUptGbBtn.addEventListener("click",()=>{
  uptGb();
});

//UPDATE USER  


