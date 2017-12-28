var express = require('express');
var _ = require('lodash');
var router = express.Router();
const getDbConnection = require('../data/dbserver');

router.get('/get', function (req, res, next) {

    getDbConnection((err, con) => {
        let query = `SELECT * FROM sy_product_review where productid = ${req.query.productid}`;
        con.query(query, (err, result, field) => {
            con.release()
            res.send(result);
        })

    });

});

module.exports = router;
