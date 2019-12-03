let express = require('express')
let database = require('../../database')

let router = express.Router()

router.get('/', (req, res)=>{
	res.redirect('/weapon/all')
})

// C

// R

router.get('/all', (req, res)=>{
	const getAllWeapons = `
	SELECT weapons.name AS "Weapons", classes.name AS "Class Name", characters.name AS "Character Name" FROM weapons
	JOIN classes_weapons ON weapon_id = weapons.oid
	JOIN classes ON class_id = classes.oid
	JOIN characters ON class_name_id = classes.oid
	`
	database.all(getAllWeapons, (error, results)=>{
		if(error){
			console.log('get all characters failed')
			res.sendStatus(500)
		}else{
			res.status(200).json(results)
		}
	})
})

router.get('/:id', (req, res)=>{
	const weaponId = req.params.id
	const getOneWeapon = `
	SELECT weapons.name AS "Weapons", classes.name AS "Class Name", characters.name AS "Character Name" FROM weapons
	JOIN classes_weapons ON weapon_id = weapons.oid
	JOIN classes ON class_id = classes.oid
	JOIN characters ON class_name_id = classes.oid
	WHERE weapons.oid = ${weaponId}
	`
	database.all(getOneWeapon, (error, results)=>{
		if(error){
			console.log(`get weapon at ${weaponId} failed`)
			res.sendStatus(500)
		}else{
			res.status(200).json(results)
		}
	})
})

// U

router.put('/update/:id', (req, res)=>{
	const weaponId = req.params.id
	const updateOneWeapon = `UPDATE weapons SET name = ? where weapons.oid = ${weaponId}`
	database.run(updateOneWeapon, [req.body.name], (error)=>{
		if(error){
			console.log(`update weapon at ${weaponId} failed`)
			res.sendStatus(500)
		}else{
			console.log(`updated ${weaponId}`)
			res.sendStatus(200)
		}
	})
})

// D

router.delete('/delete/:id', (req, res)=>{
	const weaponId = req.params.id
	const deleteOneWeapon = `DELETE FROM weapons WHERE weapons.oid = ${weaponId}`
	database.run(deleteOneWeapon, (error)=>{
		if(error){
			console.log(`delete class at ${weaponId} failed`)
			res.sendStatus(500)
		}else{
			console.log(`deleted ${weaponId}`)
			res.sendStatus(200)
		}
	})
})

module.exports = router