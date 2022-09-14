module.exports = (app) => {
    const controller = require('../controllers/barang.controller');
    const router = require('express').Router();

    router.get('/', controller.findBarang);

    app.use('/barang', router)
    return router;
}