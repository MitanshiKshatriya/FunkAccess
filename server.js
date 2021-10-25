require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const paymentBRoutes = require("./routes/payment")


//connections
mongoose.connect(process.env.DATABASE,
	{useNewUrlParser: true,
	useUnifiedTopology: true,
	}
)
.then(()=>console.log("DB CONNECTED"))
.catch((err)=>console.log(err))


// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",paymentBRoutes)

app.get('/',(req,res)=>res.send('Hello World'))

// port
const port = process.env.PORT || 5000;

// start server
app.listen(port,
	()=>console.log(`listening at ${port}`))



