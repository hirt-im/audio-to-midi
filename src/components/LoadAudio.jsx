import React from 'react'


export default function LoadAudio(props){

  function addFile(e){
    console.log(e.target.files[0]);
    let s = URL.createObjectURL(e.target.files[0]);
    let a = new Audio(s);
    props.setAudio(a);
  }
  
    return (
        <div>
          <input type="file" onChange={addFile}/>
        </div>
      );
}

