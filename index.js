let express = require('express')
let charactersRouter = require('./routers/characters/router')
let classesRouter = require('./routers/classes/router')
let weaponsRouter = require('./routers/weapons/router')

let app = express();

app.use(express.json())
app.use('/character', charactersRouter)
app.use('/class', classesRouter)
app.use('/weapon', weaponsRouter)

// app.get('/', (req, res, next)=>{

// })

app.listen(8000)