import {  initDB } from "./index.js";


// Load function

export function load(id) {
  return new Promise((resolve, reject) => {
    initDB((db)=>{
      if (!db) {
        reject("Database not initialized");
        return;
      }
  
      const transaction = db.transaction(["candyDocDB"], "readonly");
      const objectStore = transaction.objectStore("candyDocDB");
      const request = objectStore.get(id);
  
      request.onsuccess = (e) => {
        if (e.target.result) {
          resolve(e.target.result);
        } else {
          reject("No data found for ID: " + id);
        }
      };
  
      request.onerror = (e) => {
        reject("Error loading data: " + e.target.error);
      };
    })
   
  });
}
