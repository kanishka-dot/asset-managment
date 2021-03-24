import React, { useEffect,useState } from "react";

function Test(){

  const [state,setState] = useState(1);

function buttonClick(){
  setState(state+1)
}

console.log(state);

  useEffect(()=>{
    console.log("component did mount");  
  },[])

  useEffect(()=>{
    console.log("Button clicked");  
  },[state])


return(
  <div>
    <button onClick={()=>buttonClick()}>Click Me</button>
  </div>
  
)
}


export default Test;
