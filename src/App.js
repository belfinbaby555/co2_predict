import axios from 'axios';
import './App.css';
import earth from "./images/wallpaper.jpg";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Text } from "recharts";
import { Link } from 'react-router-dom';


const countryList=["Afghanistan","Africa","Africa (GCP)","Albania","Algeria","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda",
  "Argentina","Armenia","Aruba","Asia","Asia (GCP)","Asia (excl. China and India)","Australia","Austria","Azerbaijan","Bahamas",
  "Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire Sint Eustatius and Saba",
  "Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia",
  "Cameroon","Canada","Cape Verde","Central African Republic","Central America (GCP)","Chad","Chile","China","Christmas Island",
  "Colombia","Comoros","Congo","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Curacao","Cyprus","Czechia",
  "Democratic Republic of Congo","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Europe","Europe (GCP)","Europe (excl. EU-27)","Europe (excl. EU-28)",
  "European Union (27)","European Union (28)","Faroe Islands","Fiji","Finland","France","French Polynesia","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Greenland","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","High-income countries",
  "Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","International aviation","International shipping","International transport",
  "Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kuwaiti Oil Fires",
  "Kuwaiti Oil Fires (GCP)","Kyrgyzstan","Laos","Latvia","Least developed countries (Jones et al.)","Lebanon","Lesotho","Liberia","Libya",
  "Liechtenstein","Lithuania","Low-income countries","Lower-middle-income countries","Luxembourg","Macao","Madagascar","Malawi","Malaysia",
  "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia (country)","Middle East (GCP)","Moldova","Monaco",
  "Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand",
  "Nicaragua","Niger","Nigeria","Niue","Non-OECD (GCP)","North America","North America (GCP)","North America (excl. USA)","North Korea",
  "North Macedonia","Norway","OECD (GCP)","OECD (Jones et al.)","Oceania","Oceania (GCP)","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Ryukyu Islands","Ryukyu Islands (GCP)",
  "Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino",
  "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia",
  "Slovenia","Solomon Islands","Somalia","South Africa","South America","South America (GCP)","South Korea","South Sudan","Spain","Sri Lanka",
  "Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Upper-middle-income countries","Uruguay","Uzbekistan","Vanuatu","Vatican","Venezuela","Vietnam","Wallis and Futuna","World","Yemen",
  "Zambia","Zimbabwe"]

function App() {
  const [data, setData] = useState([]);
  const [dash, setDash] = useState();
  const [formData, setFormData] = useState({
    country: "",
    gdp: "",
    population: "",
    startyear: "",
    endyear: "",
    populationincrease: "",
    algorithm:"Random Forest"
    
  });
  const [search, setSearch] = useState([]);
  const [option,setoption]=useState({opt:0,title:"country prediction"});

  useEffect(() => {
    axios.get('/dash')
      .then(res => {
        setDash(res.data.message);
        console.log(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formData)
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    if (value.length >= 1) {
      setSearch(countryList.filter((item) => item.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };

  const FormSubmit = async (event) => {
    console.log("hi");
    event.preventDefault();
    setData([]);
  
    const { country, gdp, population, startyear, endyear, populationincrease, sector, algorithm } = formData;
  
    try {
      for (let i = 0; i <= Number(endyear) - Number(startyear); i++) {
        const year = Number(startyear) + i;
        console.log(year);
  
        const response = await axios.get(
          `/${algorithm === "Random Forest" ? "predict_co2" : "arima"}/${
            option.opt === 1 ? "world" : option.opt === 2 ? sector : country
          }/${gdp}/${Number(population) + populationincrease * i}/${year}/`
        );
  
        setData((prevData) => [
          ...prevData,
          {
            year: year,
            prediction: response.data.prediction,
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching prediction:", err);
    }
  };
  

  return (
    <div>
      <div className="bg-no-repeat bg-cover" style={{ backgroundImage: `url('${earth}')` }}>
        <div className={`gap-5 w-screen overflow-hidden h-screen box-border p-5  ${dash === "User not logged in" ? " hidden" : " flex"}`}>
          {/*Navigation Bar*/}
          <div className='box-border p-5 h-full backdrop-blur-xl gap-5 flex flex-col bg-black/30 rounded-lg'>
            <button onClick={()=>{setoption({opt:0,title:"country prediction"})}} className={' text-white rounded-lg w-16 h-16' + (option.opt==0?" bg-green-600":" ")}>
              <i className='fa fa-line-chart text-2xl'></i>
            </button>
            <button onClick={()=>{setoption({opt:1,title:"world prediction"})}} className={' text-white rounded-lg w-16 h-16'+ (option.opt==1?" bg-green-600":" ")}>
            <i className='fa fa-globe text-3xl'></i>
            </button>
            <button onClick={()=>{setoption({opt:2,title:"sector prediction"})}} className={' text-white rounded-lg w-16 h-16'+ (option.opt==2?" bg-green-600":" ")}>
            <i className='fa fa-users text-2xl'></i>
            </button>
            <button onClick={()=>{window.location.reload();axios.get("/logout")}} className=' text-red-700 rounded-lg w-16 h-16'>
            <i className='fa fa-sign-out text-3xl'></i>
            </button>
          </div>
          {/* Form Section - normal */}
          <div className="w-fit box-border p-5 h-full backdrop-blur-xl flex flex-col bg-black/30 rounded-lg">
            <h3 className="uppercase text-white mx-auto font-bold text-2xl my-6">{option.title}</h3>
             <select onClick={handleInputChange} name='algorithm' className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm">
                  <option value="Random Forest">Random Forest</option>
                  <option value="Linear Regression">Linear Regression</option>
                </select>
            <form className='mx-auto flex flex-col relative' onSubmit={FormSubmit}>
            <div className={option.opt == 0?" block": " hidden"}>
            <input
                onChange={handleCountryChange}
                id="country"
                name="country"
                value={formData.country}
                className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"
                required
                placeholder='Enter Country name'
                type='text'
                disabled={option.opt != 0}
              />
              <div className='absolute flex flex-col gap-2 top-12'>
                {search.map((item, index) => (
                  <button
                    key={index}
                    className='text-white backdrop-blur-xl w-80 h-10 rounded-lg bg-black'
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, country: item }));
                      setSearch([]);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <select onClick={handleInputChange} name='sector' className={"px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"+(option.opt == 2?" block": " hidden")}>
              <option value="International aviation">International aviation</option>
              <option value="International shipping">International shipping</option>
              <option value="International transport">International transport</option>
            </select>
              <input
                name="gdp"
                value={formData.gdp}
                onChange={handleInputChange}
                className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"
                required
                placeholder='Enter GDP'
                type='number'
              />
              <input
                name="population"
                value={formData.population}
                onChange={handleInputChange}
                className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"
                required
                placeholder='Enter Population of Starting Year'
                type='number'
              />
              <input
                name="populationincrease"
                value={formData.populationincrease}
                onChange={handleInputChange}
                className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"
                required
                placeholder='Average Population increase every Year'
                type='number'
              />
              <input
                name="startyear"
                value={formData.startyear}
                onChange={handleInputChange}
                className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"
                required
                placeholder='Enter Starting Year'
                type='number'
              />
              <input
                name="endyear"
                value={formData.endyear}
                onChange={handleInputChange}
                className="px-2 w-80 py-3 outline-none bg-white/40 mb-6 placeholder:text-gray-800 rounded text-sm"
                required
                placeholder='Enter Ending Year'
                type='number'
              />
              
              <button type="submit" className="w-full rounded-full mt-5 text-lg bg-green-600 text-white py-2 uppercase tracking-wider font-bold">
                Predict
              </button>
            </form>
          </div>
              {/*}
          {/* Chart Section */}
          <div className="w-full h-full overflow-x-scroll overflow-hidden relative backdrop-blur-xl bg-black/30 rounded-lg">
         <div className=' m-7 p-5 box-border rounded-lg text-white'>
          <h1 className='text-center mb-8 text-2xl uppercase font-bold'>CO2 Prediction</h1>

          <table className="w-full text-center border-collapse">
  <thead>
    <tr className="border-2">
      <th className="p-1">Parameters</th>
      <th className="p-1">Values</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-x-2">
      <td className="p-1">Algorithm</td>
      <td className="p-1">{formData.algorithm}</td>
    </tr>
    <tr className="border-x-2">
      <td className="p-1">Country / Sector</td>
      <td className="p-1">{formData.country ? formData.country : "No Data"}</td>
    </tr>
    <tr className="border-x-2 border-b-2">
      <td className="p-1">Year</td>
      <td className="p-1">
        {formData.startyear ? formData.startyear + "-" + formData.endyear : "No Data"}
      </td>
    </tr>
  </tbody>
</table>

         </div>

         <div className={'absolute left-1/2 top-[60vh] text-white/50 text-lg ' + (data.length?" hidden":" block")}>No Data for Prediction</div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Line type="monotone" dataKey="prediction" stroke="#00A300" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Login/Signup Section */}
        <div className={`w-full h-screen flex-col backdrop-blur-md bg-black/20 rounded-lg  ${dash === "User not logged in" ? " flex" : " hidden"}`}>
          <h1 className='text-[150px] w-full text-center mt-auto text-white font-out tracking-[40px] font-extralight'>PREDICT</h1>
          <p className='mx-auto text-white tracking-wide w-[50%] text-center'>
            Predicting CO₂ emissions is a crucial step in understanding and mitigating climate change. This project leverages a trained AI model to analyze historical data and forecast CO₂ emissions over the years. By incorporating advanced machine learning techniques, it provides insights into emission trends, enabling data-driven decision-making for environmental policies and sustainable development.
          </p>
          <span className='flex gap-2 mx-auto mb-auto'>
            <Link to="/signup">
              <button className='p-3 px-6 text-white my-5 bg-green-600 w-40 mx-auto rounded-full'>Get Started</button>
            </Link>
            <Link to="/login">
              <button className='p-3 px-6 text-white my-5 bg-green-600 w-40 mx-auto rounded-full'>Login</button>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
