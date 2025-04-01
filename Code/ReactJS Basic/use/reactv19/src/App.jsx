import { Suspense } from 'react'
import './App.css'
import Test from './Test'

function App() {
  const promise = fetch("https://dogapi.dog/api/v2/breeds").then(d => {
    console.log("Fetch outside");
    return d.json();
  });
  return (
    <>
      <div>fasdfadsfasdf</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Test callApi={promise} />
      </Suspense>
    </>
  )
}

export default App
