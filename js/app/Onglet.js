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
  const onglet_id = bouton.getAttribute('data-panneau-id')
  const onglet = new this({id:onglet_id, bouton:bouton})
  onglet.prepare()
}

/**
 * Préparation des onglets/panneaux
 * 
 */
static prepare(){
  document.querySelectorAll('button.onglet').forEach(aong => {
    Onglet.instanciate(aong)
  })
}

constructor(data){
  this.id       = data.id
  this.data     = data;
  this.bouton   = data.bouton
  this.isClosed = true
}

prepare(){
  this.bouton.addEventListener('click', this.onClickOnglet.bind(this))
}

onClickOnglet(ev){
  if ( this.constructor.current && this.constructor.current.id != this.id) {
    this.constructor.current.closePanneau.call(this.constructor.current)
  }
  this.togglePanneau()
  return stopEvent(ev)
}

togglePanneau(){
  if (this.isClosed) {
    this.openPanneau()
  } else {
    this.closePanneau()
  }
}

openPanneau(){
  this.constructor.current = this
  this.panneau.classList.remove('closed')
  this.isClosed = false
  this.bouton.classList.add('activated')
}
closePanneau(){
  this.constructor.current = null
  this.panneau.classList.add('closed') 
  this.isClosed = true
  this.bouton.classList.remove('activated')
}


get panneau(){
  return this._pan || (this._pan = DGet(`div.panneau#${this.id}`))
}


}
