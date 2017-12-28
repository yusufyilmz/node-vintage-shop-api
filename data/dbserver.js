// import mysql from 'mysql';
const mysql = require('mysql')
// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '532404Yy',
// 	database: 'OrderManagement',
// 		multipleStatements: true
// });

var pool = mysql.createPool({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b50c45ef159dd4',
  password: 'f8bd0547',
  database: 'heroku_6755666cb62c9a1',
  multipleStatements: true
})

const getDbConnection = function (cb) {
  pool.getConnection(function (err, connection) {
    // if(err) throw err;
    // pass the error to the cb instead of throwing it
    if (err) {
      console.log('error' + err)
      return cb(err)
    }


    cb(null, connection)
  });
};



getDbConnection(function (err, connection) {
  if (err) throw err



  var sql = 'CREATE TABLE IF NOT EXISTS sy_cimage( \
		`id` int AUTO_INCREMENT NOT NULL,\
		`date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
		`date_modified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
		`src` nvarchar(200) NULL,\
		`title` nvarchar(50)  NULL ,\
		CONSTRAINT `PK_category_image` PRIMARY KEY (`id` ASC) \
	); '

  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
  })



  sql = 'CREATE TABLE IF NOT EXISTS sy_category( \
		`id` int AUTO_INCREMENT NOT NULL,\
    `imageid` int NULL,\
		`name` nvarchar(100) NULL,\
		`slug` nvarchar(20) NULL,\
    `parent` int NOT NULL DEFAULT 0,\
		`description` nvarchar(200) NULL,\
		`display` nvarchar(20) NOT NULL DEFAULT  "default",\
    CONSTRAINT FK_category_item_imageid FOREIGN KEY (imageid) REFERENCES sy_cimage(`id`),\
		CONSTRAINT `PK_category_item` PRIMARY KEY (`id` ASC) \
	);'

  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
  });




  sql = 'CREATE TABLE IF NOT EXISTS sy_product_category( \
		`id` int AUTO_INCREMENT NOT NULL,\
		`productid` INT DEFAULT 0,\
		`categoryid` INT DEFAULT 0,\
    CONSTRAINT FK_product_category_categoryid FOREIGN KEY (categoryid) REFERENCES sy_category(`id`),\
		CONSTRAINT `PK_product_category` PRIMARY KEY (`id` ASC) \
	);'

  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
  });



  // sql = 'CREATE TABLE IF NOT EXISTS sy_product_image( \
  // 	`id` int AUTO_INCREMENT NOT NULL,\
  // 	`productid` INT DEFAULT 0,\
  // 	`imageid` INT DEFAULT 0,\
  //   CONSTRAINT FK_product_image_imageid FOREIGN KEY (imageid) REFERENCES sy_pimage(`id`),\
  // 	CONSTRAINT `PK_product_image` PRIMARY KEY (`id` ASC) \
  // );'

  // console.log(sql);
  // connection.query(sql, function (err, result) {
  //   if (err) throw err
  //   console.log(result)
  // });


  // category_item

  sql = 'CREATE TABLE IF NOT EXISTS sy_product ( \
		`id` int AUTO_INCREMENT NOT NULL,\
    `name` VARCHAR(50) CHARACTER SET utf8, \
    `slug` VARCHAR(20) CHARACTER SET utf8, \
    `permalink` VARCHAR(100) CHARACTER SET utf8, \
    `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    `date_modified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, \
    `type` VARCHAR(20) CHARACTER SET utf8, \
    `status` VARCHAR(20) CHARACTER SET utf8, \
    `featured` INT DEFAULT 0, \
    `catalog_visibility` VARCHAR(20) CHARACTER SET utf8, \
    `description` VARCHAR(200) CHARACTER SET utf8, \
    `short_description` VARCHAR(20) NULL, \
    `sku` VARCHAR(20) NULL, \
    `price` INT DEFAULT 0, \
    `regular_price` INT DEFAULT 0, \
    `sale_price` INT DEFAULT 0, \
    `price_html` VARCHAR(200) CHARACTER SET utf8 DEFAULT NULL, \
    `on_sale` INT DEFAULT 0, \
    `purchasable` INT DEFAULT 0, \
    `total_sales` INT DEFAULT 0, \
    `stock_quantity` INT, \
    `in_stock` INT DEFAULT 0, \
    `weight` INT, \
    `length` INT, \
    `width` INT, \
    `height` INT, \
    `reviews_allowed` INT DEFAULT 0, \
    `average_rating` VARCHAR(10) NULL,\
    `rating_count` INT, \
    `parent_id` INT DEFAULT 0, \
    `purchase_note` VARCHAR(50) NULL,\
    `better_featured_image` VARCHAR(10) DEFAULT NULL,\
    `tags` VARCHAR(200) DEFAULT NULL,\
		CONSTRAINT `PK_sy_product` PRIMARY KEY (`id` ASC) \ )'


  console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
  });



  sql = 'CREATE TABLE IF NOT EXISTS sy_pimage( \
		`id` int AUTO_INCREMENT NOT NULL,\
    		`productid` int NOT NULL DEFAULT 0,\
		`date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
		`date_modified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
		`src` nvarchar(200) NULL,\
		`name` nvarchar(50)  NULL ,\
		`alt` nvarchar(20)  NULL ,\
    `position` int DEFAULT 0,\
        CONSTRAINT FK_sy_pimage_product FOREIGN KEY (productid) REFERENCES sy_product(`id`),\
    CONSTRAINT `PK_image_item` PRIMARY KEY (`id` ASC) \
	); '

  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
  });


  sql = 'CREATE TABLE IF NOT EXISTS sy_pattribute( \
		    `id` int AUTO_INCREMENT NOT NULL,\
    		`productid` int NOT NULL DEFAULT 0,\
		    `name` nvarchar(50)  NULL ,\
		    `options` nvarchar(100)  NULL ,\
        `position` int DEFAULT 0,\
        `variation` int DEFAULT 0,\
        `visible` int DEFAULT 0,\
        CONSTRAINT FK_sy_pimage_product FOREIGN KEY (productid) REFERENCES sy_product(`id`), \
        CONSTRAINT`PK_image_item` PRIMARY KEY (`id` ASC) \
	); '

  connection.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
  });




  // sql = 'CREATE TABLE IF NOT EXISTS sy_product_review( \
  // 	`id` int AUTO_INCREMENT NOT NULL,\
  //   `productid` int NOT NULL DEFAULT 0,\
  // 	`date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
  // 	`review` nvarchar(200) NULL,\
  // 	`name` nvarchar(50)  NULL ,\
  //   `rating` VARCHAR(10) NULL,\
  //   `brand` INT NOT NULL DEFAULT 0 \
  //    CONSTRAINT FK_sy_review_product FOREIGN KEY (productid) REFERENCES sy_product(`id`),\
  //   CONSTRAINT `PK_sy_product_review` PRIMARY KEY (`id` ASC) \
  // ); '

  // connection.query(sql, function (err, result) {
  //   if (err) throw err
  //   console.log(result)
  // });


});




//varitons
//default attributes
//  attributes: [],     attributes size color



// CREATE TABLE IF NOT EXISTS `productcategories` (
//   `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
//   `CategoryName` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   PRIMARY KEY (`CategoryID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=7 ;




module.exports = getDbConnection



// -- phpMyAdmin SQL Dump
// -- version 3.5.1
// -- http://www.phpmyadmin.net
// --
// -- Host: localhost
// -- Generation Time: Aug 07, 2013 at 09:38 PM
// -- Server version: 5.5.24-log
// -- PHP Version: 5.3.13

// SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
// SET time_zone = "+00:00";


// /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
// /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
// /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
// /*!40101 SET NAMES utf8 */;

// --
// -- Database: `bsm`
// --

// -- --------------------------------------------------------

// --
// -- Table structure for table `optiongroups`
// --

// CREATE TABLE IF NOT EXISTS `optiongroups` (
//   `OptionGroupID` int(11) NOT NULL AUTO_INCREMENT,
//   `OptionGroupName` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
//   PRIMARY KEY (`OptionGroupID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=4 ;

// --
// -- Dumping data for table `optiongroups`
// --

// INSERT INTO `optiongroups` (`OptionGroupID`, `OptionGroupName`) VALUES
// (1, 'color'),
// (2, 'size');

// -- --------------------------------------------------------

// --
// -- Table structure for table `options`
// --

// CREATE TABLE IF NOT EXISTS `options` (
//   `OptionID` int(11) NOT NULL AUTO_INCREMENT,
//   `OptionGroupID` int(11) DEFAULT NULL,
//   `OptionName` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
//   PRIMARY KEY (`OptionID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=9 ;

// --
// -- Dumping data for table `options`
// --

// INSERT INTO `options` (`OptionID`, `OptionGroupID`, `OptionName`) VALUES
// (1, 1, 'red'),
// (2, 1, 'blue'),
// (3, 1, 'green'),
// (4, 2, 'S'),
// (5, 2, 'M'),
// (6, 2, 'L'),
// (7, 2, 'XL'),
// (8, 2, 'XXL');

// -- --------------------------------------------------------

// --
// -- Table structure for table `orderdetails`
// --

// CREATE TABLE IF NOT EXISTS `orderdetails` (
//   `DetailID` int(11) NOT NULL AUTO_INCREMENT,
//   `DetailOrderID` int(11) NOT NULL,
//   `DetailProductID` int(11) NOT NULL,
//   `DetailName` varchar(250) COLLATE latin1_german2_ci NOT NULL,
//   `DetailPrice` float NOT NULL,
//   `DetailSKU` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   `DetailQuantity` int(11) NOT NULL,
//   PRIMARY KEY (`DetailID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=1 ;

// -- --------------------------------------------------------

// --
// -- Table structure for table `orders`
// --

// CREATE TABLE IF NOT EXISTS `orders` (
//   `OrderID` int(11) NOT NULL AUTO_INCREMENT,
//   `OrderUserID` int(11) NOT NULL,
//   `OrderAmount` float NOT NULL,
//   `OrderShipName` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `OrderShipAddress` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `OrderShipAddress2` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `OrderCity` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   `OrderState` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   `OrderZip` varchar(20) COLLATE latin1_german2_ci NOT NULL,
//   `OrderCountry` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   `OrderPhone` varchar(20) COLLATE latin1_german2_ci NOT NULL,
//   `OrderFax` varchar(20) COLLATE latin1_german2_ci NOT NULL,
//   `OrderShipping` float NOT NULL,
//   `OrderTax` float NOT NULL,
//   `OrderEmail` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `OrderDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `OrderShipped` tinyint(1) NOT NULL DEFAULT '0',
//   `OrderTrackingNumber` varchar(80) COLLATE latin1_german2_ci DEFAULT NULL,
//   PRIMARY KEY (`OrderID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=1 ;

// -- --------------------------------------------------------

// --
// -- Table structure for table `productcategories`
// --

// CREATE TABLE IF NOT EXISTS `productcategories` (
//   `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
//   `CategoryName` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   PRIMARY KEY (`CategoryID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=7 ;

// --
// -- Dumping data for table `productcategories`
// --

// INSERT INTO `productcategories` (`CategoryID`, `CategoryName`) VALUES
// (1, 'Running'),
// (2, 'Walking'),
// (3, 'HIking'),
// (4, 'Track and Trail'),
// (5, 'Short Sleave'),
// (6, 'Long Sleave');

// -- --------------------------------------------------------

// --
// -- Table structure for table `productoptions`
// --

// CREATE TABLE IF NOT EXISTS `productoptions` (
//   `ProductOptionID` int(10) unsigned NOT NULL AUTO_INCREMENT,
//   `ProductID` int(10) unsigned NOT NULL,
//   `OptionID` int(10) unsigned NOT NULL,
//   `OptionPriceIncrement` double DEFAULT NULL,
//   `OptionGroupID` int(11) NOT NULL,
//   PRIMARY KEY (`ProductOptionID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=9 ;

// --
// -- Dumping data for table `productoptions`
// --

// INSERT INTO `productoptions` (`ProductOptionID`, `ProductID`, `OptionID`, `OptionPriceIncrement`, `OptionGroupID`) VALUES
// (1, 1, 1, 0, 1),
// (2, 1, 2, 0, 1),
// (3, 1, 3, 0, 1),
// (4, 1, 4, 0, 2),
// (5, 1, 5, 0, 2),
// (6, 1, 6, 0, 2),
// (7, 1, 7, 2, 2),
// (8, 1, 8, 2, 2);

// -- --------------------------------------------------------

// --
// -- Table structure for table `products`
// --

// CREATE TABLE IF NOT EXISTS `products` (
//   `ProductID` int(12) NOT NULL AUTO_INCREMENT,
//   `ProductSKU` varchar(50) COLLATE latin1_german2_ci NOT NULL,
//   `ProductName` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `ProductPrice` float NOT NULL,
//   `ProductWeight` float NOT NULL,
//   `ProductCartDesc` varchar(250) COLLATE latin1_german2_ci NOT NULL,
//   `ProductShortDesc` varchar(1000) COLLATE latin1_german2_ci NOT NULL,
//   `ProductLongDesc` text COLLATE latin1_german2_ci NOT NULL,
//   `ProductThumb` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `ProductImage` varchar(100) COLLATE latin1_german2_ci NOT NULL,
//   `ProductCategoryID` int(11) DEFAULT NULL,
//   `ProductUpdateDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `ProductStock` float DEFAULT NULL,
//   `ProductLive` tinyint(1) DEFAULT '0',
//   `ProductUnlimited` tinyint(1) DEFAULT '1',
//   `ProductLocation` varchar(250) COLLATE latin1_german2_ci DEFAULT NULL,
//   PRIMARY KEY (`ProductID`)
// ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=991 ;

// --
// -- Dumping data for table `products`
// --

// INSERT INTO `products` (`ProductID`, `ProductSKU`, `ProductName`, `ProductPrice`, `ProductWeight`, `ProductCartDesc`, `ProductShortDesc`, `ProductLongDesc`, `ProductThumb`, `ProductImage`, `ProductCategoryID`, `ProductUpdateDate`, `ProductStock`, `ProductLive`, `ProductUnlimited`, `ProductLocation`) VALUES
// (1, '000-0001', 'Cotton T-Shirt', 9.99, 3, 'Light Cotton T-Shirt', 'A light cotton T-Shirt made with 100% real cotton.', 'A light cotton T-Shirt made with 100% real cotton.\r\n\r\nMade right here in the USA for over 15 years, this t-shirt is lightweight and durable.', '', '', 5, '2013-06-13 01:00:50', 100, 1, 0, NULL),
// (2, '000-0004', 'Los Angeles', 179.99, 8, 'Track and Trail', 'A rugged track and trail athletic shoe', 'A rugged track and trail athletic shoe', '', '', 4, '2013-07-25 19:04:36', NULL, 0, 1, NULL);

// -- --------------------------------------------------------

// --
// -- Table structure for table `users`
// --

// CREATE TABLE IF NOT EXISTS `users` (
//   `UserID` int(11) NOT NULL AUTO_INCREMENT,
//   `UserEmail` varchar(500) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserPassword` varchar(500) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserFirstName` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserLastName` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserCity` varchar(90) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserState` varchar(20) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserZip` varchar(12) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserEmailVerified` tinyint(1) DEFAULT '0',
//   `UserRegistrationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//   `UserVerificationCode` varchar(20) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserIP` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserPhone` varchar(20) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserFax` varchar(20) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserCountry` varchar(20) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserAddress` varchar(100) COLLATE latin1_german2_ci DEFAULT NULL,
//   `UserAddress2` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
//   PRIMARY KEY (`UserID`)
// ) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci AUTO_INCREMENT=1 ;

// /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
// /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
// /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
