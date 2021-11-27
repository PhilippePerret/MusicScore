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

get cbPiano(){return document.querySelector('#cb_piano')}
get cbStems(){return document.querySelector('#cb_stems')}
get cbBarre(){return document.querySelector('#cb_barre')}

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
  if ( m == 'xxx' ) m = document.querySelector('#other_metrique').value
  return m
}
/**
 * Pour finaliser le code
 * 
 */
get codeFinal(){
  var c = []
  this.cbPiano.checked  && c.push('--piano')
  this.cbStems.checked  && c.push('--stem')
  this.cbBarre.checked  && c.push('--barres')
  c.push('--tune ' + this.tune)
  c.push('--rythme ' + this.metrique)
  c.push(this.champCodeInteractif.value)
  c = c.join("\n")
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
