let express = require('express')
let database = require('../../database')

let router = express.Router()

router.get('/', (req, res)=>{
	res.redirect('/api/weapon/get/all')
})

// C

router.post('/create/new', (req, res)=>{
	const newWeaponValues = [...Object.values(req.body)]
	const createNewWeapon = `INSERT INTO weapons VALUES (? ? ? ?)`
	database.run(createNewWeapon, newWeaponValues, (error)=>{
		if(error){
			console.log('adding new weapon failed')
			res.sendStatus(500)
		}else{
			console.log('added a new weapon')
			res.sendStatus(200)
		}
	})
})

// R

router.get('/get/all', (req, res)=>{
	const getAllWeapons = `
	SELECT weapons.weapon_name, weapons.isRanged, weapons.isMelee, weapons.isMagic, classes.class_name, characters.character_name FROM weapons
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

router.get('/get/:id', (req, res)=>{
	const weaponId = req.params.id
	const getOneWeapon = `
	SELECT weapons.weapon_name, weapons.isRanged, weapons.isMelee, weapons.isMagic, classes.class_name, characters.character_name FROM weapons
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
	const weaponUpdateKeys = Object.keys(req.body).map((key)=>{
		return `${key} = ?`
	})
	const weaponUpdateValues = [...Object.values(req.body), weaponId]
	const updateOneWeapon = `UPDATE weapons SET ${weaponUpdateKeys.join(', ')} where weapons.oid = ?`
	database.run(updateOneWeapon, weaponUpdateValues, (error)=>{
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