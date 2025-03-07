
import api from "./crudApiAdmin.js";


const tbody = document.getElementById("tbody");
let usersTable = document.querySelector(".users-table");
let modalDelete = document.getElementById("modalDelete");
let modalProgress = document.getElementById("modalProgress");
let modalDelText = document.getElementById("deletedUser");
let modalDelBtn = document.getElementById("modalDelBtn");

let modalUpdate = document.getElementById("modalUpdate");
let modalUptBtn = document.getElementById("modalUptBtn");
let edittexxt1 = document.getElementById("uedittext1");
let edittexxt2 = document.getElementById("uedittext2");
let edittexxt3 = document.getElementById("uedittext3");
let edittexxt4 = document.getElementById("uedittext4");
let edittexxt5 = document.getElementById("uedittext5");



const url = "http://localhost:3000/auth/users";
const urldelete = "http://localhost:3000/auth/delete";
const urlupdate = "http://localhost:3000/auth/update";

let userlist = [];
let userIndex = -1;

readAllUser();




// READUSR
async function readAllUser() {
  let userList=await api.getAll(url);
  userlist=userList;
  tbody.innerHTML = ""; // Eski ma'lumotlarni tozalash
  userList.forEach((item) => {
    let trow = tableRow(item);
    tbody.insertAdjacentHTML("beforeend", trow);
  });
}


function tableRow(item) {
  return `<tr>
                <th scope="row">${item.id}</th>
                <td>${item.username} ${item.lastname}</td>
                <td>${item.phone}</td>
                <td>
                  <a href="#" class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">O'zgartirish</a>
                  <a href="#" class="link-danger  btn-outline-danger ms-3 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">O'chirish</a>
                </td>
              </tr>    
        `;
}
// READUSR




// DELUSER
async function delUser() {  
  let delUser = await api.deletee(urldelete, userIndex);
  console.log(delUser.message);
  readAllUser();
  userIndex = -1;
}

usersTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-danger")) {
    let listGroupItems = document.querySelectorAll(".users-table .link-danger");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", userlist[index].id);
    userIndex = userlist[index].id;
    let modalDel = new bootstrap.Modal(modalDelete, {
      keyboard: false,
    });
    modalDel.show();
    modalDelText.textContent = `${userlist[index].username} ${userlist[index].lastname}`;
  }
});
modalDelBtn.addEventListener("click", (event) => {
   delUser();
});
// DELUSER


// UPTUSER
async function updateUser(data) {  

  console.log(userIndex);
  await api.update(urlupdate,userIndex,data);
  await readAllUser();
  userIndex = -1;

}
usersTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("link-warning")) {
    let listGroupItems = document.querySelectorAll(".users-table .link-warning");
    let index = Array.from(listGroupItems).indexOf(event.target);
    console.log("clicked, Index:", index);
    console.log("clicked, Index:", userlist[index].id);
    userIndex = userlist[index].id;
    let modalUpt = new bootstrap.Modal(modalUpdate, {
      keyboard: false,
    });
    modalUpt.show();
    //modalDelText.textContent = `${userlist[index].username} ${userlist[index].lastname}`;
    edittexxt1.value=userlist[index].username;
    edittexxt2.value=userlist[index].lastname;
    edittexxt3.value=userlist[index].phone;
    // edittexxt4.value=userlist[index].password;
    // edittexxt5.value=userlist[index].password;
    
    
    console.log(userlist);
  }
});

modalUptBtn.addEventListener("click", ()=>{
  let data = {
    username: `${edittexxt1.value}`,
    lastname: `${edittexxt2.value}`,
    phone: `${edittexxt3.value}`,
    password: `${edittexxt4.value}`,
  };
  
  updateUser(data);

});
// UPTUSER


