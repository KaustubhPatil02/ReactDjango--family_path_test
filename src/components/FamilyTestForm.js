import React, { useState } from 'react';
import axios from 'axios';

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
            return virusPattern.includes(sample) ? 'Positive' : 'Negative'; // Check if sample is a substring of the virus pattern
        });

        try {
            const data = { virusPattern, patients };
            await axios.post('http://127.0.0.1:8000/api/family-test/', data);
            setResults(logicResults); // Use local logic results
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div>
            <h2>Family Path Test</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Virus Pattern:</label>
                    <input
                        type="text"
                        value={virusPattern}
                        onChange={(e) => setVirusPattern(e.target.value)}
                    />
                </div>
                <div>
                    <label>Number of Patients:</label>
                    <input
                        type="number"
                        value={numPatients}
                        onChange={(e) => {
                            setNumPatients(e.target.value);
                            setPatients(Array(parseInt(e.target.value)).fill(''));
                        }}
                    />
                </div>
                {patients.map((sample, index) => (
                    <div key={index}>
                        <label>Blood Sample {index + 1}:</label>
                        <input
                            type="text"
                            value={sample}
                            onChange={(e) => handlePatientChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit">Send for Testing</button>
            </form>
            {results && (
                <div>
                    <h3>Results</h3>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>Patient {index + 1}: {result}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FamilyTestForm;
