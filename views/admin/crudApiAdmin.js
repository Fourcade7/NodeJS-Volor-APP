

async function getAll(url) {
    try {
      let response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
  
      let result = await response.json();
      console.log(result);
      if (response.ok) {
        return result;
      } else {
      }
    } catch (error) {}
  }
  async function add(url,data) {
   
      try {
        let response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    
        let result = await response.json();
        console.log(result);
    
        if (response.ok) {
          return result;
          console.log("Added");
        } else {
          console.log("ERROR");
        }
       
      } catch (error) {
        console.log(error.message);
      }
    }
  
  
  //DELETE
  async function deletee(url, id) {
    try {
      let response = await fetch(`${url}/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
  
      let result = await response.json();
      console.log(result);
      if (response.ok) {
        return result;
      } else {
      }
    } catch (error) {}
  }
  
  
  //UPDATE
  async function update(url,id,data) {
   
    try {
      let response = await fetch(`${url}/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
  
      let result = await response.json();
      console.log(result);
  
      if (response.ok) {
        return result;
        console.log(" UPDATED");
      } else {
        console.log(" ERROR");
      }
     
    } catch (error) {
      console.log(error.message);
    }
  }
  
  export default {add,getAll,deletee,update};
    
  