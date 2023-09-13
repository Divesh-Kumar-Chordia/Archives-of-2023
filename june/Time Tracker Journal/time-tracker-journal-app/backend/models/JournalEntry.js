const mongoose = require('mongoose');
const { Schema } = mongoose;

// Journal Entry Schema
const JournalEntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: new Date("2023-06-12T00:45:50+05:30")
  },
  tags: {
    type: [String]
  }
});

const JournalEntry = mongoose.model('journalEntry', JournalEntrySchema);

module.exports = JournalEntry;
