'use strict';
/**
 * Class ScoreClass
 * 
 * Pour gérer l'image de la partition
 * 
 * Utiliser la constante 'Score' pour maniupler l'image.
 * 
 */

class ScoreClass {

/**
 * Pour appliquer les options par défaut
 * 
 */
resetOptions(){
  Options.applique(CONFIG.default_options)
}

/**
 * Réglage des options (du score et générales)
 * 
 */
setOptions(options){
  Options.applique(options)
}

get cbStems(){return document.querySelector('#cb_stems')}
get cbBarre(){return document.querySelector('#cb_barre')}


/**
 * Retourne le nombre de portées (par système)
 * 
 * Par exemple, si c'est un piano, on retourne 2, si c'est un trio
 * on retourne 3.
 * 
 */
get stavesCount(){
  return this._stavescount || (this._stavescount = this.countStaves())
}
countStaves(){
  if ( this.isPiano ) {
    return 2
  } else if ( this.isTrio ) {
    return 3
  } else if ( this.isQuatuor ) {
    return 4
  } else if ( this.isMono ) {
    return 1
  } else {
    return parseInt(this.systemeValue,10)
  }
}
get menuSysteme(){
  return this._menusys || (this._menusys = document.querySelector('#systeme'))
}
get systemeValue(){
  var v = this.menuSysteme.value
  if ( v == 'xxx' ) v = parseInt(document.querySelector('#systeme_other'),10)
  return v
}
set systemeValue(v){
  var ov = ""
  switch(v){
    case 1: v = 'mono'    ; break
    case 2: v = 'piano'   ; break
    case 3: v = 'trio'    ; break
    case 4: v = 'quatuor' ; break
    default:
      v = 'xxx'
      ov = v
  }
  this.menuSysteme.value = v
  document.querySelector('#systeme_other').value = ov
}
get isMono    (){return this.systemeValue == 'mono'}
get isPiano   (){return this.systemeValue == 'piano'}
get isDuo     (){return this.systemeValue == 'duo'}
get isTrio    (){return this.systemeValue == 'trio'}
get isQuatuor (){return this.systemeValue == 'quatuor'}


get metrique(){
  var m = document.querySelector('select#time').value
  if ( m == '' ) return null 
  if ( m == 'xxx' ) m = document.querySelector('#other_time').value
  return m
}

get mesure(){
  var m = document.querySelector('#mesure').value
  return m == '' ? null : m
}
setMesure(v){
  document.querySelector('#mesure').value = v
}

get page(){
  var m = document.querySelector('#page').value
  return m == '' ? null : m
}

get proximity(){
  var m = document.querySelector('#proximity').value
  return m == '' ? null : m
}

/**
 * @return le code {String} final
 * 
 * @param params {Hash} 
 *    :from     Depuis cette mesure (toujours défini, 1 par défaut)
 *    :to       Jusqu'à cette mesure (idem)
 */
getCodeFinal(params){
  var c = []
  this.page       && c.push('-- page ' + this.page)
  this.isPiano    && c.push('--piano')
  this.cbStems.checked  || c.push('--no_stem')
  this.cbBarre.checked  && c.push('--barres')
  c.push('--tune ' + this.tune)
  this.metrique   && c.push('--time ' + this.metrique)
  this.mesure     && c.push('--mesure ' + this.mesure)
  this.proximity  && c.push('--proximity ' + this.proximity)
  c.push(MesureCode.getFullCode(params))
  c = c.join("\n")
  // console.log("Le code complet : ", c)
  return c
}

/**
 * Pour forcer l'actualisation de l'image de la partition
 * 
 */
update(){
  $('img#score').attr('src', "score_building/code/visu.svg?"+(new Date().getTime()))
}

}//ScoreClass

const Score = new ScoreClass()
