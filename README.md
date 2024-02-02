# brawl-stars-stats*


# Flux CI/CD

Nous possèdons 4 stages dans notre CI.

Les 4 stages permettent d'assurer des éléments importants de la Continuous Integration.

- Build
- Test
- Lint
- Deploy

Ces différents stages nous permettent de valider plusieurs points :

- Le build est le stage qui envoie notre image écrite sur le Dockerfile, sur le registry de l'iut : Harbor.

- Le test est le stage qui lance naîvement les test écrits dans le projet dans le répertoire tests/test.js. Ce sont des test classique, qui verifie un appel Api utilisé dans l'application.

- Le lint est le stage qui vérifie la qualité de code du projet js. Il verifie notamment tous les fichiers js du projet (routes/, tests/ et public/js). Nous utilisons la norme de base de la bibliothèque eslint (recommended). 

- Le deploy est le stage qui lance le déploiement défini dans le /kubernetes. Ce dossier est composé d'un déploiement classique (à partir de notre image récupéré via Harbor).

Il faut savoir, que n'importe quel échec d'un stage, bloque le lancement du prochain.

Nous effectuons les stages dans cet ordre :

 Build ---> Test ----> Linter ----> Deploy

Autrement dit, s'il y a une erreur dans le build de notre image, on skip tous les autres stages.
Si un test fonctionnel ne passe pas, le stage test bloque le lancement des autres stages.
S'il y une erreur de qualité de code, par exemple l'oubli d'un point virgule sachant que nous somme dans un projet js et que son utilisation est donc libre. Le stage bloque le deploiement
Enfin, s'il y a une erreur dans le déploiement par exemple une mauvaise indentation dans le fichier yaml, le deploiement est abandonné.


Si tous les stages passent, on peut consulter le site via l'adresse ip "172.20.10.11.sslip.io". Cependant, les raspberry que nous utilisons doivent être dans un même réseau pour pouvoir déploier.  

