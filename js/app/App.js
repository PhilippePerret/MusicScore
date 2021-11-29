'use strict';

class AppClass {

submitCode(){
  message("Actualisation en cours…", {keep: true})
  $('#music_score_code_in_form').val(Score.getCodeFinal())
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

/**
 * Méthode générale principale traitant un code complet donné
 * 
 */
traiteCodeInitial(){
  const field = document.querySelector('#ini_code')
  const fullcode = field.value
  console.log("Je dois traiter le code : ", fullcode)
  // 
  // On passe en revue chaque ligne pour définir les options
  // 
  var notes   = [] 
  var options = {}
  fullcode.split("\n").forEach(line => {
    line = line.trim()
    if ( line.substring(0, 2) == '--' ){
      var [option, valoption] = line.substring(2, line.length).split(' ')
      console.log("options,valoption = ", option, valoption)
      switch(option){
        case'piano': case'solo': case'duo': case'trio': case'quatuor': 
          valoption = option
          option    = 'systeme' 
          break;
      }
      if ( valoption == '' ) valoption = true
      options[option] = valoption
    } else {
      notes.push(line)
    }
  })
  notes = notes.join("\n").trim()
  // console.info("Notes récupérées : ", notes )
  MesureCode.parse(notes)
  // 
  // Traitement des options
  // 
  console.info("Options récupérées : ", options)
  Options.applique(options)
}


produceFinalCode(){
  const field = document.querySelector('#final_code')
  let from_mes  = document.querySelector('#output_from_mesure').value.trim()
  let to_mes    = document.querySelector('#output_to_mesure').value.trim()
  from_mes  = from_mes == '' ? 1 : parseInt(from_mes,10)
  to_mes    = to_mes == '' ? Score.count : to_mes
  field.value = Score.getCodeFinal({from: from_mes, to:to_mes})
  field.style.height = px(200)
}
}//AppClass


const App = new AppClass()
