import {  initDB } from "./index.js";


// Save function

export  function  save(data) {
  initDB((db)=>{
    if (!db) {
      console.error("Database not initialized");
      return;
    }
  
    const transaction = db.transaction(["candyDocDB"], "readwrite");
    const objectStore = transaction.objectStore("candyDocDB");
    const request = objectStore.put(data);
  
    request.onsuccess = () => {
    };
  
    request.onerror = (e) => {
      console.error("Error saving data:", e.target.error);
    };
  })

}
