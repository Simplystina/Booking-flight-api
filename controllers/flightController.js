const {v4: uuid} = require("uuid") 
const flights = require("../models/Flight").flightModel

exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}

//get all flights
exports.getFlights = async(req, res)=>{
    try {
        const flight = flights
        res.status(200).json({
            message:'All flights',
            flight
        }) 
        
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}

//get single flight
exports.getFlight = async(req, res)=>{
     try {
        let id = req.params.id
        const flight = flights.find((flight)=> flight.id === id)
        console.log('flight',flight)
        message = flight? "flight found" : "flight doesn't exist"
        res.status(200).json({
            message: message,
            flight
        }) 
     } catch (error) {
        res.status(500).json({message:error.message})
     }
}


//create new flights
exports.createFlight = async (req, res)=>{
    
    try {
        console.log(req.body)
        const flight = await req.body
        const id = flights.length=== 0 ? 1 :flights.length+1
        flight.id = id.toString()
        flight.time = new Date().toLocaleTimeString()
        flight.date = new Date().toLocaleDateString()
       
        flights.push(flight)
        res.status(201).json({
            message: 'New flight created',
            flight
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//update/edit flight
exports.updateFlight = async (req,res)=>{
    try {
        let id = req.params.id
        const flight = flights.find((flight)=> flight.id === id)
       
        const {title, price} = await req.body
        if (!flight) {
            res.status(200).json({
                message: "Flight doesn't exist",
                
            })
           return
        } 
        flight.title = title
        flight.price = price
        res.status(200).json({
            message: 'Flight updated',
            flight
        })
         
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


//delete flight
exports.deleteFlight = async (req,res)=>{
    try {
        let id = req.params.id
        const flight = flights.find((flight)=> flight.id === id)
       
        if (!flight) {
            res.status(200).json({
                message: "Flight doesn't exist",
                
            })
           return
        } 
        flights.splice(flights.indexOf(flight),1)
        
        res.status(200).json({
            message: 'Flight Deleted',
            flight
        })
         
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}