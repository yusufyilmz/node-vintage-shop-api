var express = require('express');
var _ = require('lodash');

var router = express.Router();
const getDbConnection = require('../data/dbserver');

router.get('/get', function (req, res, next) {

    getDbConnection((err, con) => {
        let query = 'SELECT *, c.id as id FROM sy_category c left join sy_cimage ci on (ci.id = c.imageid);';
        con.query(query, (err, result, field) => {

            var categoryResult = _.map(result, (category) => {
                return {
                    "id": category.id,
                    "name": category.name,
                    "slug": category.slug,
                    "parent":category.parent,
                    "description": category.description,
                    "display": category.display,
                    "count": 5,
                    "brand" : category.brand == 0 ? false : true,
                    "image": {
                        "id": category.imageid,
                        "date_created": category.date_created,
                        "date_modified": category.date_modified,
                        "src": category.src,
                        "title": category.title,
                        "alt": category.alt,
                    }
                }

            });


            con.release()
            res.send(categoryResult);
        })

    });

});

// router.get('/getwith', function (req, res, next) {

// console.log(req.query);
//     getDbConnection((err, con) => {
//         let query = `SELECT * FROM products where ProductID = ${req.query.id}`;
//         con.query(query, (err, result, field) => {
//             con.release()
//             res.send(result);
//         })

//     });

// });





module.exports = router;
