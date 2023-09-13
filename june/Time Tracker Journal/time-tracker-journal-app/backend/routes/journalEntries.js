const express = require('express');
const router = express.Router();
const passport = require('passport');
const JournalEntry = require('../models/JournalEntry');

// Middleware for authentication
const requireAuth = passport.authenticate('jwt', { session: false });


// @route   GET api/journal-entries
// @desc    Get all journal entries for the authenticated user
// @access  Private
router.get('/', requireAuth, (req, res) => {
    JournalEntry.find({ user: req.user.id })
      .then(journalEntries => res.json(journalEntries))
      .catch(err => res.status(404).json({ error: 'No journal entries found' }));
  });
  
  // @route   POST api/journal-entries
  // @desc    Create a new journal entry
  // @access  Private
  router.post('/', requireAuth, (req, res) => {
    const { title, content } = req.body;
  
    const newJournalEntry = new JournalEntry({
      user: req.user.id,
      title,
      content
    });
  
    newJournalEntry
      .save()
      .then(journalEntry => res.json(journalEntry))
      .catch(err => res.status(400).json({ error: 'Failed to create a new journal entry' }));
  });
  
  // @route   PUT api/journal-entries/:id
  // @desc    Update a journal entry
  // @access  Private
  router.put('/:id', requireAuth, (req, res) => {
    const { title, content } = req.body;
  
    JournalEntry.findById(req.params.id)
      .then(journalEntry => {
        if (journalEntry.user.toString() !== req.user.id) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        journalEntry.title = title;
        journalEntry.content = content;
  
        journalEntry
          .save()
          .then(updatedJournalEntry => res.json(updatedJournalEntry))
          .catch(err => res.status(400).json({ error: 'Failed to update the journal entry' }));
      })
      .catch(err => res.status(404).json({ error: 'Journal entry not found' }));
  });
  
  // @route   DELETE api/journal-entries/:id
  // @desc    Delete a journal entry
  // @access  Private
  router.delete('/:id', requireAuth, (req, res) => {
    JournalEntry.findById(req.params.id)
      .then(journalEntry => {
        if (journalEntry.user.toString() !== req.user.id) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
  
        journalEntry
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err => res.status(400).json({ error: 'Failed to delete the journal entry' }));
      })
      .catch(err => res.status(404).json({ error: 'Journal entry not found' }));
  });
  
  module.exports = router;
  