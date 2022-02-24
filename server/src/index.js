import app from './app.js';
import './database/database';

app.listen(app.get('port'), () => {
    console.log('Servidor Portafolio C3-G44 En Puerto: ' + app.get('port'));
});
