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
 * Réglage des options (du score)
 * 
 */
setOptions(options){
  Object.keys(options).forEach(keyOption => {
    // console.log("Traitement de l'option %s", keyOption)
    const valOption = options[keyOption]
    // 
    // On ne fait rien si l'option a la valeur null ou indéfinie
    if ( valOption === null || valOption === undefined ) return 
    // 
    // Le traitement peut différer en fonction des options
    // Il y a ces types :
    //  - les menus qui attendent une valeur
    //  - les case à cocher qui sont définies par true ou false
    //  - les valeurs complexes qui tiennent sur plusieurs menus,
    //    comme la tonalité par exemple (tune).
    // 
    switch(keyOption){
      case 'tune':
        // 
        // Traitement complexe de la tonalité
        // 
        this.setTune(valOption)
        break
      default:
        // 
        // Traitement d'une option "normale"
        // 
        const objet = document.querySelector('#'+keyOption)
        if ( 'string' == typeof valOption ) {
          objet.value = valOption
        } else {
          objet.checked = valOption
        }
    }
  })
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


/**
 * Pour régler la tonalité
 * 
 */
setTune(tune){
  var [note,alt] = tune.split('')
  this.menuTuneNote.value = note
  this.menuTuneAlt.value  = alt
}
/**
 * @return {String} La tonalité
 */
get tune(){
  return this.menuTuneNote.value + this.menuTuneAlt.value
}
get menuTuneNote(){return document.querySelector('select#tune_note')}
get menuTuneAlt (){return document.querySelector('select#tune_alteration')}

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
  this.cbStems.checked  && c.push('--stem')
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
