import axios from 'axios';
import './App.css';
import earth from "./images/wallpaper.jpg"
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function App() {
  const [data,setdata] = useState([
   
  ])

  const [search,getserarch]=useState([]);

  const FormSubmit=async(event)=>{
    event.preventDefault();
    
console.log("hi")
    const country=event.target[0].value
    const gdp=event.target[1].value
    const population=event.target[2].value
    const startyear=event.target[4].value
    const endyear=event.target[5].value
    const populationincrease=event.target[3].value

   let i=0;

 const req= setInterval(async()=>{
 
    if(i==endyear-startyear+1){
      clearInterval(req);
    }
    else{
      await axios.get(`http://127.0.0.1:8000/predict_co2/${country}/${gdp}/${Number(population)+(populationincrease*i)}/${Number(startyear)+i}/`)
      .then(res=>{
        console.log(res.data)
        setdata((prevData) => [
          ...prevData,
          {
            year: `${Number(startyear) + i}`, // Replace this with the appropriate data format
            prediction: res.data.prediction, // Assuming `res.data` contains `sales`
          },
        ]);
      })
      i++;
    }

    
  },1000)


    
  }

  const str=["Afghanistan","Africa","Africa (GCP)","Albania","Algeria","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Asia","Asia (GCP)","Asia (excl. China and India)","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Central America (GCP)","Chad","Chile","China","Christmas Island","Colombia","Comoros","Congo","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Curacao","Cyprus","Czechia","Democratic Republic of Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Europe","Europe (GCP)","Europe (excl. EU-27)","Europe (excl. EU-28)","European Union (27)","European Union (28)","Faroe Islands","Fiji","Finland","France","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Greenland","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","High-income countries","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","International aviation","International shipping","International transport","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kuwaiti Oil Fires","Kuwaiti Oil Fires (GCP)","Kyrgyzstan","Laos","Latvia","Least developed countries (Jones et al.)","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Low-income countries","Lower-middle-income countries","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia (country)","Middle East (GCP)","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Non-OECD (GCP)","North America","North America (GCP)","North America (excl. USA)","North Korea","North Macedonia","Norway","OECD (GCP)","OECD (Jones et al.)","Oceania","Oceania (GCP)","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Ryukyu Islands","Ryukyu Islands (GCP)","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South America","South America (GCP)","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Upper-middle-income countries","Uruguay","Uzbekistan","Vanuatu","Vatican","Venezuela","Vietnam","Wallis and Futuna","World","Yemen","Zambia","Zimbabwe"]
  
  const findCountry=(val)=>{
    if(val.target.value.length>=1){
   getserarch(str.filter((item)=>item.toLowerCase().startsWith(val.target.value.toLowerCase())))
    }
    else{
      getserarch([]);
    }
  }

  return (
    <div className="bg-no-repeat flex gap-5 w-screen overflow-hidden h-screen box-border p-5 bg-cover" style={{backgroundImage:`url('${earth}')`}}>

      <div className="w-fit box-border p-5 h-full backdrop-blur-xl flex flex-col bg-black/30 rounded-lg">
      <h3 className="uppercase text-white mx-auto font-bold text-2xl my-6">Prediction</h3>
        <form className='mx-auto flex flex-col relative' onSubmit={FormSubmit}>
        <input onChange={findCountry} id="country" className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded text-sm" required placeholder='Enter Country name' type='text'/>
        <div className='absolute flex flex-col gap-2 top-12'>
          {search.map((item,index)=>(
            <button key={index} className='text-white backdrop-blur-xl w-80 h-10 rounded-lg bg-black' onClick={()=>{document.getElementById("country").value=item;getserarch([])}}>{item}</button>
          ))}
        </div>
        <input className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded text-sm" required placeholder='Enter GDP' type='number'/>
        <input className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded text-sm" required placeholder='Enter Population of Starting Year' type='number'/>
        <input className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded text-sm" required placeholder='Average Population increase every Year' type='number'/>
        <input className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded text-sm" required placeholder='Enter Starting Year' type='number'/>
        <input className="px-2 w-80 py-3 outline-none bg-white/40  mb-6 placeholder:text-gray-800 rounded text-sm" required placeholder='Enter Ending Year' type='number'/>
        <button type="submit" className="w-full rounded-full mt-5 text-lg bg-green-600 text-white py-2 uppercase tracking-wider font-bold">Predict</button>       
        </form>


      </div>

      <div className="w-full h-full overflow-x-scroll backdrop-blur-xl bg-black/30 rounded-lg">

     
      <LineChart
      width={150*data.length}
      height={500}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray=""/>
      <XAxis dataKey="year" stroke='#ffffff'/>
      <YAxis stroke='#ffffff'/>
      <Tooltip />
     
      <Line type="monotone" dataKey="prediction" stroke="#00A300" strokeWidth={3} />
    </LineChart>

      </div>
      
    </div>
  );
}

export default App;
