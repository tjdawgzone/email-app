import './App.css';
import {Button,TextField} from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Select from 'react-select'

function App() {
  const [entity,setEntity] = useState(null)
  const [myName,setMyName] = useState("")

  const entitiesByName = [
    { class:"CHOC 2330",email: 'choco@late.com', name:'Chocolate',label: 'Chocolate' },
    { class:"STRAW 4432",email: 'straw@berry.com', name:'Strawberry',label: 'Strawberry' },
    { class:"APMA 1110",email:'van@illa.com', name:'Vanilla',label: 'Vanilla' }
  ]
  const entitiesByEmail = [
    { class:"CHOC 2330",email: 'choco@late.com', name:'Chocolate',label: 'choco@late.com' },
    { class:"STRAW 4432",email: 'straw@berry.com', name:'Strawberry',label: 'straw@berry.com' },
    { class:"APMA 1110",email:'van@illa.com', name:'Vanilla',label: 'van@illa.com' }
  ]
  const entitiesByClass = [
    { class:"CHOC 2330",email: 'choco@late.com', name:'Chocolate',label: 'CHOC 2330' },
    { class:"STRAW 4432",email: 'straw@berry.com', name:'Strawberry',label: 'STRAW 4432' },
    { class:"APMA 1110",email:'van@illa.com', name:'Vanilla',label: 'APMA 1110' }
  ]
  return (
    <div class="center" style={{justifyContent:"center"}}>
      <h1>🦉 HooHacks Owl Mail ✉️</h1>
      <h2>Name/Organization:</h2>
      <Select placeholder="Name/Organization" value={entity&&{label:entity.name}} onChange={(selectedOption)=>{
        setEntity(selectedOption);
        console.log('Option selected:', selectedOption)
      }} options={entitiesByName} />
      <h2>Email Address:</h2>
      <Select placeholder="Email Address" value={entity&&{label:entity.email}} onChange={(selectedOption)=>{
        setEntity(selectedOption);
        console.log('Option selected:', selectedOption)
      }} options={entitiesByEmail} />
      <h2>Class List:</h2>
      <Select placeholder="Classes" value={entity&&{label:entity.class}} onChange={(selectedOption)=>{
        setEntity(selectedOption);
        console.log('Option selected:', selectedOption)
      }} options={entitiesByClass} />
      {entity&&<p>Sending to {entity.name} at {entity.email}. {entity.name} teaches {entity.class}.  My name is {myName}.</p>}
      <TextField onChange={(evt)=>{
        setMyName(evt.target.value)
      }}/>
      <Button onClick={()=>{
        window.location.href = "mailto:"+entity.email+"?subject=HooHacks For Humanity&body=message%20goes%20here";
      }}>Send Email</Button>
    </div>
  );
}

export default App;
