var express = require('express');
var router = express.Router();
const getDbConnection = require('../data/dbserver');
var _ = require('lodash');

var multer = require('multer');
var _ = require('lodash');
// var levenshtein = require('fast-levenshtein');
var fs = require('fs');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ //multer settings
    storage: storage

}).single('file');





router.post('/upload', function (req, res) {
    uploadItem(req, res, (result) => {

        if (result.error_code = 0) {
            res.send(result.error_desc);
        }
        else {
            res.send(result.data);
        }

    });
});



const uploadItem = (req, res, callback) => {
    var exceltojson;
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            callback({ error_code: 1, err_desc: err, data: null });
            return;
        }
        // console.log(req.file);

        /** Multer gives us file info in req.file object */
        if (!req.file) {
            callback({ error_code: 1, err_desc: "No file passed", data: null });
            return;
        }

        callback({ error_code: 0, err_desc: null, data: "ok" });

        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */

        // console.log(req.file.path);

    })
}



router.get('/add', function (req, res, next) {

    let productInfo = req.body.info;
    let query = `INSERT INTO sy_product
(
name,
slug,
type,
status,
catalog_visibility,
description,
short_description,
sku,
price,
regular_price,
sale_price,
on_sale,
purchasable,
total_sales,
stock_quantity,
in_stock,
reviews_allowed,
average_rating,
rating_count,
purchase_note,
tags
)
VALUES
(
'${product.info.name}',
'${product.info.name}XX',
'${product.info.type}',
'${product.info.status}',
'visible',
'${product.info.description}',
'${product.info.short_description}',
'sku',
${product.price.price},
${product.price.regular_price},
${product.price.sale_price},
${product.price.on_sale},
1,
0,
${product.info.stock_quantity},
1,
1,
0,
0,
'${product.info.purchase_note}',
'${product.info.tags}');`

});


router.get('/get', function (req, res, next) {

    var whereQuery = '';
    if (req.query.categoryid) {
        whereQuery = ` WHERE c.id = ${req.query.categoryid};`;
    }
    else {

    }
    console.log(req.query.categoryid);
    getDbConnection((err, con) => {
        let query = `SELECT *,
         p.id as id, 
         pi.id as image_id, 
         c.id as category_id, 
		 pa.id as attribute_id, 
         p.name as name, 
         pi.name as image_name  ,
         c.name as category_name  ,
		 pa.name as attribute_name,
		 pa.position as attribute_position,
		 pa.visible as attribute_visible,
		 pa.options as attribute_options,
         p.slug as slug,
        c.slug as category_slug,
         p.description as description,
         c.description as category_description,
         p.date_created  as date_created ,
         pi.date_created as image_date_created  ,
         p.date_modified as date_modified  ,
         pi.date_modified as  date_modified  
         FROM sy_product p 
         left join sy_pimage pi on (pi.productid = p.id)
		 left join sy_pattribute pa on (pa.productid = p.id)
         left join sy_product_category pc on (pc.productid = p.id)
         left join sy_category c on (c.id = pc.categoryid)`;

        if (whereQuery != '') {
            query += whereQuery;
        }
        else {
            query += ';'
        }

        console.log(query);


        con.query(query, (err, result, field) => {

            console.log(result);

            var productList = [];
            var categoryResult = _.forEach(result, (product) => {

                let thisProduct = productList.find((e) => e.id == product.id);

                if (thisProduct) {

                    let productImage = thisProduct.images.find((b) => b.id == product.image_id);

                    console.log("productImage");

                    console.log(productImage);
                    if (!productImage) {
                        thisProduct.images.push(
                            {
                                "id": product.image_id,
                                "date_created": product.image_date_created,
                                "date_modified": product.image_date_modified,
                                "name": product.image_name,
                                "position": product.position,
                                "src": product.src,
                                "alt": product.alt,
                            }
                        )
                    }

                    let productAttribute = thisProduct.attributes.find((b) => b.id == product.attribute_id);

                    if (!productAttribute) {
                        thisProduct.attributes.push(
                            {
                                "id": product.attribute_id,
                                "name": product.attribute_name,
                                "position": product.attribute_position,
                                "variation": false,
                                "visible": product.attribute_visible,
                                "options": product.attribute_options.split(",")
                            }
                        )
                    }

                    else {
                        let productCategory = thisProduct.categories.find((e) => e.id == product.category_id);
                        if (!productCategory) {
                            thisProduct.categories.push(
                                {
                                    "id": product.category_id,
                                    "name": product.category_name,
                                    "slug": product.category_slug
                                }
                            )

                        }
                    }
                }
                else {
                    console.log("product.description");

                    console.log(product.description);
                    productList.push({
                        "id": product.id,
                        "name": product.name,
                        "slug": product.slug,
                        "permalink": product.permalink,
                        "date_created": product.date_created,
                        "date_modified": product.date_modified,
                        "type": product.type,
                        "status": product.status,
                        "featured": product.featured = 0 ? false : true,
                        "catalog_visibility": product.catalog_visibility,
                        "description": product.description,
                        "short_description": product.short_description,
                        "sku": product.sku,
                        "price": product.price,
                        "regular_price": product.regular_price,
                        "sale_price": product.sale_price,
                        "price_html": product.price_html,
                        "on_sale": product.on_sale = 0 ? false : true,
                        "purchasable": product.purchasable = 0 ? false : true,
                        "total_sales": product.total_sales,
                        "stock_quantity": product.stock_quantity,
                        "in_stock": product.in_stock = 0 ? false : true,

                        "reviews_allowed": product.reviews_allowed = 0 ? false : true,
                        "average_rating": product.average_rating,
                        "rating_count": product.rating_count,
                        "parent_id": product.parent_id,
                        "purchase_note": product.purchase_note,
                        "better_featured_image": product.better_featured_image,
                        "tags": product.tags,
                        "default_attributes": {},
                        // "dimensions": {
                        //     "height": "",
                        //     "length": "",
                        //     "width": ""
                        // },
                        "related_ids": [12, 23],
                        "images": [
                            {
                                "id": product.image_id,
                                "date_created": product.date_created,
                                "date_modified": product.date_modified,
                                "name": product.name,
                                "position": product.position,
                                "src": product.src,
                                "alt": product.alt,

                            }
                        ],
                        "categories": [
                            {
                                "id": product.category_id,
                                "name": product.category_name,
                                "slug": product.category_slug
                            }
                        ],
                        "attributes": [
                            {
                                "id": product.attribute_id,
                                "name": product.attribute_name,
                                "position": product.attribute_position,
                                "variation": false,
                                "visible": product.attribute_visible,
                                "options": product.attribute_options.split(",")
                            }
                        ]
                    });
                }


                // related_ids
                // :
                // Array(5)
                // 0
                // :
                // 320
                // 1
                // :
                // 308
                // 2
                // :
                // 279
                // 3
                // :
                // 312
                // 4
                // :
                // 275


                // attributes
                // :
                // Array(3)
                // 0
                // :
                // id
                // :
                // 2
                // name
                // :
                // "color"
                // options
                // :
                // (4) ["Black", "blue", "Green", "Red"]
                // position
                // :
                // 0
                // variation
                // :
                // false
                // visible
                // :
                // true
                // __proto__
                // :
                // Object
                // 1
                // :
                // id
                // :
                // 1
                // name
                // :
                // "size"
                // options
                // :
                // (3) ["L", "M", "S"]
                // position
                // :
                // 1
                // variation
                // :
                // false
                // visible
                // :
                // true
                // __proto__
                // :
                // Object
                // 2
                // :
                // id
                // :
                // 3
                // name
                // :
                // "Width"
                // options
                // :
                // (3) ["large", "medium", "small"]
                // position
                // :
                // 2
                // variation
                // :
                // false
                // visible
                // :
                // true


            });

            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));
            // productList.push(Object.assign({}, productList[0]));

            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);
            // productList.push(productList[0]);

            // _.forEach(productList, (product) => {
            //     product.id = guid();
            // })

            con.release();
            res.send(productList);
        })

    });

});


const guid = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

router.get('/getwith', function (req, res, next) {

    console.log(req.query);
    getDbConnection((err, con) => {
        let query = `SELECT * FROM products where ProductID = ${req.query.id}`;
        con.query(query, (err, result, field) => {
            con.release()
            res.send(result);
        })

    });

});





module.exports = router;
