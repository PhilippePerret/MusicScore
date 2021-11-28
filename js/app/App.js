'use strict';

class AppClass {

submitCode(){
  message("Actualisation en cours…", {keep: true})
  $('#music_score_code_in_form').val(Score.codeFinal)
  $('#music_score_form #operation').val('build_score')
  const form = $('#music_score_form').ajaxSubmit({url:'ajax.php', type:'POST'})
  var xhr = form.data('jqxhr');
  xhr.done(function(ret) {
    console.log("Je reviens.")
    console.log("Retour ajax", ret)
    message("Partition actualisée.")
    Score.update()
  });    
}

}//AppClass


const App = new AppClass()

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
