import "./Die.css"

export default function Die(prop){
    const style = {
        backgroundColor: prop.isHeld ? "#59E391" : "white"
    }
    return(
        <div style = {style} className="dice" onClick={prop.hold}>
            <h3>{prop.value}</h3>
        </div>
    )
}