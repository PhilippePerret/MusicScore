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
  , 'tune'    : {type:'method'}
  , 'time'    : {type:'select'}
  , 'auto_update_after_change': {type:'checkbox'}
}

class OptionsClass {

/**
 * Pour appliquer les options +opts+ (par exemple récupérées d'un
 * code fourni par les outils)
 * 
 * @param opts {Hash} Avec en clé l'option et en valeur sa valeur
 */
applique(opts){
  var allOptions = {}
  Object.keys(this.default).forEach(keyOption => {
    const defValue = this.default[keyOption]
    const newValue = opts[keyOption] // peut être indéfini
    // console.info("Clé option :", keyOption)
    // console.info("Valeur par défaut: ", defValue)
    // console.info("Valeur redéfinie (if any):", newValue)
    allOptions[keyOption] = undefined === newValue ? defValue : newValue

    // Pour obtenir la valeur avec 'Options.<key option>'
    // this[keyOption] = allOptions[keyOption]
    Object.defineProperty(Options, keyOption, {
      get:function(){
        const dataOption = DATA_OPTIONS[keyOption]
        switch(dataOption.type) {
          case 'checkbox':
            return document.querySelector('#'+keyOption).checked
            break
          case 'method':
            return null
            break
          default:
            return document.querySelector('#'+keyOption).value
        }
      }
    })
  })
  // console.log("allOptions = ", allOptions)
  Score.setOptions(allOptions)
}


/**
 * Les options définies en configuration (config.js)
 * 
 */
get default(){return CONFIG.default_options}


}
const Options = new OptionsClass()
