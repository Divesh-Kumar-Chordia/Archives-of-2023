import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Journal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newJournalEntry = {
        title,
        content,
        tags: tags.split(',').map((tag) => tag.trim())
      };

      const res = await axios.post('/api/journal-entries', newJournalEntry);
      toast.success('Journal entry created successfully');
      console.log(res.data);

      // Reset form fields
      setTitle('');
      setContent('');
      setTags('');
    } catch (error) {
      toast.error('Failed to create journal entry');
      console.error(error.response.data);
    }
  };

  return (
    <div className="container">
      <h2>Journal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Journal Entry
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Journal;
