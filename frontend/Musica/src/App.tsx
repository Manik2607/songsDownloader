import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    const response = await fetch('http://127.0.0.1:8000/search/a');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

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
    </>
  )
}

export default App