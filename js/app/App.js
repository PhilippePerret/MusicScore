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
  });    
}

}//AppClass


const App = new AppClass()

$(document).ready(e => {
  try{
    /**
     * On lance la boucle qui va actualiser l'image toutes les
     * secondes
     */
    Score.loopUpdates()
    MesureCode.createNew()
  } catch(err){
    console.log("Erreur au cours du chargement", err)
  }

})
