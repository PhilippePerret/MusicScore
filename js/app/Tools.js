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
    Onglet.close()
  } else {
    error("Il faut choisir le champ (en cliquant dedans.")
  }
}

/**
 * Appelée par le bouton "Forcer le rechargement de limage"
 * 
 */
forceUpdateImage(){
  $('img#score').attr('src', "score_building/code/default.svg")
  setTimeout(Score.update.bind(Score), 2000)
}

resetAll(){
  MesureCode.resetAll.call(MesureCode)
  Onglet.close('tools')
}

/**
 * Pour ouvrir la version éditable (Markdown) du manuel
 * 
 */
openManuelEditable(){
  ajax('open_manuel_md').then(ret => {message("Le manuel est ouvert pour édition.")})
}

}
const Tools = new ToolsClass()
