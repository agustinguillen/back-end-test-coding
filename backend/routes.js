const express = require("express");
const api = express.Router();
const mysql = require("mysql");
require('dotenv').config()

//db config
const pool = mysql.createPool(
  process.env.CLEARDB_DATABASE_URL
);

pool.getConnection((err, conn) => {
  if (err) throw err;
  else {
    console.log("Connected!");
  }
});

api.get("/products", (req, res) => {
  const sqlQuery = "SELECT * FROM products";
  pool.query(sqlQuery, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

api.get("/categories-stock", (req, res) => {
  const sqlQuery = `SELECT product_category, SUM(product_stock) AS Total
                    FROM products
                    GROUP BY product_category
                    ORDER BY Total desc`;
  pool.query(sqlQuery, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

api.get("/products-by-discount", (req, res) => {
  const sqlQuery = `SELECT product_discount, SUM(product_stock) AS Total
                    FROM products
                    GROUP BY product_discount
                    ORDER BY Total desc`;
  pool.query(sqlQuery, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

api.get("/categories-max-discount", (req, res) => {
  const sqlQuery = `SELECT products.product_category, MAX(discount_percent) as 'percent' 
                    FROM discounts as d
                    LEFT JOIN products 
                    ON products.product_discount = d.discount_name
                    GROUP BY products.product_category
                    ORDER BY d.discount_percent DESC;`;
  pool.query(sqlQuery, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

api.get("/categories-min-discount", (req, res) => {
  const sqlQuery = `SELECT products.product_category, MIN(discount_percent) as 'percent'
                    FROM discounts as d
                    LEFT JOIN products 
                    ON products.product_discount = d.discount_name
                    GROUP BY products.product_category
                    ORDER BY d.discount_percent DESC;
                    `;
  pool.query(sqlQuery, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = api;
