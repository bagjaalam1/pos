module.exports = (app) => {
    const controller = require('../controllers/penjualan.controller');
    const router = require('express').Router();

    router.get('/', controller.findPenjualan);

    app.use('/penjualan', router)
    return router;
}