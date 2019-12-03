# SEED

https://imgur.com/a/eBUSXUr

character to class > one to many
class to weapon > many to many

## Characters

>get all characters - /character/ OR /character/all
>get one character - /character/:id


>create new character - /character/new
>body must include name, class_name_id


>update one character - /character/update/:id
>body must include class_name_id


>delete one character - /character/delete/:id


## Classes

>get all classes - /class/ or /class/all<br/>
>get one class - /class/:id


>create new class - /class/new<br/>
>body must include name, class_id, weapon_id in array


>update one class - /class/update/:id<br/>
>body must include name


>delete one class - /class/delete/:id


## Weapons

>get all weapons - /weapon/ OR /weapon/all<br/>
>get one weapon - /weapon/:id


>there is no create for weapons


>update one weapon - /weapon/update/:id<br/>
>body must include isMagic


>delete one weapon - /weapon/delete/:id