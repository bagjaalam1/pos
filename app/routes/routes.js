module.exports = (app) => {
    const controller = require('../controllers/barang.controller');
    const router = require('express').Router();

    router.get('/', controller.find);

    app.use('/', router)
    return router;
}