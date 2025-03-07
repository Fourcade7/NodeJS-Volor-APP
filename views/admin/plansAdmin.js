
import api from "./crudApiAdmin.js";


let edittexxt1 = document.getElementById("paedittext1");
let edittexxt2 = document.getElementById("paedittext2");
let edittexxt3 = document.getElementById("paedittext3");
let edittexxt4 = document.getElementById("paedittext4");
let edittexxt5 = document.getElementById("paedittext5");
let edittexxt6 = document.getElementById("paedittext6");
let buttonadd = document.getElementById("pabuttonadd");

let edittexxt7 = document.getElementById("pmedittext1");
let edittexxt8 = document.getElementById("pmedittext2");
let edittexxt9 = document.getElementById("pmedittext3");
let edittexxt10 = document.getElementById("pmedittext4");
let edittexxt11 = document.getElementById("pmedittext5");
let edittexxt12 = document.getElementById("pmedittext6");

let modalUpdate = document.getElementById("modalUpdatePlan");
let modalUptBtn = document.getElementById("modalUptPlanBtn");
let modalProgress = document.getElementById("modalProgress");
let modalDelete = document.getElementById("modalDeletePlan");
let modalDelText = document.getElementById("deletedPlan");
let modalDelBtn = document.getElementById("modalDelBtnPlan");
let planRow = document.querySelector(".plan-row");
const tbody = document.getElementById("plan-tbody");

let planlist = [];
let planIndex = -1;


const urladd = "http://localhost:3000/plan/add";
const urlgetall = "http://localhost:3000/plan/getall";
const urldelete = "http://localhost:3000/plan/delete";
const urlupdate = "http://localhost:3000/plan/update";





buttonadd.addEventListener("click", (event)=>{
        event.preventDefault();
        let data={
            name:`${edittexxt1.value}`,
            description:`${edittexxt6.value}`,
            gb:`${edittexxt2.value}`,
            sms:`${edittexxt3.value}`,
            minute:`${edittexxt4.value}`,
            price:`${edittexxt5.value}`,
            
        }
        addPlan(urladd, data);


});

async function addPlan(url,data) {
    let modalAdd = new bootstrap.Modal(modalProgress, {
        keyboard: false,
      });
      modalAdd.show();
    await api.add(url,data);
    modalProgress.addEventListener('shown.bs.modal', () => {
        modalAdd.hide();
    })
    readAllplan();
}

// READPPLAN

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


function planCol(item) {
    return `
    <div class="col mt-1 mt-sm-1 mt-lg-2 mt-md-2">
              <div class="card" style="width: 18rem">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                   <p class="card-title"><small>${item.description}</small></p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${item.gb}</li>
                  <li class="list-group-item">${item.sms}</li>
                  <li class="list-group-item">${item.minute}</li>
                </ul>
                <div class="card-body">
                  <a href="#" class="card-link link-warning">O'zgartirish</a>
                  <a href="#" class="card-link link-danger">O'chirish</a>
                </div>
              </div>
    </div> 
          `;
}

  // READPLAN


//DELETE PLAN
planRow.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("link-danger")) {
    let listGroupItems = document.querySelectorAll(".plan-row .link-danger");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", planlist[index].id);
    planIndex = planlist[index].id;
    let modalDel = new bootstrap.Modal(modalDelete, {
      keyboard: false,
    });
    modalDel.show();
    modalDelText.textContent = `${planlist[index].name}`;
  }
});  

async function delPlan() {
   let delPlan = await api.deletee(urldelete, planIndex);
    console.log(delPlan.message);
    readAllplan();
    planIndex = -1;
}

modalDelBtn.addEventListener("click", (event) => {
  delPlan();
});
//DELETE PLAN  



//UPDATE Plan  

planRow.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-warning")) {
    let listGroupItems = document.querySelectorAll(".plan-row .link-warning");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", planlist[index].id);
    planIndex = planlist[index].id;
    let modalUptP = new bootstrap.Modal(modalUpdate, {
      keyboard: false,
    });
    modalUptP.show();
    edittexxt7.value= `${planlist[index].name}`;
    edittexxt8.value= `${planlist[index].description}`;
    edittexxt9.value= `${planlist[index].gb}`;
    edittexxt10.value= `${planlist[index].sms}`;
    edittexxt11.value= `${planlist[index].minute}`;
    edittexxt12.value= `${planlist[index].price}`;
    
  }
});  

async function uptPlan() {

  let data={
    name:`${edittexxt7.value}`,
    description:`${edittexxt8.value}`,
    gb:`${edittexxt9.value}`,
    sms:`${edittexxt10.value}`,
    minute:`${edittexxt11.value}`,
    price:`${edittexxt12.value}`
  }

  let uptPl = await api.update(urlupdate,planIndex,data);
   console.log(uptPl.message);
   readAllplan();
   planIndex = -1;
}

modalUptBtn.addEventListener("click",()=>{
  uptPlan();
});

//UPDATE PLAN  


