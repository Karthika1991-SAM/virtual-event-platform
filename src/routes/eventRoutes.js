const express = require('express');
const {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    registerForEvent,
} = require('../controllers/eventController');
const authenticateToken = require('../middleware/authMiddleware');
const { ensureOrganizer } = require('../middleware/roleMiddleware');

const router = express.Router();

// Use `authenticateToken` globally for all routes
router.use(authenticateToken);

// Routes that require the "organizer" role
router.post('/', ensureOrganizer, createEvent); // Only organizers can create events
router.put('/:id', ensureOrganizer, updateEvent); // Only organizers can update events
router.delete('/:id', ensureOrganizer, deleteEvent); // Only organizers can delete events

// Routes accessible to all authenticated users
router.get('/', getEvents); // Anyone with a valid token can view events
router.post('/:id/register', registerForEvent); // Anyone with a valid token can register for events

module.exports = router;
