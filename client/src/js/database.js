import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

//  Export a function we will use to PUT to the database.
export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction("jate", "readwrite");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Pass in content using the .put() method
  const request = store.put({ id: 1, value: content });
  //  Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Export a function we will use to GET to the database.
export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction("jate", "readonly");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data read from database", result);
  // Return the retrieved value
  return result.value;
};

// Start the database.
initdb();
