import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
   let api = process.env.REACT_APP_URL
   let key = process.env.REACT_APP_KEY


   let [h1,seth1] = useState()
   let [name,setname] = useState()
   let [main,setmain] = useState()
   let [wind,setwind] = useState()
   let [icon,seticon] = useState()
   let [img,setimg] = useState()
   let [des,setdes] = useState()
   let [humd,sethumd] = useState()
   let [feel,setfeel] = useState()
   let [input,setInput] = useState("")

   const submit = async(e)=>{
    e.preventDefault()

   }

  let get = async()=>{
    const city = input.trim() === "" ? "Delhi" : input;

     try{

      let res = await fetch(api + city + "&appid=" + key)

     let data = await res.json()

     //image and icon set

     if(data.weather[0].main === "Clouds"){
        seticon("/assets/clouds.png")
        setimg("/assets/Clouds-image.jpeg")
     }else if(data.weather[0].main === "Rain"){
        seticon("/assets/rain.png")
        setimg("/assets/rain-image.png")
     }else if(data.weather[0].main === "Clear"){
        seticon("/assets/clear.png")
        setimg("/assets/clear-image.jpg")
     }else if(data.weather[0].main === "Drizzle"){
        seticon("/assets/drizzle.png")
        setimg("/assets/drizzle-image.jpg")
     }else if(data.weather[0].main === "Mist"){
        seticon("/assets/mist.png")
        setimg("/assets/Mist-image.webp")
     }else if(data.weather[0].main === "Snow"){
        seticon("/assets/snow.png")
        setimg("/assets/Snow-image.jpg")
     }

     seth1(Math.floor(data.main.temp)+'℃')
     setname(data.name)
     setmain(data.weather[0].main)
     setwind(Math.floor(data.wind.speed)+" Km/H")
     setdes(data.weather[0].description)
     sethumd(data.main.humidity)
     setfeel(Math.floor(data.main.feels_like)+"℃")

     }catch(error){
        alert(error)
     }
  }

  useEffect(()=>{
        get()
        
  },[])
  return (
    <>
      <div className='body'>
        <motion.img key={img} initial={{opacity:0.7}}
           animate={{opacity:1}}
           transition={{duration:1,ease:"easeInOut"}}
           viewport={{once:false,amount:0.3}}
        className="img"
         src={img}></motion.img>
           <div className='main-box'>

               <form className='search-bar' onSubmit={(e)=>{
                submit(e)
                get()
                setInput("")
               }}>
                   <input value={input} onChange={(e)=>setInput(e.target.value)}placeholder='search city'></input>
                   <button><img src='assets/search.png'></img></button>
               </form>

               <div className='main-text'>

                    <div className='logo'>

                        <div className='icon'>
                          <h1 id='name'>{name}</h1>
                           <motion.img key={img} initial={{opacity:0.5,y:10}}
                             animate={{opacity:1,y:0}}
                             transition={{duration:0.8,ease:"easeInOut"}}
                             viewport={{once:false,amount:0.3}} src={icon}></motion.img>
                           <h1 id='main'>{main}</h1>
                        </div>

                         <div className='temp'>
                          
                            <h1 id='temp'>{h1}</h1>
                            <h1 id='des'>{des}</h1>
                         </div>
                    </div>
                     
                      <div className='details'>

                        <div className='max'>
                           <h1>Feels Like<img src='/assets/Feels-like.png'></img></h1>
                           <p>{feel}</p>
                         </div>
                         
                         <div className='wind'>
                           <h1>Wind<img src='/assets/wind.png'></img></h1>
                           <p>{wind}</p>                           
                         </div>
                        
                         <div className='humd'>
                           <h1>Humidity <img src='/assets/humidity.png'></img></h1>
                           <p>{humd}</p>
                          </div>

                          
                    </div>
                   
               </div>

           </div> 
      </div>
    </>
  );
}

export default App;
