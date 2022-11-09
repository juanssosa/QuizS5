const { db } = require('../firebase');
const { validationResult } = require("express-validator");

const getPokemon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const query = db.collection("Pokémon");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
};

const getSinglePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const Pokemon = db.collection("Pokémon").doc(id);
        const data = await Pokemon.get();
        if (!data.exists) {
            res.status(404).send('El pokemon no fue encontrado');
        } else {
            const response = data.data();
            return res.status(200).json(response);
        }
    } catch (error) {
        return res.status(500).json();
    }
};

const addPokemon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const data = req.body;
        await db.collection("Pokémon").doc().set(data);
        res.send("El pokemon ha sido creado");
        return res.status(204);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

const updatePokemon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        const Pokemon = db.collection("Pokémon").doc(id);
        await Pokemon.update(data);
        res.send("El pokemon fue actualizado");
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
};

const deletePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = db.collection("Pokémon").doc(id);
        await doc.delete();
        return res.status(200).send("El pokemon ha sido borrado");
    } catch (error) {
        return res.status(500).json();
    }
};

module.exports = {
    getPokemon,
    getSinglePokemon,
    addPokemon,
    updatePokemon,
    deletePokemon
}
