import React, { useRef } from "react"
import "./Timer.css"

export default function Timer(props){

    const [count, setCount] = React.useState(0)
    let bestTime = React.useRef([0,0,0])

    React.useEffect(() => {
        bestTime.current = localStorage.getItem('bestTime') ? JSON.parse(localStorage.getItem('bestTime')) : [0,0,0]  
        
        bestTime.current = `${bestTime.current[0]} : ${bestTime.current[1]} : ${bestTime.current[2]}`
        console.log("bt in",bestTime.current)
        let interval
        if(!props.tenzies){
            setCount(0)
            interval = setInterval(() => {
                setCount(prevCount => prevCount + 1)
     
            },1000)
        }

        return () => {
            let bt = localStorage.getItem('bestTime') ? JSON.parse( localStorage.getItem('bestTime')) : [0,0,0]
            let temp = (bt[0] * 1000) + (bt[1] * 100) + (bt[2]) 
            console.log("after json parse", bt)
            let hour = Math.floor((count/3600) % 24)
            let minute = Math.floor((count/60) % 60)
            let second = count % 60
            let time = (hour * 10000) + (minute * 100) + second 
            console.log(time)
            localStorage.setItem("bestTime", JSON.stringify(temp !== 0 && temp < time ?  bt : [hour,minute,second] ))
            clearInterval(interval)
            }

    },[props.tenzies])
    console.log("Best Time: ",bestTime.current)

    return (
        <div className="time-container">
        <div className="best-time"> Best Time: {bestTime.current}</div>
        <div className="timer"> Timer: {Math.floor((count/3600) % 24)}:{Math.floor((count/60) % 60)}:{ count % 60 }</div>
        </div>
    )
}