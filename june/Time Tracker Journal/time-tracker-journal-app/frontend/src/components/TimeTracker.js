import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TimeTracker = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTimeEntry = {
        startTime,
        endTime,
        activityDescription,
        tags: tags.split(',').map((tag) => tag.trim())
      };

      const res = await axios.post('/api/time-entries', newTimeEntry);
      toast.success('Time entry created successfully');
      console.log(res.data);

      // Reset form fields
      setStartTime('');
      setEndTime('');
      setActivityDescription('');
      setTags('');
    } catch (error) {
      toast.error('Failed to create time entry');
      console.error(error.response.data);
    }
  };

  return (
    <div className="container">
      <h2>Time Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="activityDescription">Activity Description:</label>
          <input
            type="text"
            className="form-control"
            id="activityDescription"
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Time Entry
        </button>
      </form>
    </div>
  );
};

export default TimeTracker;
