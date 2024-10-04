import React, { useState } from 'react';
import axios from 'axios';
import './form.css'; // Import the CSS file

const FamilyTestForm = () => {
    const [virusPattern, setVirusPattern] = useState('');
    const [numPatients, setNumPatients] = useState(0);
    const [patients, setPatients] = useState([]);
    const [results, setResults] = useState(null);

    const handlePatientChange = (index, value) => {
        const updatedPatients = [...patients];
        updatedPatients[index] = value;
        setPatients(updatedPatients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Logic to check if each patient sample is a substring of the virus pattern
        const logicResults = patients.map(sample => {
            if (sample === '') {
                return 'null'; // Return 'null' if the sample is empty
            }
            return virusPattern.includes(sample) ? 'Positive' : 'Negative'; // Check if sample is a substring of the virus pattern
        });

        try {
            const data = { virusPattern, patients };
            const response = await axios.post('http://127.0.0.1:8000/api/family-test/', data);
            setResults(logicResults); // Use local logic results

            // Check if results are displayed in the frontend
            if (!logicResults || logicResults.length === 0) {
                alert('Results stored in the database: ' + JSON.stringify(response.data));
                console.log('Results stored in the database:', response.data);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className="bg-custom">
            <div className="container form-container mt-5">
                <h2 className="text-center mb-4">Catseye Virus Path Lab</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Virus Pattern:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={virusPattern}
                            onChange={(e) => setVirusPattern(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Patients:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={numPatients}
                            onChange={(e) => {
                                const value = e.target.value;
                                setNumPatients(value);
                                if (value) {
                                    setPatients(Array(parseInt(value)).fill(''));
                                } else {
                                    setPatients([]);
                                }
                            }}
                        />
                    </div>
                    <h3>Blood Samples</h3>
                    {patients.map((sample, index) => (
                        <div key={index} className="form-group">
                            <label>Patient Blood Sample {index + 1}:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={sample}
                                onChange={(e) => handlePatientChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary btn-block">Send for Testing</button>
                </form>
                {results && (
                    <div className="mt-4">
                        <h3>Results</h3>
                        <ul className="list-group">
                            {results.map((result, index) => (
                                <li key={index} className="list-group-item">
                                    Patient {index + 1}: {result !== null ? result : 'null'}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FamilyTestForm;