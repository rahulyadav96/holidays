import {useState,useEffect } from "react";
import axios from 'axios'
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

  return (
    <div className="App">
      <h1>Hello</h1>
      <div>
      From : <input type="date" placeholder="Select date" name="from" onChange={handleChange}/> &nbsp;
      To : <input type="date" placeholder="Select date" name="to" onChange={handleChange}/>

      </div>
        <p>{data.division}</p>
      <div>
      {
        data.events?.filter(ele=>{
          let [fyear, fmonth, fdate] = range.from.split('-').map(Number);
          let [tyear,tmonth,tdate] = range.from.split('-').map(Number);
          let [cyear,cmonth,cdate] = ele.date.split('-').map(Number);

          if(range.from != "" && range.to != ""){

            if(cyear>=fyear && cyear <= tyear){
               if(cyear>fyear){
                  return ele
               }else{
                  if(cyear<tyear){
                    return ele;
                  }else{
                      if(cmonth>fmonth && cmonth<tmonth) return ele
                      else  if(cmonth == fmonth && cmonth<tmonth){
                          
                      }
                  }
               }
            }
          }

          else return ele
        }).map(ele => <div>

          <p>{ele.title} <span>{ele.date}</span></p>
        </div>)
      }
      </div>
    </div>
  );
}

export default App;
