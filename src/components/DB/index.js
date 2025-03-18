
let db;


export function initDB(onsuccess)
{
  
  const request = window.indexedDB.open("candyDocDB", 10);

  request.onerror = (e) => {
    console.error("Database error:", e.target.error);
  };
  
  request.onsuccess = (e) => {
    db = e.target.result;
    onsuccess(db)
  };
  
  request.onupgradeneeded = (e) => {
    db = e.target.result;
  
    // Check if the object store already exists
    if (!db.objectStoreNames.contains("candyDocDB")) {
      db.createObjectStore("candyDocDB", { keyPath: "id" });
    }
  };
  
}