import React from 'react';
import TimezoneSelect from 'react-timezone-select';

function TimezoneSelectComponent({ selectedTimezone, onTimezoneChange }) {
  return (
    <TimezoneSelect
      value={selectedTimezone}
      onChange={onTimezoneChange}
    />
  );
}

export default TimezoneSelectComponent;
