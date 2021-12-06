'use strict';
/**
 * Class Staff
 * -----------
 * Pour la gestion des portées (mais seulement au niveau des options,
 * pour définir leur nom, leur clé, etc.). Ça n'intervient pas 
 * vraiment pour les données du code (sauf pour en obtenir les data
 * et ce genre de choses).
 * 
 */
class Staff {

/**
 * Retourne l'instance Staff d'identifiant +staff_id+
 * 
 */
static get(staff_id){
  if ( undefined == this.table ) this.table = {}
  if ( undefined == this.table[staff_id]) Object.assign(this.table, {[staff_id]: new Staff(staff_id)})
  return this.table[staff_id]    
}

/**
 * Méthode pour effacer les portées, hormis la première (il doit 
 * toujours rester une portée)
 */
static removeStaves(){
  var trportee
    , istaff = 1 // pour commencer à 2
  while ( true ){
    trportee = document.querySelector(`#tr_staff-${++istaff}`)
    if ( trportee ) {
      trportee.remove()
      if ( this.table) { delete this.table[istaff] }
    } else {
      break
    }
  }
}

static buildStavesInOptions(){
  let nombrePortees = Score.nombrePortees
  console.info("[setStavesData] Nombre de portées définies : %i", nombrePortees)
  var currentStaff, lastStaff;
  for(var istaff = 0; istaff < nombrePortees; ++istaff){
    if ( istaff > 0 ) {
      // 
      // Création et réglage d'une nouvelle staff (en options)
      // 
      const newStaff = this.get(1+istaff)
      newStaff.buildInOptions()
    }
  }
  this.firstStaff.setValues()
}

/**
 * Retourne la donnée (name et key) pour la portée +staff_id+
 * 
 */
static dataForStaff(staff_id){
  // console.log("-> dataForStaff(%i)", staff_id, this.data)
  const idx = staff_id - 1
  return {id:staff_id, name:this.data.names[idx], key:this.data.keys[idx]}
}
/**
 * Retourne les données récupérées dans les options
 * 
 */
static get data(){
  return this._data || (this._data = this.getData())
}
static getData(){
  // console.log("options initiales dans Staff.getData : ", Options.data_ini)
  const dataIni = Options.data_ini || {}
  let keys  = dataIni.staves_keys
  keys = keys ? keys.split(', ') : []
  let names = dataIni.staves_names
  names = names ? names.split(', ') : []
  return {names:names, keys: keys}
}

static get firstStaff(){return this._firststaff || (this._firststaff = this.get(1))}

static reset(){
  delete this._data
  this._data = null
}

// --- INSTANCE ---

constructor(id){
  this.id = id
}

buildInOptions(){
  this._node  = this.constructor.firstStaff.node.cloneNode(true)
  const prevStaff = Staff.get(this.id - 1)
  prevStaff.node.parentNode.insertBefore(this.node, prevStaff.node.nextSibling)
  this.node.querySelector('.staff_number').innerHTML = this.id
  this.node.id = `tr_staff-${this.id}`
  this.setValues()
}

setValues(){
  this.data = Staff.dataForStaff(this.id)
  // 
  // La clé
  // 
  this.data.key && this.setKeyValue(this.data.key)
  // 
  // Le nom
  // 
  this.data.name && this.setNameValue(this.data.name)
}
getValues(){
  return {id:this.id, key:this.getKeyValue(), name:this.getNameValue()}
}

setKeyValue(value){
  this.keyMenu.value = value
}
getKeyValue(){
  return this.keyMenu.value
}

setNameValue(value){
  this.nameField.value = value
}
getNameValue(){
  var n = this.nameField.value.trim()
  if (n == '') return
  return n
}

get key(){return this.getKeyValue()}
get name(){return this.getNameValue()}

get keyMenu(){return this._keymenu || (this._keymenu = this.node.querySelector('.staff_key'))}
get nameField(){return this._namefield || (this._namefield = this.node.querySelector('.staff_name'))}
get node(){return this._node || (this._node = document.querySelector(`#tr_staff-${this.id}`))}
}
