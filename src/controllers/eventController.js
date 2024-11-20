const events = require('../models/eventModel');

const createEvent = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can create events' });
  }

  const { date, time, description } = req.body;
  const newEvent = { id: Date.now(), date, time, description, participants: [] };
  events.push(newEvent);

  res.status(201).json(newEvent);
};

const getEvents = (req, res) => {
  res.json(events);
};

const updateEvent = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can update events' });
  }

  const { id } = req.params;
  const event = events.find(e => e.id === parseInt(id));
  if (!event) return res.status(404).json({ message: 'Event not found' });

  Object.assign(event, req.body);
  res.json(event);
};

const deleteEvent = (req, res) => {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Only organizers can delete events' });
  }

  const { id } = req.params;
  const index = events.findIndex(e => e.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: 'Event not found' });

  events.splice(index, 1);
  res.status(204).end();
};

const registerForEvent = (req, res) => {
  const { id } = req.params;
  const event = events.find(e => e.id === parseInt(id));
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.participants.includes(req.user.id)) {
    return res.status(400).json({ message: 'Already registered' });
  }

  event.participants.push(req.user.id);
  res.json({ message: 'Registered successfully', event });
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent, registerForEvent };
