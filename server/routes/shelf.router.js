const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user);
    pool.query('SELECT * FROM "item"')
    .then(result => {
        res.send(result.rows)
    })
    .catch(error => {
        console.log('error making SELECT for shelf:', error);
        res.sendStatus(500); 
    })
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
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "item" WHERE "id"=$1 AND "user_id"=$2`, [req.params.id, req.user.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
        console.log('error with DELETE', error);
        res.sendStatus(500);
    })
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