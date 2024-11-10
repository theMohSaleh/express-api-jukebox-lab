const Track = require('../models/track.js');
const express = require('express');
router = express.Router();

// POST - create a track
router.post('/', async (req, res) => {
    try {
        const newTrack = await Track.create(req.body);
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

// GET - get all tracks
router.get('/', async (req, res) => {
    try {
        const tracksFound = await Track.find();
        res.status(200).json(tracksFound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// GET - get one track
router.get('/:trackId', async (req, res) => {
    try {
        const foundTrack = await Track.findById(req.params.trackId)

        if (!foundTrack) {
            res.status(404);
            throw new Error('Pet not found.')
        }

        res.status(200).json(foundTrack);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message })
        }
    }
})

// PUT - update a track
router.put('/:trackId', async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, { new: true });

        res.status(200).json(updatedTrack);

        if (!updatedTrack) {
            res.status(404);
            throw new Error('Pet not found.')
        }

    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
})

// DELETE - delete a track
router.delete('/:trackId', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete({ _id: req.params.trackId })
        if (!deletedTrack) {
            res.status(404)
            throw new Error('Pet not found.')
        }
        res.status(200).json(deletedTrack)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
})

module.exports = router