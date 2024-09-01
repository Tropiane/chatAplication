import express from 'express';
import handlebars from 'express-handlebars';

import __dirname from './utils.js';

const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/chat', (req, res) => {
    res.render('home'); // Renderiza el archivo "home.hbs"
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
