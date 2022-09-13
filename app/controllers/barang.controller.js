const db = require('../models')

exports.find = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM barang');
        res.render('barang/list', { 
            rows,
            currentPage: 'barang'
         })
    } catch (e) {
        res.send(e)
    }

}