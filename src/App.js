import "./App.css"
import {useState,useEffect } from "react";
import axios from 'axios';


function App() {
  const [data,setData] = useState({});
  const [range,setRange] = useState({
    from:"",
    to:""
  })
  useEffect(()=>{
    axios.get('https://www.gov.uk/bank-holidays.json')
    .then(res=>setData(res.data.scotland))
    .catch(err=> console.log(err))

  },[]) 

  const handleChange =(e)=>{
    const { name, value} = e.target;
    setRange({...range,[name]:value})
  }
  const holidaysStyle = {
    width:"500px",
    height:"400px",
    overflowY: "scroll",
    scrollbarColor: "rebeccapurple green",
    scrollbarWidth: "thin",
    margin:"auto"
  }
  return (
    <div className="App">
      <h1>Callender</h1>
      <hr/>
      <div>
        <h4>Apply Filter</h4>
      From : <input type="date" placeholder="Select date" name="from" onChange={handleChange}/> &nbsp;
      To : <input type="date" placeholder="Select date" name="to" onChange={handleChange}/>
      <hr/>
      </div>
        <h3>Holidays in {data.division}</h3>
      <div style={holidaysStyle}>
      {
        data.events?.map(ele => <div>

          <p style={{display:"flex", justifyContent:"space-evenly"}}><span>{ele.date}</span> <span>{ele.title}</span> </p>
        </div>)
      }
      </div>
    </div>
  );
}

export default App;
