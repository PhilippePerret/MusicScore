'use strict';
class AjaxClass {

send(script_name, data){
  return new Promise((ok,ko)=>{
    // 
    // On met le script à jouer dans le champ
    // 
    $('form#ajax_form #script_name').val(script_name)
    // 
    // On met les données éventuelles dans le champ
    // (si elles ne sont pas au format string, on considère que c'est
    //  une table est on la jsonnifie)
    // 
    if ( data ) {
      if ( 'string' != typeof data ) data = JSON.stringify(data) ;
    } else {
      data = ""
    }
    $('form#ajax_form #ajax_data').val(data)

    // 
    // On soumet la requête ajax
    const form = $('form#ajax_form').ajaxSubmit({url:'ajax.php', type:'POST'})
    var xhr = form.data('jqxhr');
    xhr.done(function(ret) {
      ret = ret.trim()
      console.info("RETOUR AJAX BRUT :", ret)
      ok(JSON.parse(ret))
    });    

  })
}
}//AjaxSend
const Ajax = new AjaxClass()

/**
 * Pour pouvoir utiliser :
 * 
 * ajax("<script>").then(retour => {traitement retour})
 * 
 */
function ajax(script, data){
  return Ajax.send(script, data)
}
