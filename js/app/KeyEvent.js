'use strict';
/**
 * Gestion des touches de clavier
*/

class KeyboardControlerClass {

commonOnKeyUp(ev){
  // console.log("key event : ", ev)
}

commonOnKeyDown(ev){
  // console.log("key down event : ", ev)
  if ( ev.metaKey && ev.key == 'b') {
    console.info("🎹 ⌘ B")
    /**
     * 
     * On soumet le code pour fabriquer la nouvelle image
     * 
     */
    App.submitCode()
    return stopEvent(ev)
  }
}

}//KeyboardControlerClass

const KeyboardController = new KeyboardControlerClass()

window.onkeyup = KeyboardController.commonOnKeyUp ;
window.onkeydown = KeyboardController.commonOnKeyDown ;
