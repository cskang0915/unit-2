let express = require('express')
let charactersRouter = require('./routers/characters/router')
let classesRouter = require('./routers/classes/router')
let weaponsRouter = require('./routers/weapons/router')

let app = express();

app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(express.json())
app.use('/api/character', charactersRouter)
app.use('/api/class', classesRouter)
app.use('/api/weapon', weaponsRouter)

// app.get('/', (req, res, next)=>{

// })

app.listen(9000)