import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FutureDiary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryEntry, setDiaryEntry] = useState('');
  const [loading, setLoading] = useState(false);

  const generateDiaryEntry = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/future/diary', {
        date: selectedDate,
        userData: {
          // Add user data here
        }
      });
      setDiaryEntry(response.data.entry);
    } catch (error) {
      console.error('Error generating diary entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="future-diary">
      <h2>Future Diary</h2>
      <div className="date-selector">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          minDate={new Date()}
          placeholderText="Select future date"
        />
        <button 
          onClick={generateDiaryEntry}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Entry'}
        </button>
      </div>
      {diaryEntry && (
        <div className="diary-entry">
          <h3>{selectedDate.toLocaleDateString()}</h3>
          <div className="entry-content">
            {diaryEntry}
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureDiary; 