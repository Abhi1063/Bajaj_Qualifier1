import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateJSON(input)) {
      setError('Invalid JSON input');
      return;
    }
    setError('');
    setDropdownVisible(true);

    try {
      const response = await axios.post('YOUR_BACKEND_API_URL', JSON.parse(input));
      setResponseData(response.data);
    } catch (error) {
      setError('Error fetching data from backend');
    }
  };

  const handleDropdownChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON e.g. { "data": ["A", "C", "z"] }'
        />
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>

      {dropdownVisible && (
        <div>
          <label>Select Options:</label>
          <select multiple={true} onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {responseData && selectedOptions.length > 0 && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(responseData[selectedOptions], null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
