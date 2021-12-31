'use strict';
$(document).ready(e => {
  try{
    UI.prepare()
    /**
     * Si un code existe déjà dans le fichier 'score_building/code.mus'
     * on le remonte et on l'affiche. Sinon, on ne met rien, on 
     * fabrique simplement une mesure (à deux portées)
     * 
     */
    ajax('get_code').then(ret => {
      // console.log("retour ajax = ", ret)
      if (ret.data) {
        App.traiteCodeInitial(ret.data.join("\n"))
      } else {
        MesureCode.createNew()
      }
    })
  } catch(err){
    console.log("Erreur au cours du chargement", err)
  }

})
