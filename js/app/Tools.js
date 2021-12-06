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

/**
 * Pour exécuter le code du champ #code_a_tester (Outils) dans 
 * l'application.
 * Le résultat sort dans la console.
 * 
 */
execCodeInApp(){
  const code = document.querySelector('#code_a_tester').value.trim()
  if ( code == "" ) {
    error("Aucun code n'est à évaluer…")
  } else {
    try {
      let res = eval(code)
      console.log("Résultat en évaluant le code fourni", code, res)
    } catch(erreur) {
      console.error(erreur)
      error("Une erreur s'est produite en exécutant le code. Visez la console.")
    }
  }
}

}
const Tools = new ToolsClass()
