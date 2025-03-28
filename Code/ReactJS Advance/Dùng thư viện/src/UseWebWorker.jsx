import React from "react";
import SortingArray from "./Sorting";
import logo from "./assets/react.svg";

let turn = 0;

function infiniteLoop() {
  const logo = document.querySelector(".App-logo");
  turn += 8;
  logo.style.transform = `rotate(${turn % 360}deg)`;
}

// Test dùng web worker
// Dùng useWebWorker @koale/useworker
export default function UseWebWorker() {

  React.useEffect(() => {
    const loopInterval = setInterval(infiniteLoop, 100);
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <hr />
      <div>
        <SortingArray />
      </div>
    </>
  );
}