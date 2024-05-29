const fs = require('fs');
const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const pool = new Pool({
    connectionString: 'postgresql://thomas:password@172.20.0.2:5432/cicd_db'
});

// Fonction pour créer la table
async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS city (
      id INT PRIMARY KEY,
      department_code VARCHAR(255),
      insee_code VARCHAR(255),
      zip_code VARCHAR(255),
      name VARCHAR(255),
      lat DECIMAL(9,6),
      lon DECIMAL(9,6)
    )
  `;

  try {
    await pool.query(query);
    console.log("Table created successfully.");
  } catch (err) {
    console.error("Error creating table:", err.stack);
  }
}

// Fonction pour charger les données JSON
async function loadJsonData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const records = JSON.parse(fileData);

  for (let record of records) {
    await insertRecord(record);
  }

  console.log('All records have been inserted.');
}

// Fonction pour insérer un enregistrement dans la base de données
async function insertRecord(data) {
  const query = 'INSERT INTO city (id, department_code, insee_code, zip_code, name, lat, lon) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [data.id, data.department_code, data.insee_code, data.zip_code, data.name, data.lat, data.lon];
  try {
    await pool.query(query, values);
    console.log(`Record inserted: ${data.id}`);
  } catch (err) {
    console.error(`Error inserting record ${data.id}:`, err.stack);
  }
}

// Créer la table
createTable().then(() => {
  // Charger les données JSON après la création de la table
  loadJsonData('cities.json');
});