module.exports = (app) => {
    const controller = require('../controllers/penjualan.controller');
    const router = require('express').Router();

    router.get('/', controller.findPenjualan);
    router.get('/add', controller.getAdd);

    app.use('/penjualan', router);
    return router;
}