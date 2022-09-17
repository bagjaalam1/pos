const db = require('../models')

const { currencyFormatter } = require('../../helpers/util')
const moment = require('moment')

exports.findPenjualan = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM penjualan');
        const noInvoice = req.query.noInvoice || rows.length > 0 ? rows[0].no_invoice : ''
        const details = await db.query('SELECT dp.*, b.nama_barang FROM detail_penjualan as dp LEFT JOIN barang as b on dp.kode_barang = b.kode_barang WHERE dp.no_invoice = $1 ORDER BY dp.id_detail', [noInvoice]);
        res.render('penjualan/list', {
            rows,
            details: details.rows,
            currentPage: 'penjualan',
            currencyFormatter,
            moment
        })
    } catch (e) {
        res.send(e)
    }
}

exports.getAdd = async (req, res, next) => {
    try {
        const {rows} = await db.query('SELECT kode_barang, nama_barang FROM barang')
        res.render('penjualan/add', {
            currentPage: 'Add Transaction',
            barang: rows
        })
    } catch (e) {
        res.send(e)
    }
}