# WebSiteSimpleScaffold

L’idée de ce scaffold de site est de proposer un truc encore plus simple que WebAppScaffold, avec un script PHP qui reçoit les requêtes Ajax et appelle des scripts binaire (comme par le Terminal) pour exécuter les actions.

Noter à la base qu’on ne peut pas passer de grands textes, a priori, par ce moyen.

## Processus

* on tape un code "music-score" (lilypond simplifié)
* quand on clique "Visualiser" (ou raccourci à définir), le code est envoyé côté serveur
* il est transformé en code "music-score complet"
* il est interprêté par 'iced mus' (ou scorize)
* la commande produit l'image svg
* on remettre le résultat
* le programme actualise l'image SVG
