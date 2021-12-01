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
    Onglet.close('tools')
  } else {
    error("Il faut choisir le champ (en cliquant dedans.")
  }
}


resetAll(){
  MesureCode.resetAll.call(MesureCode)
  Onglet.close('tools')
}

}
const Tools = new ToolsClass()
