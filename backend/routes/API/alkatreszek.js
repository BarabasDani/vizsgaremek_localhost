const express = require('express');
const connection = require('../../middleware/database.js');
const upload = require('../../middleware/upload.js');
const router = express.Router();

// alkatreszok lekérdezése route
router.get('/alkatresz', function (req, res) {
    connection.query('SELECT * FROM alkatresz', (err, results) => {
        res.json(results);
    });
});

// egy konkrét alkatresz lekérdezése id alapján route
router.get('/alkatresz/:id', function (req, res) {
    const id = req.params.id;

    connection.query('SELECT * FROM alkatresz WHERE productid=?', [id], (err, results) => {
        res.json(results);
    });
});

// alkatresz létrehozása route
router.post('/alkatresz', upload.single('image'), function (req, res) {
    const { name, price, stock } = req.body; // destruktálás = szétbontás
    const imageName = req.file ? req.file.filename : 'no_image.png';

    connection.query('INSERT INTO alkatresz(productid, name, price, stock, image) VALUES (NULL, ?, ?, ?, ?)', [name, price, stock, imageName], (err, result) => {
        res.json("Sikeres felvétel!");
    });
});

// alkatresz törlése route
router.delete('/alkatresz/:id', function (req, res) {
    const id = req.params.id;

    connection.query('DELETE FROM alkatresz WHERE productid=?', [id], (err, result) => {
        res.json("Sikeres törlés!");
    });
});

// alkatresz szerkesztése route
router.put('/alkatresz/:id', upload.single('image'), function (req, res) {
    const id = req.params.id;
    const { name, price, stock } = req.body;
    const imageName = req.file ? req.file.filename : null;
    console.log(id, name, price, imageName);

    connection.query('UPDATE alkatresz SET name = ?, price = ?, stock = ?, image = COALESCE(?, image) WHERE alkatresz.productid = ?;', [name, price, stock, imageName, id], (err, result) => {
        res.json("Sikeres módosítás!");
    });
});

// alkatreszok közti keresés
router.post('/searching', function (req, res) {
    const searching = req.body.searching;

    connection.query('SELECT * FROM alkatresz WHERE name LIKE CONCAT("%", ?, "%") OR price LIKE CONCAT("%", ?, "%")', [searching, searching], (err, result) => {
        res.json(result);
    });
});

// az ár kiszámítása és az elérhető darabszám csökkentése
router.post('/ordering/:id', function (req, res) {
    const id = req.params.id;
    const stock = req.body.stock;

    connection.query('SELECT stock, price FROM alkatresz WHERE productid = ?', [id], (err, result) => {
        if (result[0].stock >= stock) {
            const buy = result[0].stock - stock;
            const price = result[0].price * stock;

            connection.query('UPDATE alkatresz SET stock = ? WHERE productid = ?', [buy, id], (err, result2) => {
                res.send({ success: true, price: price });
            })
        } else {
            res.send({ success: false, available: result[0].stock });
        }
    });
});

// a rendelés leadása
router.post('/payment', function (req, res) {
    const { price, productID, userID } = req.body;

    const date = new Date();
    const orderDate = date.toISOString().slice(0, 19).replace('T', ' ');

    connection.query('INSERT INTO ordering(orderID, userID, productID, orderdate, price) VALUES (NULL, ?, ?, ?, ?)', [userID, productID, orderDate, price], (err, result) => {
        res.json({ success: true })
    })
});

module.exports = router;