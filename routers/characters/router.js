let express = require('express')
let database = require('../../database')

let router = express.Router()

router.get('/', (req, res)=>{
	res.redirect('/character/all')
})

// C

router.post('/new', (req, res)=>{
	const newCharacter = req.body
	const createNewCharacter = `INSERT INTO characters VALUES (?, ?)`
	database.run(createNewCharacter, [newCharacter.name, newCharacter.class_name_id], (error)=>{
		if(error){
			console.log('adding new character failed')
			res.sendStatus(500)
		}else{
			console.log(`added ${newCharacter}`)
			res.sendStatus(200)
		}
	})
})

// R

router.get('/all', (req, res)=>{
	const getAllCharacters = `
	SELECT characters.name AS "Character Name", classes.name AS "Class" FROM characters
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

router.get('/:id', (req, res)=>{
	const characterId = req.params.id
	const getOneCharacter = `
	SELECT characters.name AS "Character Name", classes.name AS "Class" FROM characters
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
	const updateOneCharacter = `UPDATE characters SET class_name_id = ? WHERE characters.oid = ${characterId}`
	database.run(updateOneCharacter, [req.body.class_name_id], (error)=>{
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