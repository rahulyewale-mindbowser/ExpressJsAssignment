const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/user',require('./routes/api/Users'))

app.listen(PORT,(req,res)=>{
    console.log(`Server is Running on Port ${PORT}`);
})