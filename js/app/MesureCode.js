'use strict';
/**
 * class MesureCode
 * -----------------
 * Pour les input-text qui contiennent chaque mesure de code.
 * 
 * Principe :
 *  - une mesure-code contient toujours ses deux lignes
 * 
 */

class MesureCode {

/**
 * Méthode appelée par le bouton "+" pour créer une nouvelle 
 * mesure-code.
 */
static createNew(){
  const mesure = new this(this.getNextId());
  mesure.build()  
}

static getNextId(){
  if (!this.lastId) this.lastId = 0;
  return ++ this.lastId;
}

static removeCurrent(){
  console.info("Je dois apprendre à supprimer la mesure-code courante.")
}


static get container(){
  return this._container || (this._container = document.querySelector('#mesures_code'))
}

// --- INSTANCE ---

constructor(id, notes){
  this.id = id
  this.notes = notes
}

/**
 * Méthode de construction de la mesure-code
 */
build(){
  const o = DCreate('DIV', {class:'mesure_code'})
  o.appendChild(DCreate('INPUT', {type:'text', class:'mesure_code main_droite'}))
  o.appendChild(DCreate('INPUT', {type:'text', class:'mesure_code main_gauche'}))
  this.obj = o

  this.constructor.container.appendChild(this.obj)
}

}
