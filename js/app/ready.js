'use strict';
$(document).ready(e => {
  try{
    UI.prepare()
    /**
     * On lance la boucle qui va actualiser l'image toutes les
     * secondes/
     * Non: maintenant, ça doit être fait manuellement, ici, on ne
     * fait que l'initialiser.
     */
    Score.toggleLoopUpdate()
    Score.toggleLoopUpdate()
    // 
    // S'il y a un code dans le presse-papier, on l'affiche
    // Sinon, on crée simplement une mesure-code
    // 
    var codePressePapier = "a4 b c d | b c d e \na1 | b"
    if ( codePressePapier ) {
      MesureCode.parse(codePressePapier)
    } else {
      MesureCode.createNew()
    }

  } catch(err){
    console.log("Erreur au cours du chargement", err)
  }

})
