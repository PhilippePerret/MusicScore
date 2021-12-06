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
  , 'barres':         {type:'checkbox'}
  , 'stems':          {type:'checkbox'}
  , 'tune'    :       {type:'method', getter:'getTune', setter:'setTune'}
  , 'time'    :       {type:'select'}
  , 'auto_update_after_change': {type:'checkbox'}
  , 'staves_vspace':  {type:'text'}
  , 'staves'        : {type:'method', setter:'setStaves'}
  , 'disposition':    {type:'select'}
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
  if ( undefined == dataProperty ){
    error("La propriété " + property + " n'est pas définie dans DATA_OPTIONS… Je dois renoncer à l'afficher.")
    return
  }
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
  for(var keyOption in opts){
    const datOption = DATA_OPTIONS[keyOption]
    const valOption = opts[keyOption]
    this.setProperty(keyOption, valOption)
    // 
    // Traitement particulier de certaines options qui doivent 
    // s'appliquer tout de suite
    // 
    switch(keyOption){
      case 'disposition':
        UI.setDisposition.call(UI, valOption)
        break
      case 'systeme':
      case 'staves':
        Score.reset()
        this.setSysteme(valOption)
        this.setStavesData()
        break
    }
  }
}

/**
 * Méthode qu'on peut appeler depuis un élément DOM avec le
 * 'onchange', pour modifier quelque chose quand un choix d'option
 * est changé.
 * Cette méthode a été inaugurée pour la disposition. Quand on change
 * de disposition, cette méthode est appelée pour utiliser une autre
 * disposition d'écran.
 * 
 * @param objet {DOMElement}
 *        L'objet qui appelle la méthode car elle est appelée par :
 *        onchange="Options.onChange.call(Options,this)"
 *        On checke son id pour savoir quoi faire.
 */
onChange(objet){
  switch(objet.id){
    case 'disposition':
      this.applique({disposition: objet.value})
      break
    case 'systeme':
      this.applique({systeme: objet.value})
      break
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
 * Pour définir les portées
 * Appelée par la méthode setProperties l'option 'staves', mais on
 * s'occupera dedans de toutes les définitions de staves (noms, 
 * clés, etc.)
 */
setStaves(staves){
  console.log("staves reçu par la méthode Options.setStaves :", staves)
  // this.setStavesData()
}


/**
 * Réglage du système
 * 
 * +sys+ peut être une valeur symbolique, comme 'piano' ou 'quatuor',
 * ou un nombre de portées.
 * 
 */
setSysteme(sys){
  console.log("-> setSysteme(%s)", sys)
  const menuSysteme = document.querySelector('#systeme')
  if ( isNaN(sys) ) {
    menuSysteme.value = sys
  } else {
    const otreSysteme = document.querySelector('#other_systeme')
    menuSysteme.value = 'xxx'
    otreSysteme.value = sys
  }
}

setStavesData(){
  console.log("-> setStavesData")
  let nombrePortees = Score.nombrePortees
  console.info("[setStavesData] Nombre de portées définies : %i", nombrePortees)
  // 
  // On détruit les rangées de définition de portée, à part la
  // première, qui servira de modèle
  // 
  var trportee
    , istaff = 1 // pour commencer à 2
  while ( true ){
    trportee = document.querySelector(`#tr_staff-${++istaff}`)
    if ( trportee ) {
      trportee.remove()
    } else {
      break
    }
  }
  // lignesDataStaff.forEach(tr => tr.remove())
  const firstStaff = document.querySelector('tr#tr_staff-1')
  var currentStaff, lastStaff;
  for(var istaff = 0; istaff < nombrePortees; ++istaff){
    if ( istaff > 0 ) {
      // 
      // Il faut cloner le premier champ et l'insérer après le dernier
      // 
      const newStaff = firstStaff.cloneNode(true)
      lastStaff.parentNode.insertBefore(newStaff, lastStaff.nextSibling)
      newStaff.querySelector('.staff_number').innerHTML = 1 + Number(istaff)
      newStaff.id = `tr_staff-${1 + istaff}`
      currentStaff = newStaff
    } else {
      currentStaff = firstStaff
    }

    lastStaff = currentStaff
  }
}

getStavesData(){
  const nombrePortees = Score.nombrePortees;
  let dataKeys  = []
  let dataNames = []
  let keysArePertinent = false
  let namesArePertinent = false
  for(var istaff = 0; istaff < nombrePortees; ++istaff) {
    const trstaff   = document.querySelector(`#tr_staff-${1 + istaff}`)
    const staffKey  = trstaff.querySelector('.staff_key').value
    dataKeys .push(staffKey)
    if ( staffKey != 'G' ) {
      keysArePertinent = true
    }
    const staffName = trstaff.querySelector('.staff_name').value
    dataNames.push(staffName)
    if ( staffName != '' ){
      namesArePertinent = true
    }
  }
  var d = {}
  keysArePertinent  && Object.assign(d, {keys: dataKeys})
  namesArePertinent && Object.assign(d, {names: dataNames})
  return d
}

/**
 * Les options définies en configuration (config.js)
 * 
 */
get default(){return CONFIG.default_options}


}
const Options = new OptionsClass()
