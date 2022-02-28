import "./App.css"
import { useState, useEffect } from "react";
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState({
    from: "",
    to: ""
  })
  useEffect(() => {
    axios.get('https://www.gov.uk/bank-holidays.json')
      .then(res =>{ 
        setData( Object.values(res.data))
        //setData(res.data.scotland)
      })
      .catch(err => console.log(err))

  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRange({ ...range, [name]: value })
  }
  const holidaysStyle = {
    flex: 1,
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    scrollbarColor: "rebeccapurple green",
    scrollbarWidth: "thin",
    margin: "auto"
  }
  return (
    <div className="App">
      <h1>Callender</h1>
      <hr />
      <div >
        <h4>Apply Filter</h4>
        From : <input type="date" placeholder="Select date" name="from" onChange={handleChange} /> &nbsp;
        To : <input type="date" placeholder="Select date" name="to" onChange={handleChange} />
        <hr />
      </div>
      
      <div style={{ display: "flex", gap:"15px",height:"400px", flexWrap:"wrap" }}>
        {
          data?.map(cont=>
            
        <div style={holidaysStyle}>
        <h3>Holidays in {cont.division}</h3>
          {
            cont.events?.map(ele => <div>

              <p style={{ display: "flex", justifyContent: "space-evenly" }}><span>{ele.date}</span> <span>{ele.title}</span> </p>
            </div>)
          }
        </div>
            )
        }
      </div>
    </div>
  );
}

export default App;
