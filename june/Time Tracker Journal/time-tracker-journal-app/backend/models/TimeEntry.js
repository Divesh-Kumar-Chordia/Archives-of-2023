const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimeEntrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  activityDescription: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  }
}, { timestamps: true });

const TimeEntry = mongoose.model('TimeEntry', TimeEntrySchema);

module.exports = TimeEntry;
