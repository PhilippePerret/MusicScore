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

/**
 * Retourne le nombre de portées (par système)
 * 
 * Par exemple, si c'est un piano, on retourne 2, si c'est un trio
 * on retourne 3.
 * 
 */
get nombrePortees(){
  return this._stavescount || (this._stavescount = this.countStaves())
}
set nombrePortees(v){ this._stavescount = v }
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
    return parseInt(this.system,10)
  }
}

get isMono    (){return this.systeme == 'mono'}
get isPiano   (){return this.systeme == 'piano'}
get isDuo     (){return this.systeme == 'duo'}
get isTrio    (){return this.systeme == 'trio'}
get isQuatuor (){return this.systeme == 'quatuor'}

get tune          (){ return this.getOption('tune')}
get metrique      (){ return this.getOption('time')}
get mesure        (){ return this.getOption('mesure')}
get page          (){ return this.getOption('page') }
get proximity     (){ return this.getOption('proximity')}
get staves_vspace (){ return this.getOption('staves_vspace')}
get systeme   (){ 
  return this._systeme || (this._systeme = this.getOption('systeme')) 
}

getOption(key){
  return Options.getProperty(key)
}
/**
 * = main =
 * 
 * Grand méthode principale qui construit le code complet de la
 * partition, avec les options et tous les détails.
 * C'est par exemple ce code qui est envoyé pour la fabrication de
 * la partition.
 * 
 * @return le code {String} final
 * 
 * @param params {Hash} 
 *    :from     Depuis cette mesure (toujours défini, 1 par défaut)
 *    :to       Jusqu'à cette mesure (idem)
 */
getCodeFinal(params){
  var c = []
  this._systeme = null
  this.page       && c.push('--page ' + this.page)
  if ( this.isPiano ) {
    c.push('--piano')
  } else {
    // TODO : Il faudra ici traiter les autres valeurs
  }
  this.getOption('stems')  || c.push('--no_stem')
  this.getOption('barre')  && c.push('--barres')
  this.staves_vspace  && c.push('--staves_vspace ' + this.staves_vspace)
  this.tune           && c.push('--tune ' + this.tune)
  this.metrique       && c.push('--time ' + this.metrique)
  this.mesure         && c.push('--mesure ' + this.mesure)
  this.proximity      && c.push('--proximity ' + this.proximity)
  // 
  // On prend toutes les notes
  // 
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
