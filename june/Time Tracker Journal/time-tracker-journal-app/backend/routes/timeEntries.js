const express = require('express');
const router = express.Router();
const passport = require('passport');
const TimeEntry = require('../models/TimeEntry');

// Middleware for authentication
const requireAuth = passport.authenticate('jwt', { session: false });

// @route   GET api/time-entries
// @desc    Get all time entries for the authenticated user
// @access  Private
router.get('/', requireAuth, (req, res) => {
  TimeEntry.find({ user: req.user.id })
    .then(timeEntries => res.json(timeEntries))
    .catch(err => res.status(404).json({ error: 'No time entries found' }));
});

// @route   POST api/time-entries
// @desc    Create a new time entry
// @access  Private
router.post('/', requireAuth, (req, res) => {
  const { startTime, endTime, activityDescription, tags } = req.body;

  const newTimeEntry = new TimeEntry({
    user: req.user.id,
    startTime,
    endTime,
    activityDescription,
    tags
  });

  newTimeEntry
    .save()
    .then(timeEntry => res.json(timeEntry))
    .catch(err => res.status(400).json({ error: 'Failed to create a new time entry' }));
});

// @route   PUT api/time-entries/:id
// @desc    Update a time entry
// @access  Private
router.put('/:id', requireAuth, (req, res) => {
  const { startTime, endTime, activityDescription, tags } = req.body;

  TimeEntry.findById(req.params.id)
    .then(timeEntry => {
      if (timeEntry.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      timeEntry.startTime = startTime;
      timeEntry.endTime = endTime;
      timeEntry.activityDescription = activityDescription;
      timeEntry.tags = tags;

      timeEntry
        .save()
        .then(updatedTimeEntry => res.json(updatedTimeEntry))
        .catch(err => res.status(400).json({ error: 'Failed to update the time entry' }));
    })
    .catch(err => res.status(404).json({ error: 'Time entry not found' }));
});

// @route   DELETE api/time-entries/:id
// @desc    Delete a time entry
// @access  Private
router.delete('/:id', requireAuth, (req, res) => {
  TimeEntry.findById(req.params.id)
    .then(timeEntry => {
      if (timeEntry.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      timeEntry
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json({ error: 'Failed to delete the time entry' }));
    })
    .catch(err => res.status(404).json({ error: 'Time entry not found' }));
});

module.exports = router;
