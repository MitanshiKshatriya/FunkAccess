require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

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

app.get('/',(req,res)=>res.send('Hello World'))

// port
const port = process.env.PORT || 5000;

// start server
app.listen(port,
	()=>console.log(`listening at ${port}`))



