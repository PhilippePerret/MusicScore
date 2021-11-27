<?php

$operation = $_POST["operation"];

if ( $operation == 'build_score' ) {
  $code = $_POST["music_score_code"];
  $code = '-> visu'."\n".$code;
  // On doit enregistrer le code dans un fichier
  file_put_contents("./score_building/code.mus", $code);

  // On lance la commande qui va produire l'image SVG
  $res = shell_exec('ruby ./score_building/scorize.rb 2>&1');
  $done = "Actualisation de la partition";
} else {
  $done = "- OPÉRATION INCONNUE -";
}


// "resultat": "<?php echo $res ? >"
?>
{
  "operation": "<?php echo $operation ?>",
  "accompli": "<?php echo $done ?>"
}
