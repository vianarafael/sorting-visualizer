import { useState } from 'react'

function App()
{
  const [arr, setArr] = useState([10, 5, 4, 8, 7, 3, 9, 2]);

  const display = () =>
  {
    console.log('display', arr)
   return arr.map(el =>
    {
      return <div className="el" style={{ height: `${el * 4}0px`}}></div>;
    })
  }

  // const bubble = (array) =>
  // {
  //   return array.map(el =>
  //   {
      
  //   })
  // }
  return (
    <div className="App">
      <header>
        <h1>header</h1>
      </header>
      <main>
        {display()}
      </main>
    </div>
  );
}

export default App;
