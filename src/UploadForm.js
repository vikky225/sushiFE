import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [trayCount, setTrayCount] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/calculate', formData);
            const result = response.data;

            // Set the tray count in the state
            setTrayCount(result);
        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
        }
    };

    return (

        <div className="container">
            <div className="content-box">
                <h1 className="header">Sushi Train</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fileInput" className="file-label ">
                        File:
                    </label>
                    <input id="fileInput" type="file" className="file-input" onChange={handleFileChange} />
                    <button type="submit" className="blue-button">
                        Calculate
                    </button>
                </form>

                <div className="result">
                    Total Tray Count: {trayCount}
                </div>

            </div>
        </div>
    );
};

export default UploadForm;
