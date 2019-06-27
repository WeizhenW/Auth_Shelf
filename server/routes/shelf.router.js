const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {

});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    // console.log('req.user:', req.user.id);
    // console.log('req.body:', req.body.description, req.body.image_url)
    // res.sendStatus(200)
    pool.query(`INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);`, [req.body.description, req.body.image_url, req.user.id]).then(response => {
        res.sendStatus(201)
    }).catch (error => {
        console.log('error posting images:', error)
    })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {

});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;