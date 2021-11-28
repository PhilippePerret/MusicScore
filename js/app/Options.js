'use strict';
/**
 * Class OptionsClass
 * 
 * Pour gérer les options et la configuration
 * 
 */
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
  })
  console.log("allOptions = ", allOptions)
  Score.setOptions(allOptions)
}


/**
 * Les options définies en configuration (config.js)
 * 
 */
get default(){return CONFIG.default_options}


}
const Options = new OptionsClass()
