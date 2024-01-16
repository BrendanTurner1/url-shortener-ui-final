import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls()
      .then((url) => {
        setUrls(url.urls);
      })
      .catch((error)=> {
        console.error('Error fetching data', error);
      })
  },[])

  const updateUrls = (newUrl) => {
    setUrls([...urls, newUrl]);
  }

  return (
    <main className="App">
      <header>
        <h1 className='app-title'>URL Shortener</h1>
        <UrlForm updateUrls={updateUrls}/>
      </header>

      <UrlContainer urls={urls} key={urls.id} />
    </main>
  );
}

export default App;
