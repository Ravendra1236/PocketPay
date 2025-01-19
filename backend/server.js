const express = require("express") 
const port = 3000 ; 
const app = express() ;
const cors = require("cors") ;
const mainRouter = require("./Routes/index")
require("./db")

app.use(cors()) ;
app.use(express.json()) ;



app.use("/api/v1" , mainRouter) ;

app.listen(port , ()=>{
    console.log("Server is running at port" ,port);
})