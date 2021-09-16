import './App.css';
import {Button,TextField,Card} from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Select from 'react-select'
import logo from './hoohackslogo.png';
import Papa from 'papaparse';
import file from './emails.csv'
import clone from 'just-clone';


function App() {
  const [entity,setEntity] = useState({name:"",class:"",type:"",email:""})
  const [myName,setMyName] = useState("")
  const [entitiesByName,setEntitiesByName] = useState(null);
  const [entitiesByEmail,setEntitiesByEmail] = useState(null);
  const [entitiesByClass,setEntitiesByClass] = useState(null);

// useEffect scans CSV to get data
useEffect(()=>{
  Papa.parse(file, {
    download: true,
    complete: function(results) {
      const array = [];
      results.data.splice(0,1)
      results.data.forEach((entity,index)=>{
      if(results.data[index-1]&&(results.data[index-1][1]===entity[1])){
        array[array.length-1].class.push(entity[2])
      }
      else{
        const newEntity={
          type:entity[0],
          name:entity[1],
          class:[entity[2]], 
          email:entity[3]
        }
        array.push(newEntity);
      }
      })
      const array1 = clone(array)
      const array2 = clone(array)
      const array3 = clone(array)
      setEntitiesByName(setLabel(array1,"name"));
      setEntitiesByClass(setLabel(array2,"class"));
      setEntitiesByEmail(setLabel(array3,"email"));
    }
  });
},[])

// function to send the mailto command and open default mail app
  const sendEmail = (()=>{
    if(entity.type.toLowerCase()==="professor"){
      window.location.href = "mailto:"+entity.email+"?subject=Ideathon Registration is Open!&body="+pMessage;
    }
    else{
      window.location.href = "mailto:"+entity.email+"?subject=Ideathon Registration is Open!&body="+oMessage;
    }
  })

  // this is for organizing the data for react-select
  const setLabel = ((data,type)=>{
    const newArray = [];
      data.forEach((entity)=>{
        if(type==="name")
        entity.label=entity.name;
        else if(type==="email")
        entity.label=entity.email;
        else
        entity.label=formatArray(entity.class);

        newArray.push(entity);
      })
      return newArray;
  })

  // basically formats a professor's classes into an English string
  const formatArray = ((array)=>{
    if(array.length===1)
    return array[0]
    else if(array.length===2){
    return array[0]+" and "+array[1]
    }
    else{
      let result = ""
    for(let x=0;x<array.length;x++){
      if(x===array.length-1){
        result = result+" and "+array[x]
      }
      else if(x===0){
        result = result + array[0] + ","
      }
      else{
        result = result + " " + array[x] + ","
      }
    }
    return result;     
    }
  })

// Professor Message Version

const pMessage = `Dear Professor ${entity.name.split(' ').pop()},%0D%0A%0D%0A

I’m ${myName} from The HooHacks Team, and I’d greatly appreciate it if you would take the time to share this fantastic opportunity with your students in ${formatArray(entity.class)}.%0D%0A%0D%0A

The HooHacks Team is proud to announce that registration is open for Ideathon 2021, which will take place in-person on October 2nd!  Ideathon is a networking, team-building, and pitching event designed 
to help students with technical experience and students with business experience build their technical business idea.  Student teams can meet 1:1 with 
industry experts about their ideas and form long lasting relationships with them as they continue to grow their ideas. Corporate sponsors will be holding workshops to teach students about pitching their ideas, 
valuing their potential businesses, and building technical prototypes. There will be a two hour pitching event, where teams will pitch to a board of sponsors for funding.  Teams will have the opportunity to win up to
$500 worth of seed money to help fund their startup. In total, there will be more than $2000 worth of prizes!%0D%0A%0D%0A

Sign up today at:  https://ideathon.hoohacks.io/apply %0D%0A%0D%0A
Learn more about the event at: https://ideathon.hoohacks.io/ %0D%0A%0D%0A

Best Regards,%0D%0A
${myName}
`


// Organization Message Version
// Not updated since HooHacks for Humanity

const oMessage = `Dear ${entity.name},%0D%0A%0D%0A

I’m ${myName} from The HooHacks Team, and I would greatly appreciate it if you would take the time to share this wonderful opportunity with your members.%0D%0A%0D%0A

Due to the recent surge in COVID-19 cases in parts of the world such as India, Argentina, and more, The HooHacks Team feels compelled to contribute its resources and platform to combatting the pandemic.  
This is why we are introducing HooHacks for Humanity: COVID-19, a virtual hackathon and ideathon hybrid event from July 25-31 that serves as a platform for students from all academic backgrounds to utilize their creativity and problem solving abilities to solve/alleviate issues relating to COVID-19.  
This is a hybrid event as there will be two tracks: one that focuses primarily on the idea (similar to an ideathon), and another that will focus on the implementation of the solution (similar to a hackathon).  
Solutions could attempt to resolve problems like the efficiency of vaccine distribution, transportation to vaccine centers, or fundraising and awareness; it’s up to the team to define the problem and address it.  
We will have multiple incredible guest speakers at this event and also mentors that will provide valuable guidance to teams as they formulate their solutions.  
In addition, the best ideas and solution implementations will win prizes and cash funding!%0D%0A%0D%0A

You can sign up today at this link: https://humanity.hoohacks.io/apply %0D%0A%0D%0A
Learn more about the hackathon at: https://humanity.hoohacks.io/ %0D%0A%0D%0A

Again, thank you for sharing this meaningful opportunity with everyone!  We hope to see everyone there.%0D%0A%0D%0A

Sincerely,%0D%0A
${myName}
  `

  return (
    <div class="center" style={{justifyContent:"center"}}>
      <Card elevation="13"style={{marginTop:"10%", marginBottom:"5%",height:"auto",width:"auto"}}>
        <div style={{margin:"50px"}}>
      <div style={{display:"block",textAlign:"center"}}>
      <img style={{height:60, width:410}} alt="HooHacks Logo" src={logo}/>
      <h3 style={{marginTop:2,fontWeight:"300"}}>Hoo's mailing this? Owl mail It!</h3>
      </div>
      <h2 style={{fontWeight:"300"}}>Name/Organization:</h2>
      <Select placeholder="Name/Organization" value={entity&&{label:entity.name}} onChange={(selectedOption)=>{
        setEntity(selectedOption);
      }} options={entitiesByName} />
      <h2 style={{fontWeight:"300"}}>Email Address:</h2>
      <Select placeholder="Email Address" value={entity&&{label:entity.email}} onChange={(selectedOption)=>{
        setEntity(selectedOption);
      }} options={entitiesByEmail} />
      <h2 style={{fontWeight:"300"}}>Class List:</h2>
      <Select value={entity&&{label:formatArray(entity.class)}} onChange={(selectedOption)=>{
        setEntity(selectedOption);
      }} options={entitiesByClass} />
      <h2 style={{fontWeight:"300"}}>Your Name:</h2>
      <TextField placeholder="Name" style={{width:200}}onChange={(evt)=>{
        setMyName(evt.target.value)
      }} onKeyDown={(evt)=>{
        if(evt.key==="Enter"){
            sendEmail();
        }}}/>
      <br/>
      <Button variant="contained" color="primary" style={{marginTop:"30px"}} onClick={()=>{
        sendEmail();
      }}>Send Email</Button>
      </div>
      </Card>
    </div>
  );
}

export default App;
