const fs = require('fs');
const { Pool } = require('pg');

// Utiliser des variables d'environnement pour définir la chaîne de connexion
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://user:password@localhost:5432/dbname',
});

// Fonction pour créer la table
async function createTable() {
  const dropQuery = 'DROP TABLE IF EXISTS city';
  const createQuery = `
    CREATE TABLE city (
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
    await pool.query(dropQuery);
    await pool.query(createQuery);
    console.log('Table recreated successfully.');
  } catch (err) {
    console.error('Error recreating table:', err.stack);
  }
}

// Fonction pour charger les données JSON
async function loadJsonData(filePath) {
  await createTable();

  const fileData = fs.readFileSync(filePath);
  const records = JSON.parse(fileData);

  let promises = records.map(async (record, index) => {
    if (index % 1000 === 0) {
      console.log(`Inserting record ${index}...`);
    }
    await insertRecord(record); 
  });

  await Promise.all(promises);

  console.log('All records have been inserted.');
}

// Fonction pour insérer un enregistrement dans la base de données
async function insertRecord(data) {
  const query =
    'INSERT INTO city (id, department_code, insee_code, zip_code, name, lat, lon) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [
    data.id,
    data.department_code,
    data.insee_code,
    data.zip_code,
    data.name,
    data.lat,
    data.lon,
  ];
  try {
    await pool.query(query, values);
  } catch (err) {
    console.error(`Error inserting record ${data.id}:`, err.stack);
  }
}

// Charger les données JSON après la création de la table
loadJsonData('../cities.json');
