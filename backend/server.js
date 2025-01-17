const express = require("express") 
const port = 3000 ; 
const app = express() ;
const cors = require("cors") ;
const mainRouter = require("./Routes/index")
const userRouter = require("./Routes/userRouter")

app.use(cors()) ;
app.use(express.json()) ;


app.use("/api/v1" , mainRouter) ;
app.use("/api/v1/user" , userRouter)

app.listen(port , ()=>{
    console.log("Server is running at port" ,port);
})