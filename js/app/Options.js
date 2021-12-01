'use strict';
/**
 * Class OptionsClass
 * 
 * Pour gérer les options et la configuration
 * 
 */

// Constante des types de champ par option
const DATA_OPTIONS = {
    'page':           {type:'select'}
  , 'mesure':         {type:'text'}
  , 'systeme':        {type:'select_or_other'}
  , 'proximity':      {type:'select'}
  , 'barre':          {type:'checkbox'}
  , 'stems':          {type:'checkbox'}
  , 'tune'    :       {type:'method', getter:'getTune', setter:'setTune'}
  , 'time'    :       {type:'select'}
  , 'auto_update_after_change': {type:'checkbox'}
  , 'staves_vspace':  {type:'text'}
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
  // console.info("On doit mettre la propriété '%s' à %s", property, value)
  const dataProperty = DATA_OPTIONS[property]
  switch(dataProperty.type) {
    case 'checkbox':
      document.querySelector('#cb_'+property).checked = value
      break
    case 'method':
      this[dataProperty.setter](value)
      break
    case 'select_or_other':
      var menu = document.querySelector('#'+property)
      if ( menu.querySelector(`option[value="${value}"]`) ) {
        menu.value = value
      } else {
        console.info("Le menu #%s n'a pas de valeur %s. Je mets other", property, value)
        menu.value = 'xxx'
        document.querySelector('#other_'+property).value = value
      }
      break
    default:
      value = value || ''
      console.log("Mettre le champ #%s à la valeur '%s'", property, value)
      document.querySelector('#'+property).value = value    
  }
}
getProperty(property){
  const dataProperty = DATA_OPTIONS[property]
  if (undefined == dataProperty){
    console.error("La propriété '%s' est indéfinie…", property)
    error("Propriété " + property + ' indéfinie dans DATA_OPTIONS…')
    return null
  }
  switch(dataProperty.type) {
    case 'checkbox':
      return document.querySelector('#cb_'+property).checked
    case 'method':
      return this[dataProperty.getter]()
    case 'select_or_other':
      var value = document.querySelector('#'+property).value
      if ( value == 'xxx') {
        value = document.querySelector('#other_'+property).value.trim()
      }
      if ( value == '' ) value = null
      return value
    default:
      var value = document.querySelector('#'+property).value    
      if ( value == '' ) value = null
      return value
  }
}

/**
 * Pour appliquer les options +opts+ (par exemple récupérées d'un
 * code fourni par les outils)
 * 
 * @param opts {Hash} Avec en clé l'option et en valeur sa valeur
 */
applique(opts){
  console.log("-> Options.applique(opts=)", opts)
  var allOptions = {}
  for(var keyOption in DATA_OPTIONS){
    const dataOption = DATA_OPTIONS[keyOption]
    if (undefined === opts[keyOption]) continue;
    else {
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
getTune(){
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
