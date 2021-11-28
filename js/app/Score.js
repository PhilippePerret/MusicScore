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
get systemeValue(){
  var v = document.querySelector('#systeme').value
  if ( v == 'xxx' ) v = parseInt(document.querySelector('#systeme_other'),10)
  return v
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
  const menuTune = document.querySelector('#tune')
  const menuTuneAlteration = document.querySelector('#tune_alteration')
  const menuTuneNature = document.querySelector('#tune_nature')
  const t = menuTune.value + menuTuneAlteration.value + menuTuneNature.value
  return t
}

get metrique(){
  var m = document.querySelector('#metrique').value
  if ( m == '' ) return null 
  if ( m == 'xxx' ) m = document.querySelector('#other_metrique').value
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
  var m = document.querySelector('#proxmity')
  return m == '' ? null : m
}

/**
 * @return le code {String} final
 * 
 */
get codeFinal(){
  var c = []
  this.page && c.push('-- page ' + this.page)
  this.isPiano  && c.push('--piano')
  this.cbStems.checked  && c.push('--stem')
  this.cbBarre.checked  && c.push('--barres')
  c.push('--tune ' + this.tune)
  this.metrique && c.push('--time ' + this.metrique)
  this.mesure && c.push('--mesure ' + this.mesure)
  c.push(MesureCode.getFullCode())
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
    this.loopUpdates()
  }
}
/**
 * La boucle qui actualise l'image toutes les secondes
 * 
 */
loopUpdates(){
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
