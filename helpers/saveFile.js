// Import file system
const fs = require('fs');

// Path and file for save in db
const file = './db/data.json';

// Function for save data in DB
const saveDB = ( data ) => {
    
    // Write File with the path (file) and data
    fs.writeFileSync( file, JSON.stringify( data ) );
};

// Function for read DB
const readDB = () => {
    // Verify if file exist, if not return null
    if( !fs.existsSync( file ) ) return null;

    // Get information from db file
    const info = fs.readFileSync( file, { encoding : 'utf-8' } );
    
    // Parse info for get object-array
    const data = JSON.parse( info );

    return data;
};

// Module exports
module.exports = {
    saveDB,
    readDB,
}