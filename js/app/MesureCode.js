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
 * @return {String} Le code complet
 * 
 */
static getFullCode(){
  var c = []
  for(var xportee = 0; xportee < Score.stavesCount; ++xportee){
    c.push([])
    this.each(mes => {
      var code = mes.porteeCode(parseInt(xportee,10) + 1).trim()
      if ( code == '' ) return ;
      c[xportee].push(code)
    })
    c[xportee] = c[xportee].join(' | ')
  }
  return c.join("\n")
}

/**
 * Méthode "tournant" la méthode +method+ sur chaque mesure-code
 * 
 * Rappel : une "mesure-code", c'est un ensemble de portées par 
 * système
 * 
 * #exemple
 *    MesureCode.each(mes => console.log(mes.code))
 * 
 */
static each(method){
  if ( this.count == 0 ) return
  this.table_mesures.forEach(mesure => method(mesure))
}

/**
 * Méthode appelée par le bouton "+" pour créer une nouvelle 
 * mesure-code. Ou quand on doit recréer une partition
 */
static createNew(data){
  const mesure = new this(this.getNextId());
  if (data) mesure.data = data
  mesure.build()
  this.add(mesure)
}

/**
 * Pour ajouter la mesure-code +mesure+ à la liste Array des mesures
 *
 */
static add(mesure){
  if (!this.table_mesures) this.table_mesures = []
  this.table_mesures.push(mesure)
}

/**
 * Retourne le nombre de mesures
 * 
 */
static count(){
  if (!this.lastId) this.lastId = 0;
  return this.lastId
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
 * Retourne le code de la portée +xportee+ de cette mesure-code
 * 
 */
porteeCode(xportee) {
  xportee = xportee || 1
  const val = this.obj.querySelector('.mesure_code.portee'+xportee).value
  console.info("Code de la portée " + xportee + " du système " + this.id, val)
  return val
}

/**
 * Méthode de construction de la mesure-code
 */
build(){
  const o = DCreate('DIV', {class:'mesure_code'})
  /**
   * 
   * On ajoute autant de systèmes qu'il en faut
   * 
   */
  for (var isys = 0; isys < Score.stavesCount; ++isys) {
    o.appendChild(DCreate('INPUT', {type:'text', class:'mesure_code portee' + (isys + 1)}))
  }
  this.obj = o

  this.constructor.container.appendChild(this.obj)
}

}
