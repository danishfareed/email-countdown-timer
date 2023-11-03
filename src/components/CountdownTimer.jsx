import React, { useState } from 'react';
import axios from 'axios';
import TimezoneSelect from './TimezoneSelect';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CountdownTimer() {
  const [selectedTimezone, setSelectedTimezone] = useState('YourDefaultTimezone');
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  const [countdownGif, setCountdownGif] = useState('');
  const [psdFile, setPsdFile] = useState(null);

  const handleTimezoneChange = (selectedOption) => {
    setSelectedTimezone(selectedOption.value);
  };

  const handleDatetimeChange = (datetime) => {
    setSelectedDatetime(datetime);
  };

  const handlePsdFileChange = (event) => {
    setPsdFile(event.target.files[0]);
  };

  const handleGenerateGif = async () => {
    try {
      if (psdFile) {
        const formData = new FormData();
        formData.append('psdFile', psdFile);
        formData.append('selectedDatetime', selectedDatetime.toISOString());
        formData.append('selectedTimezone', selectedTimezone);

        const response = await axios.post('http://localhost:3001/generate-gif', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { gifUrl } = response.data;
        setCountdownGif(gifUrl);
      } else {
        setCountdownGif('');
      }
    } catch (error) {
      console.error('Error generating GIF:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Generate Countdown GIF</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="timezone" className="text-sm font-medium mb-1">
              Timezone
            </label>
            <TimezoneSelect selectedTimezone={selectedTimezone} onTimezoneChange={handleTimezoneChange} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="datetime" className="text-sm font-medium mb-1">
              Date and Time
            </label>
            <DatePicker
              selected={selectedDatetime}
              onChange={handleDatetimeChange}
              showTimeSelect
              timeIntervals={1}
              dateFormat="yyyy-MM-dd HH:mm"
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="psdFile" className="text-sm font-medium mb-1">
              PSD File (Mandatory)
            </label>
            <input
              type="file"
              accept=".psd"
              onChange={handlePsdFileChange}
              className="border rounded p-2"
              required
            />
          </div>

          <button
            onClick={handleGenerateGif}
            className="bg-blue-500 text-white py-2 px-4 rounded font-medium hover:bg-blue-600 transition duration-200"
            type="button"
          >
            Generate GIF
          </button>
        </form>

        {countdownGif && (
          <div className="mt-6">
            <img src={countdownGif} alt="Countdown Timer" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
