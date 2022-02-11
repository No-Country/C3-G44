import mongoose from 'mongoose';

const uri =
    'mongodb+srv://C3-G44:c3g44atlas@c3-g44server.ks63w.mongodb.net/portafolio?retryWrites=true&w=majority';

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// Conectar DB gestiondinero
(async () => {
    const db = await mongoose.connect(uri, options);
    console.log('Conectado a DB', db.connection.name);
})();
