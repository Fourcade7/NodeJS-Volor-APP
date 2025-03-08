let textview1 = document.getElementById("textview1");
let textview2 = document.getElementById("textview2");
let textview3 = document.getElementById("textview3");
let textview4 = document.getElementById("textview4");
let textview5 = document.getElementById("textview5");
let textview6 = document.getElementById("textview6");
let textview7 = document.getElementById("textview7");
let textview8 = document.getElementById("textview8");
let textview9 = document.getElementById("textview9");
let textview10 = document.getElementById("textview10");
let textview11 = document.getElementById("textview11");
let headerText = document.getElementById("headerText");


const url = "http://localhost:3000/auth/getby";
const id=getCookie("id");
textview1.textContent=id;

console.log(id);

getUserById(url, id);

async function getUserById(url,id){

    try{
        let response = await fetch(`${url}/${id}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
      
          let result = await response.json();
          console.log(result);
          if(response.ok){
            headerText.textContent=`${result.username} ${result.lastname}`;
            textview1.textContent=`Ism: ${result.username}`;
            textview2.textContent=`Familiya: ${result.lastname}`;
            textview3.textContent=`Telefon: ${result.phone}`;
            textview4.textContent=`Tarif: ${result.planName}`;
            textview5.textContent=`${result.gb} GB`;
            textview6.textContent=`${result.sms} SMS`;
            textview7.textContent=`Minut: ${result.minute} Min`;
            textview8.textContent=`Internet Paket : ${result.pgb} GB`;
            textview9.textContent=`Sms Paket : ${result.psms} SMS`;
            const formattedDate = formatDate(result.createdAt);
            textview11.textContent=`${formattedDate.hours}:${formattedDate.minutes} ${formattedDate.day}/${formattedDate.month}/${formattedDate.year} `;
          }
    }catch(error){

    }


}



function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  //setCookie("username", "Fourcade", 7); // 7 kun saqlanadi.
  
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

// 🕒 Funksiyani chaqirish



