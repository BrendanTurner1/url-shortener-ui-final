import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState([])

  useEffect(() => {
    getUrls()
      .then((url) => {
        setUrls(url.urls)
      })
      .catch((error)=> {
        setError(error.message)
        console.error('Error fetching data', error)
      })
  })

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm />
      </header>

      <UrlContainer urls={urls} key={urls.id}/>
    </main>
  );
}

export default App;
