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
    console.log("Traitement de la clé %s", keyOption)
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

/**
 * Pour régler la tonalité
 * 
 */
setTune(tune){
  var [note,alt,nature] = tune.split('')
  if ( alt == 'm' ) {[nature, alt] = ['m','none']}
  this.menuTuneNote.value = note
  // console.log("menuTuneAlt = , valeur", this.menuTuneAlt, alt)
  if ( !alt || alt == '' ){
    this.menuTuneAlt.selectedIndex = 0
  } else {
    this.menuTuneAlt.value  = nature
  }
  if ( !nature || nature == '' ){
    this.menuTuneNat.selectedIndex = 0
  } else {
    this.menuTuneNat.value  = nature
  }
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
  if ( this.isPiano ) {
    return 2
  } else if ( this.isTrio ) {
    return 3
  } else if ( this.isQuatuor ) {
    return 4
  } else if ( this.isMono ) {
    return 1
  } else {
    return systemeValue
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
    case 1: v = 'mono'; break
    case 2: v = 'piano'; break
    case 3: v = 'trio'; break
    case 4: v = 'quatuor'; break
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
 * @return {String} La tonalité
 */
get tune(){
  return this.menuTuneNote.value + this.menuTuneAlt.value + this.menuTuneNat.value
}
get menuTuneNote(){return document.querySelector('select#tune_note')}
get menuTuneAlt (){return document.querySelector('select#tune_alteration')}
get menuTuneNat (){return document.querySelector('select#tune_nature')}

get metrique(){
  var m = document.querySelector('select#time').value
  if ( m == '' ) return null 
  if ( m == 'xxx' ) m = document.querySelector('#other_time').value
  return m
}

get mesure(){
  var m = document.querySelector('#first_mesure').value
  return m == '' ? null : m
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
  this.page && c.push('-- page ' + this.page)
  this.isPiano  && c.push('--piano')
  this.cbStems.checked  && c.push('--stem')
  this.cbBarre.checked  && c.push('--barres')
  c.push('--tune ' + this.tune)
  this.metrique && c.push('--time ' + this.metrique)
  this.mesure && c.push('--mesure ' + this.mesure)
  this.proximity && c.push('--proximity ' + this.proximity)
  c.push(MesureCode.getFullCode(params))
  c = c.join("\n")
  console.log("Le code complet : ", c)
  return c
}

/**
 * Pour forcer l'actualisation de l'image de la partition
 * 
 */
update(){
  $('img#score').attr('src', "score_building/code/visu.svg?"+(new Date().getTime()))
}

/**
 * Pour mettre en route et arrêter la boucle d'actualisation de
 * l'image.
 * 
 */
toggleLoopUpdate(){
  if ( this.isRunning ) {
    this.stopLoopUpdate()
  } else {
    this.loopUpdate()
  }
}
/**
 * La boucle qui actualise l'image toutes les secondes
 * 
 */
loopUpdate(){
  console.info("⏳ Activation de la boucle d'actualisation de la partition")
  this.timer = setInterval(this.update.bind(this), 1000)
  this.isRunning = true
  this.setButtonToggleName('Stopper')
}

/**
 * Pour stopper la boucle des actualisation
 * 
 */
stopLoopUpdate(){
  console.info("⌛️ Désactivation de la boucle d'actualisation de la partition")
  if ( this.timer ) {
    clearInterval(this.timer);
    delete this.timer
    this.timer = null
  } 
  this.isRunning = false
  this.setButtonToggleName('Lancer')
}

setButtonToggleName(name){
  this.bntToggle.text(name + ' la boucle d’actualisation de la partition')
}

/**
 * Le champ où l'on tape le code
 */
get champCodeInteractif(){
  return this._codefield || (this._codefield = document.querySelector('#music_score_code'))
}
get bntToggle(){
  return this._btntog || (this._btntog = $('#btn_toggle_loop_update'))
}

}//ScoreClass

const Score = new ScoreClass()
