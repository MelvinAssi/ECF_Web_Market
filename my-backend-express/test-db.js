
const sequelize = require('./config/db');


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
};


const listTables = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE' 
      ORDER BY table_name;
    `);
    if (results.length === 0) {
      console.log('Aucune table trouvée dans le schéma public.');
    } else {
      console.log('Connexion réussie, liste des tables :');
      results.forEach((row, index) => {
        console.log(`${index + 1}. ${row.table_name}`);
      });
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des tables :', err);
  } finally {
    await sequelize.close();
  }
};

testConnection();
listTables();