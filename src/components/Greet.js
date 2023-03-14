import React, { useState } from "react";
function Greet() { 
  const [stateHora,setHora]=useState('Want the time?')
  function activarHora(){
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return (setHora(time.toString()))
  }
  return(
  <div>
    <p>Hello Again Hooman!</p>
    <p>{stateHora}</p>
    <button onClick={() => activarHora() }>Update Time</button>
  </div>
  )
}

export default Greet