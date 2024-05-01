import './App.css'
import Card from './card';
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const [songs, setSongs] = useState<any[]>([]);


  const handleSearch = async () => {
    const response = await fetch('http://127.0.0.1:8000/search/'+searchValue);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setSongs(data);

  };
  

  const handleInputChange = (event: any ) => {
    setSearchValue(event.target.value);
    
  };

  return (
    <>
      <div className="flex p-5">
        <Input value={searchValue} onChange={handleInputChange} />
        <Button className='px-10' onClick={handleSearch}>Search</Button>
      </div>
      <section className='grid grid-cols-4 gap-4 px-48'>
        {songs.map((song, index) => (
          <Card key={index} {...song} />
        ))}
      </section>
    </>
  )
}

export default App