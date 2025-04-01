import { use } from 'react';
import './App.css'

// Dùng use hook
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const y = (async () => {
  await sleep(2000);
  console.log("Ok");
  return "Ok";
})();

function Test({callApi}) {
  const x = use(callApi);
  console.log("X::", x);

  const z = use(y);
  console.log("Z::", z);
  return (
    <>
      Test
    </>
  )
}

export default Test;
