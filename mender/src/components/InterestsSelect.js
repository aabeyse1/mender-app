import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import interests from './interests.js';

function InterestsSelect({selectedInterests}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    useEffect(() => {
        setSelectedOptions(selectedInterests.map(interest => ({ value: interest, label: interest })));
      }, [selectedInterests]);

    const handleChange = selectedOptions => {
        setSelectedOptions(selectedOptions);
    }  

    return (
        <div>
          <Select
            options={interests}
            value={selectedOptions}
            onChange={handleChange}
            isMulti
            placeholder="Select interests..."
          />
        </div>
      );
} 


export default InterestsSelect;