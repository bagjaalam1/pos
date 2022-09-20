module.exports = (app) => {
    const controller = require('../controllers/penjualan.controller');
    const router = require('express').Router();

    router.get('/', controller.findPenjualan);
    router.get('/add', controller.create);
    router.get('/show/:no_invoice', controller.show);
    router.get('/barang/:kode_barang', controller.barang);
    router.post('/additem', controller.addItem);

    app.use('/penjualan', router);
    return router;
}