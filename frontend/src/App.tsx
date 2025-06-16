import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data...');
        const response = await axios.get('http://localhost:5000/posts');
        console.log('Response:', response);
        setName(response.data[0].name);
        console.log('Name:', response.data[0].name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    {JSON.stringify(name)}
    </>
  )
}

export default App
