import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [carModel, setCarModel] = useState('Tesla');
  const [isBlack, setIsBlack] = useState(false);
  const [serverResponse, setServerResponse] = useState('');
  const [inputsEnabled, setInputsEnabled] = useState(true);

  const handleSubmit = async () => {
    const response = await fetch('http://127.0.0.1:8000/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: itemName,
        model: carModel,
        description: itemDescription,
        isBlack: isBlack,
      }),
    });

    const data = await response.json();
    setServerResponse(JSON.stringify(data, null, 2));
  };

  const toggleInputs = () => {
    setInputsEnabled(!inputsEnabled);
  };

  return (
    <div className="container mt-5 ">

      <label class="switch position-fixed top-0 end-0 m-4">
        <input type="checkbox" />
        <span class="slider" onClick={toggleInputs}></span>
      </label>

      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="mb-4">FastAPI and React Example</h1>

        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control smaller-input"
            onChange={(e) => setItemName(e.target.value)}
            disabled={!inputsEnabled} />
        </div>

        <div className="mb-3">
          <label className="form-label">Car model:</label>
          <select
            className="form-select smaller-input"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            disabled={!inputsEnabled}
          >
            <option value="Honda">Honda</option>
            <option value="Toyota">Toyota</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Color:</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="colorWhite"
              name="color"
              value="true"
              checked={isBlack === true}
              onChange={() => setIsBlack(true)}
              disabled={!inputsEnabled}
            />
            <label className="form-check-label" htmlFor="colorWhite">
              Black
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="colorBlack"
              name="color"
              value="false"
              checked={isBlack === false}
              onChange={() => setIsBlack(false)}
              disabled={!inputsEnabled}
            />
            <label className="form-check-label" htmlFor="colorBlack">
              White
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Something else?</label>
          <textarea
            className="form-control smaller-input"
            rows="3"
            onChange={(e) => setItemDescription(e.target.value)}
            disabled={!inputsEnabled}
          ></textarea>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit} disabled={!inputsEnabled}>
          Submit
        </button>

        {serverResponse && (
          <div className="mt-4">
            <h4>Server Response:</h4>
            <pre>{serverResponse}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
