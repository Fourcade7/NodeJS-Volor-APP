import api from "./admin/crudApiAdmin.js";


let planRow = document.querySelector(".plan-row");


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
                  <a href="#" class="card-link btn btn-outline-primary">Ulanish</a>
                </div>
              </div>
    </div> `;
}

  // READPLAN