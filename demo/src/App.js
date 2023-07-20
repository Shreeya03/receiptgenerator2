import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
const App = () => {
  const downloadFile = () => {
    fetch('http://localhost:3000/gen', { method: 'GET' }) 
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Receipt.pdf'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  };
  const downloadFile1 = () => {
    fetch('http://localhost:3000/genex', { method: 'GET' }) 
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  };
  

  return (
    
    <div className="App">

        <h1>Generate PDF</h1>
        <button class="btn btn-primary" type="submit" value="Submit" onClick={downloadFile}>Generate</button>

        <h1>Generate excel</h1>
        <button class="btn btn-primary" type="submit" value="Submit" onClick={downloadFile1}>Generate</button>

  </div>
  );
};

export default App;
