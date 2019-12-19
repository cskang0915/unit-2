let express = require('express')
let database = require('../../database')

let router = express.Router()

router.get('/', (req, res)=>{
	res.redirect('/api/character/get/all')
})

// C

router.post('/create/new', (req, res)=>{
	const newCharacterValues = [...Object.values(req.body)]
	const createNewCharacter = `INSERT INTO characters VALUES (?, ?)`
	database.run(createNewCharacter, newCharacterValues, (error)=>{
		if(error){
			console.log('adding new character failed')
			res.sendStatus(500)
		}else{
			console.log(`added a new character`)
			res.sendStatus(200)
		}
	})
})

// R

router.get('/get/all', (req, res)=>{
	const getAllCharacters = `
	SELECT characters.character_name, classes.class_name FROM characters
	JOIN classes ON class_name_id = classes.oid
	`
	database.all(getAllCharacters, (error, results)=>{
		if(error){
			console.log('get all characters failed')
			res.sendStatus(500)
		}else{
			res.status(200).json(results)
		}
	})
})

router.get('/get/:id', (req, res)=>{
	const characterId = req.params.id
	const getOneCharacter = `
	SELECT characters.character_name, classes.class_name FROM characters
	JOIN classes ON class_name_id = classes.oid
	WHERE characters.oid = ${characterId}
	`
	database.all(getOneCharacter, (error, results)=>{
		if(error){
			console.log(`get character at ${characterId} failed`)
			res.sendStatus(500)
		}else{
			res.status(200).json(results)
		}
	})
})

// U

router.put('/update/:id', (req, res)=>{
	const characterId = req.params.id
	const characterUpdateKeys = Object.keys(req.body).map((key)=>{
		return `${key} = ?`
	})
	const characterUpdateValues = [...Object.values(req.body), characterId]
	const updateOneCharacter = `UPDATE characters SET ${characterUpdateKeys.join(', ')} WHERE characters.oid = ?`
	console.log(characterUpdateKeys)
	console.log(characterUpdateValues)
	console.log(updateOneCharacter)
	database.run(updateOneCharacter, characterUpdateValues, (error)=>{
		if(error){
			console.log(`update character at ${characterId} failed`)
			res.sendStatus(500)
		}else{
			console.log(`updated ${characterId}`)
			res.sendStatus(200)
		}
	})
})

// D

router.delete('/delete/:id', (req, res)=>{
	const characterId = req.params.id
	const deleteOneCharacter = `DELETE FROM characters WHERE characters.oid = ${characterId}`
	database.run(deleteOneCharacter, (error)=>{
		if(error){
			console.log(`delete character at ${characterId} failed`)
			res.sendStatus(500)
		}else{
			console.log(`deleted ${characterId}`)
			res.sendStatus(200)
		}
	})
})

module.exports = router