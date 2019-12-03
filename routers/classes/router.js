let express = require('express')
let database = require('../../database')

let router = express.Router()

router.get('/', (req, res)=>{
	res.redirect('/class/all')
})

// C

router.post('/new', (req, res)=>{
	const newClass = req.body
	const createNewClass = `INSERT INTO classes VALUES (?)`
	const weaponId = req.body.weapon_id
	database.run(createNewClass, [newClass.name], (error)=>{
		if(error){
			console.log('adding new class failed')
			res.sendStatus(500)
		}else{
			console.log(`added ${newClass}`)
			const createNewClassWeapon = `INSERT INTO classes_weapons VALUES (?, ?)`
			for(let i = 0; i < weaponId.length; i++){
				database.run(createNewClassWeapon, [newClass.class_id, weaponId[i]], (error)=>{
					if(error){
						console.log(`adding new class_weapon failed`)
						res.sendStatus(500)
					}else{
						console.log(`added new class_weapon`)
						// res.sendStatus(200)
					}
				})
			}
			console.log('test')
			res.sendStatus(200)
		}
	})
})

// repeat classes
// if repeated then the name overwrites the req.body

// R

router.get('/all', (req, res)=>{
	const getAllClasses = `
	SELECT classes.name AS "Class Name", weapons.name AS "Weapons" FROM classes
	JOIN classes_weapons ON class_id = classes.oid
	JOIN weapons ON weapon_id = weapons.oid
	`
	database.all(getAllClasses, (error, results)=>{
		if(error){
			console.log('get all classes failed')
			res.sendStatus(500)
		}else{
			res.status(200).json(results)
		}
	})
})

router.get('/:id', (req, res)=>{
	const classId = req.params.id
	const getOneClass = `
	SELECT classes.name AS "Class Name", weapons.name AS "Weapons" from classes
	JOIN classes_weapons ON class_id = classes.oid
	JOIN weapons ON weapon_id = weapons.oid
	WHERE classes.oid = ${classId}
	`
	database.all(getOneClass, (error, results)=>{
		if(error){
			console.log(`get class at ${classId} failed`)
			res.sendStatus(500)
		}else{
			res.status(200).json(results)
		}
	})
})

// U

router.put('/update/:id', (req, res)=>{
	const classId = req.params.id
	const updateOneClass = `UPDATE classes SET name = ? WHERE classes.oid = ${classId}`
	database.run(updateOneClass, [req.body.name], (error)=>{
		if(error){
			console.log(`update class at ${classId} failed`)
			res.sendStatus(500)
		}else{
			console.log(`updated ${classId}`)
			res.sendStatus(200)
		}
	})
})

// D

router.delete('/delete/:id', (req, res)=>{
	const classId = req.params.id
	const deleteOneClass = `DELETE FROM classes WHERE classes.oid = ${classId}`
	database.run(deleteOneClass, (error)=>{
		if(error){
			console.log(`delete class at ${classId} failed`)
			res.sendStatus(500)
		}else{
			console.log(`deleted ${classId}`)
			res.sendStatus(200)
		}
	})
})

module.exports = router