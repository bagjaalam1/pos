const db = require('../models')

const { currencyFormatter } = require('../../helpers/util')
const moment = require('moment')

exports.findPenjualan = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM penjualan');
        res.render('penjualan/list', {
            rows,
            currentPage: 'penjualan',
            currencyFormatter,
            moment
        })
    } catch (e) {
        res.send(e)
    }

}