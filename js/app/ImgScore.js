'use strict';
/**
 * constance ImgScore pour gérer l'image de la partition
 * 
 */
class ImgScoreClass {

constructor(){
  this.size = 100
}
/**
 * Méthodes pour aggrandir et diminuer
 * 
 */
augmenteSize(){
  this.changeSize(this.size += 5)
}
diminueSize(){
  this.changeSize(this.size -= 5)
}
initSize(){
  this.size = 100
  this.changeSize(val)
}
changeSize(val){
  this.img.style.width = val + '%'
}

get container(){
  return this._conteneur || (this._conteneur = DGet('section#score_container'))
}
get img(){
  return this._img || (this._img = DGet('#score'))
}

}//ImgScoreClass
const ImgScore = new ImgScoreClass()
