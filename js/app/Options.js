'use strict';
/**
 * Class OptionsClass
 * 
 * Pour gérer les options et la configuration
 * 
 */

// Constante des types de champ par option
const DATA_OPTIONS = {
    'page':     {type:'select'}
  , 'mesure':   {type:'text'}
  , 'system':   {type:'select'}
  , 'proximity':{type:'select'}
  , 'cb_barre': {type:'checkbox'}
  , 'cb_stems': {type:'checkbox'}
  , 'tune'    : {type:'method', getter:'getTune', setter:'setTune'}
  , 'time'    : {type:'select'}
  , 'auto_update_after_change': {type:'checkbox'}
}

class OptionsClass {

/**
 * Initialiser les options
 * 
 * Ça consiste principalement à :
 *    - définir les propriétés Options.<property>
 *    - initialiser les valeurs aux valeurs par défaut
 * 
 */
init(){
  // 
  // On applique les réglages par défaut
  // 
  this.applique(CONFIG.default_options)
}

/**
 * Réglage d'une propriété
 * 
 */
setProperty(property, value){
  const dataProperty = DATA_OPTIONS[property]
  switch(dataProperty.type) {
    case 'checkbox':
      document.querySelector('#'+property).checked = value
      break
    case 'method':
      this[dataProperty.setter](value)
      break
    default:
      value = value || ''
      console.log("Mise de l'objet #%s à %v", property, value)
      document.querySelector('#'+property).value = value    
  }
}
getProperty(property){
  const dataProperty = DATA_OPTIONS[property]
  switch(dataProperty.type) {
    case 'checkbox':
      return document.querySelector('#'+property).checked
    case 'method':
      return this[dataProperty.getter]()
    default:
      return document.querySelector('#'+property).value    
  }
}

/**
 * Pour appliquer les options +opts+ (par exemple récupérées d'un
 * code fourni par les outils)
 * 
 * @param opts {Hash} Avec en clé l'option et en valeur sa valeur
 */
applique(opts){
  var allOptions = {}
  for(var keyOption in DATA_OPTIONS){
    console.log("Réglage de propriété %s", keyOption)
    const dataOption = DATA_OPTIONS[keyOption]
    if (undefined === opts[keyOption]) continue;
    else {
      console.info("Valeur finale de %s : ", keyOption, opts[keyOption])
      this.setProperty(keyOption, opts[keyOption])
    }
  }
}


/**
 * Pour régler la tonalité
 * 
 */
setTune(tune){
  var [note,alt] = tune.split('')
  this.menuTuneNote.value = note
  this.menuTuneAlt.value  = alt || ''
}
/**
 * @return {String} La tonalité
 */
get getTune(){
  return this.menuTuneNote.value + this.menuTuneAlt.value
}
get menuTuneNote(){return document.querySelector('select#tune_note')}
get menuTuneAlt (){return document.querySelector('select#tune_alteration')}




/**
 * Les options définies en configuration (config.js)
 * 
 */
get default(){return CONFIG.default_options}


}
const Options = new OptionsClass()
