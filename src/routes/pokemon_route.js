const express = require('express');
const { getPokemon, getSinglePokemon, addPokemon, updatePokemon, deletePokemon } = require('../controllers/pokemon_controller');
const { body } = require("express-validator");

const router = express.Router({ mergeParams: true });

const pokemonAddValidator = [
    body('name').notEmpty().isString(),
    body('region').notEmpty().isString(),
    body('type').notEmpty().isString(),
    body().custom(body => {
        const keys = ['name', 'region', 'type'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Se agregaron parametros extra')
]

const pokemonUpdateValidator = [
    body('name').notEmpty().isString(),
    body('region').notEmpty().isString(),
    body('type').notEmpty().isString(),
    body().custom(body => {
        const keys = ['name', 'region', 'type'];
        return Object.keys(body).every(key => keys.includes(key));
    }).withMessage('Se agregaron parametros extra')
]

router.get('/pokemon', getPokemon);
router.get('/pokemon/:id', getSinglePokemon);
router.post('/pokemon', pokemonAddValidator, addPokemon);
router.put('/pokemon/:id', pokemonUpdateValidator, updatePokemon);
router.delete('/pokemon/:id', deletePokemon);

module.exports = router;
