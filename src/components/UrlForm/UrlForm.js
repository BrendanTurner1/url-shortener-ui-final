import React, { useState } from 'react';

function UrlForm({ updateUrls }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [postData, setPostData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      long_url: urlToShorten,
      title: title
    }
    setPostData(newData);
    fetch('http://localhost:3001/api/v1/urls', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(postData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseData) => {
      console.log('Response data:', responseData);
      updateUrls(responseData)
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='url'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button onClick={e => handleSubmit(e)}>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
