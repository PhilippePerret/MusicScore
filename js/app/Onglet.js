'use strict';
/**
 * Class Onglet
 * 
 * Pour la gestion des onglets
 * 
 */
class Onglet {

/**
 * Méthode pour instancier un onglet, avec le bouton (<button>) +bouton+
 * qui contient notamment un identifiant "onglet_<id instance onglet>"
 * 
 */
static instanciate(bouton){
  const onglet_id = bouton.id.split('_')[1]
  const onglet = new this({id:onglet_id, bouton:bouton})
  onglet.prepare()
}


constructor(data){
  this.data   = data;
  this.id     = data.id
  this.bouton = data.bouton
}

prepare(){
  this.panneau.classList.add('hidden')
  this.bouton.addEventListener('click', this.onClickOnglet.bind(this))
}

onClickOnglet(ev){
  if ( this.constructor.current ) {
    this.constructor.current.closePanneau.call(this.constructor.current)
  }
  this.openPanneau()
  return stopEvent(ev)
}

openPanneau(){
  this.constructor.current = this
  this.panneau.classList.remove('hidden')
}
closePanneau(){
  this.constructor.current = null
  this.panneau.classList.add('hidden') 
}


get panneau(){
  return this._pan || (this._pan = DGet(`div.panneau#${this.id}`))
}


}
