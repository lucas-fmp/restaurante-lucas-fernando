const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const { connectWithRetry } = require('./config/db');
const viewRoutes = require('./routes/views');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: 'marmitatech-secret-key-1234', // In a real app, this should be in an env var
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Add session data to locals for EJS templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.path = req.path;
    next();
});

// Setup static files and EJS
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Mount routes
app.use('/', viewRoutes);
app.use('/api', apiRoutes);

if (require.main === module) {
    connectWithRetry().then(() => {
        app.listen(3000, () => console.log('🚀 MARMITATECH PRO ONLINE NA PORTA 3000'));
    });
}

// Export app for testing
module.exports = { app };
