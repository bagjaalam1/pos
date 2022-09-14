const db = require('../models')

const { currencyFormatter } = require('../../helpers/util')

exports.findBarang = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM barang');
        res.render('barang/list', {
            rows,
            currentPage: 'barang',
            currencyFormatter
        })
    } catch (e) {
        res.send(e)
    }

}