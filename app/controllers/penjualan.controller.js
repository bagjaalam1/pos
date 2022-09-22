const db = require('../models')

const { currencyFormatter } = require('../../helpers/util')
const moment = require('moment')

exports.findPenjualan = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM penjualan');
        const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : ''
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

exports.create = async (req, res, next) => {
    try {
        const {rows} = await db.query('INSERT INTO penjualan(total_harga) VALUES (0) RETURNING *')
        res.redirect(`/penjualan/show/${rows[0].no_invoice}`)
    } catch (e) {
        res.send(e)
    }
}

exports.show = async (req, res, next) => {
    try {
        const penjualan = await db.query('SELECT * FROM penjualan WHERE no_invoice = $1', [req.params.no_invoice])
        const {rows} = await db.query('SELECT kode_barang, nama_barang FROM barang ORDER BY kode_barang')
        res.render('penjualan/form', {
            currentPage: 'penjualan',
            barang: rows,
            penjualan:  penjualan.rows[0],
            moment
        })
    } catch (e) {
        res.send(e)
    }
}

exports.barang = async (req, res, next) => {
    try {
        const {rows} = await db.query('SELECT * FROM barang WHERE kode_barang = $1', [req.params.kode_barang]) 
        res.json(rows[0])
    } catch (e) {
        res.send(e)
    }
}

exports.addItem = async (req, res, next) => {
    try {
        const detail = await db.query('INSERT INTO detail_penjualan(no_invoice, kode_barang, qty) VALUES ($1, $2, $3) RETURNING *', [req.body.no_invoice, req.body.kode_barang, req.body.qty])
        const { rows } = await db.query('SELECT * FROM penjualan WHERE no_invoice = $1', [req.body.no_invoice])
        res.json(rows[0])
    } catch (e) {
        res.send(e)
    }
}

exports.detailPenjualan = async (req, res, next) => {
    try {
        const {rows} = await db.query('SELECT dp.*, b.nama_barang FROM detail_penjualan as dp LEFT JOIN barang as b on dp.kode_barang = b.kode_barang WHERE dp.no_invoice = $1 ORDER BY dp.id_detail', [req.params.no_invoice]); 
        res.json(rows)
    } catch (e) {
        res.send(e)
    }
}