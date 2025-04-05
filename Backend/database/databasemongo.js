const mongoose = require('mongoose');

const db = async () => {

    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.mongo_url)
        console.log('Połączono z bazą danych')
    } catch(error) {
        console.log('Błąd połaczenia z bazą danych');
    }

}

module.exports={db}