<?php

$script_name  = $_POST["script_name"];
$ajax_data    = $_POST['ajax_data'];

if ( $script_name == 'build_score' ) {
  $code = $_POST["music_score_code"];
  $code = '-> visu'."\n".$ajax_data;
  // On doit enregistrer le code dans un fichier
  file_put_contents("./score_building/code.mus", $code);
  // On lance la commande qui va produire l'image SVG
  $res = shell_exec('ruby ./score_building/scorize.rb 2>&1');
  $done = "Actualisation de la partition";
  $code = "null";
} else {
  if ( file_exists("./scripts/".$script_name.".rb") ) {
    // Attention, utiliser la méthode STDOUT.write dans le script
    // ruby pour ne pas ajouter de retour chariot
    // 
    // Les longs textes (avec retour chariot) doivent être envoyés
    // comme un array de strings jsonné.
    //  require_relative 'required'
    //  code = output_long_text(code)
    $code = shell_exec('ruby ./scripts/'.$script_name.'.rb 2>&1');
    $done = "OK";
  } else {
    $done = "- OPÉRATION INCONNUE -";
  }
}


// "resultat": "<?php echo $res ? >"
?>
{"script_name": "<?php echo $script_name ?>", "accompli": "<?php echo $done ?>", "data": <?php echo $code ?>}
