'use strict';
/**
 * 
 * Tools est un objet de classe ToolsClass
 * Pour gérer les outils.
 * 
 */
const SNIPPETS = {
    'double_voix': "<< {  } \\\\ {  } >>"
  , 'debut_reprise': "|:"
  , 'fin_reprise': ":|"
  , 'fin_debut_reprise': ":|:"
  , 'fin': "|."
}
class ToolsClass {

writeInCurrent(key){
  if ( MesureCode.current ) {
    MesureCode.current.addInCurrentStaff(SNIPPETS[key])
  } else {
    error("Il faut choisir le champ (en cliquant dedans.")
  }
}

}
const Tools = new ToolsClass()
