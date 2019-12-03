const db = require('./database.js')

const characters_list = [
	{
		name: "Alpha",
		class_name_id: 1
	},
	{
		name: "Beta",
		class_name_id: 2
	},
	{
		name: "Delta",
		class_name_id: 3
	},
	{
		name: "Gamma",
		class_name_id: 4
	}
]
const classes_list = [
	{name: "Knight"},
	{name: "Cleric"},
	{name: "Mage"},
	{name: "Archer"}
]
const weapons_list = [
	{
		name: "sword",
		isRanged: 0,
		isMelee: 1,
		isMagic: 0
	},
	{
		name: "bow",
		isRanged: 1,
		isMelee: 0,
		isMagic: 0
	},
	{
		name: "axe",
		isRanged: 0,
		isMelee: 1,
		isMagic: 0
	},
	{
		name: "spear",
		isRanged: 1,
		isMelee: 1,
		isMagic: 0
	},
	{
		name: "staff",
		isRanged: 1,
		isMelee: 1,
		isMagic: 1
	}
]
const classes_weapons_list = [
	{
		class_id: 1,
		weapon_id: 1
	},
	{
		class_id: 1,
		weapon_id: 3
	},
	{
		class_id: 1,
		weapon_id: 4
	},
	{
		class_id: 2,
		weapon_id: 3
	},
	{
		class_id: 2,
		weapon_id: 5
	},
	{
		class_id: 3,
		weapon_id: 5
	},
	{
		class_id: 4,
		weapon_id: 2
	}
]

db.serialize(()=>{
	const dropTableCharacters = 'DROP TABLE characters'
	const dropTableClasses = 'DROP TABLE classes'
	const dropTableWeapons = 'DROP TABLE weapons'
	const dropTableClassesWeapons = 'DROP TABLE classes_weapons'
	const createTableCharacters = 'CREATE TABLE IF NOT EXISTS characters (name TEXT, class_name_id INTEGER)'
	const createTableClasses = 'CREATE TABLE IF NOT EXISTS classes (name TEXT)'
	const createTableWeapons = 'CREATE TABLE IF NOT EXISTS weapons (name TEXT, isRanged INTEGER, isMelee INTEGER, isMagic INTEGER)'
	const createTableClassesWeapons = 'CREATE TABLE IF NOT EXISTS classes_weapons (class_id INTEGER, weapon_id INTEGER)'
	const deleteCharacters = 'DELETE FROM characters'
	const deleteClasses = 'DELETE FROM classes'
	const deleteWeapons = 'DELETE FROM weapons'
	const deleteClassesWeapons = 'DELETE FROM classes_weapons'
	const insertIntoCharacters = 'INSERT INTO characters (name, class_name_id) VALUES (?, ?)'
	const insertIntoClasses = 'INSERT INTO classes (name) VALUES (?)'
	const insertIntoWeapons = 'INSERT INTO weapons (name, isRanged, isMelee, isMagic) VALUES (?, ?, ?, ?)'
	const insertIntoClassesWeapons = 'INSERT INTO classes_weapons (class_id, weapon_id) VALUES (?, ?)'

	db.run(dropTableCharacters, (error)=>{
		if(error){
			console.log('failed to drop characters table')
		}else{
			console.log('dropped characters table')
		}
	})
	db.run(dropTableClasses, (error)=>{
		if(error){
			console.log('failed to drop classes table')
		}else{
			console.log('dropped classes table')
		}
	})
	db.run(dropTableWeapons, (error)=>{
		if(error){
			console.log('failed to drop weapons table')
		}else{
			console.log('dropped weapons table')
		}
	})
	db.run(dropTableClassesWeapons, (error)=>{
		if(error){
			console.log('failed to drop classes_weapons table')
		}else{
			console.log('dropped classes_weapons table')
		}
	})
	db.run(createTableCharacters, (error)=>{
		if(error){
			console.log('failed to create characters table')
		}else{
			console.log('created characters table')
		}
	})
	db.run(createTableClasses, (error)=>{
		if(error){
			console.log('failed to create classes table')
		}else{
			console.log('created classes table')
		}
	})
	db.run(createTableWeapons, (error)=>{
		if(error){
			console.log('failed to create weapons table')
		}else{
			console.log('created weapons table')
		}
	})
	db.run(createTableClassesWeapons, (error)=>{
		if(error){
			console.log('failed to create classes_weapons table')
		}else{
			console.log('created classes_weapons table')
		}
	})
	db.run(deleteCharacters, (error)=>{
		if(error){
			console.log('failed to delete characters table content')
		}else{
			console.log('characters table content deleted')
		}
	})
	db.run(deleteClasses, (error)=>{
		if(error){
			console.log('failed to delete classes table content')
		}else{
			console.log('classes table content deleted')
		}
	})
	db.run(deleteWeapons, (error)=>{
		if(error){
			console.log('failed to delete weapons table content')
		}else{
			console.log('weapons table content deleted')
		}
	})
	db.run(deleteClassesWeapons, (error)=>{
		if(error){
			console.log('failed to delete classes_weapons table content')
		}else{
			console.log('classes_weapons table content deleted')
		}
	})
	characters_list.forEach((characters)=>{
		db.run(insertIntoCharacters, [characters.name, characters.class_name_id], (error)=>{
			if(error){
				console.log(`failed to insert name:${characters.name}, class_name_id:${characters.class_name_id}`)
			}else{
				console.log(`name:${characters.name}, class_name_id:${characters.class_name_id} added`)
			}
		})
	})
	classes_list.forEach((classes)=>{
		db.run(insertIntoClasses, [classes.name], (error)=>{
			if(error){
				console.log(`failed to insert name:${classes.name}`)
			}else{
				console.log(`name:${classes.name} added`)
			}
		})
	})
	weapons_list.forEach((weapons)=>{
		db.run(insertIntoWeapons, [weapons.name, weapons.isRanged, weapons.isMelee, weapons.isMagic], (error)=>{
			if(error){
				console.log(`failed to insert name:${weapons.name}, isRanged:${weapons.isRanged}, isMelee:${weapons.isMelee}, isMagic:${weapons.isMagic}`)
			}else{
				console.log(`name:${weapons.name}, isRanged:${weapons.isRanged}, isMelee:${weapons.isMelee}, isMagic:${weapons.isMagic} added`)
			}
		})
	})
	classes_weapons_list.forEach((classesWeapons)=>{
		db.run(insertIntoClassesWeapons, [classesWeapons.class_id, classesWeapons.weapon_id], (error)=>{
			if(error){
				console.log(`failed to insert class_id:${classesWeapons.class_id}, weapon_id:${classesWeapons.weapon_id}`)
			}else{
				console.log(`class_id:${classesWeapons.class_id}, weapon_id:${classesWeapons.weapon_id} added`)
			}
		})
	})

})





// db.run(deleteCharacters, (error)=>{
// 	if(error){
// 		console.log('failed to delete characters')
// 	}else{
// 		characters_list.forEach((characters)=>{
// 			db.run(insertIntoCharacters, [characters.name, characters.class_id], (error)=>{
// 				if(error){
// 					console.log(`failed to insert name:${characters.name}, class_id:${characters.class_id}`)
// 				}else{
// 					console.log(`name:${characters.name}, class_id:${characters.class_id} added`)
// 				}
// 			})
// 		})
// 		db.run(deleteClasses, (error)=>{
// 			if(error){
// 				console.log('failed to delete classes')
// 			}else{
// 				classes_list.forEach((classes)=>{
// 					db.run(insertIntoClasses, [classes.name], (error)=>{
// 						if(error){
// 							console.log(`failed to insert name:${classes.name}`)
// 						}else{
// 							console.log(`name:${classes.name} added`)
// 						}
// 					})
// 				})
// 				db.run(deleteWeapons, (error)=>{
// 					if(error){
// 						console.log('failed to delete weapons')
// 					}else{
// 						weapons_list.forEach((weapons)=>{
// 							db.run(insertIntoWeapons, [weapons.name, weapons.isRanged, weapons.isMelee, weapons.isMagic], (error)=>{
// 								if(error){
// 									console.log(`failed to insert name:${weapons.name}, isRanged:${weapons.isRanged}, isMelee:${weapons.isMelee}, isMagic:${weapons.isMagic}`)
// 								}else{
// 									console.log(`name:${weapons.name}, isRanged:${weapons.isRanged}, isMelee:${weapons.isMelee}, isMagic:${weapons.isMagic} added`)
// 								}
// 							})
// 						})
// 						db.run(deleteClassesWeapons, (error)=>{
// 							if(error){
// 								console.log('failed to delete classes_weapons')
// 							}else{
// 								classes_weapons_list.forEach((classesWeapons)=>{
// 									db.run(insertIntoClassesWeapons, [classesWeapons.class_id, classesWeapons.weapon_id], (error)=>{
// 										if(error){
// 											console.log(`failed to insert class_id:${classesWeapons.class_id}, weapon_id:${classesWeapons.weapon_id}`)
// 										}else{
// 											console.log(`class_id:${classesWeapons.class_id}, weapon_id:${classesWeapons.weapon_id} added`)
// 										}
// 									})
// 								})
// 							}
// 						})
// 					}
// 				})
// 			}
// 		})
// 	}
// })