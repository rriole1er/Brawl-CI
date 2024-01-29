# brawl-stars-stats*

https://miro.com/welcomeonboard/TTJWZDBGb0owRXFqOGdteXUwQkxQdGR2YktkSjZVZUdhN3AyeUt5dDVwdlZoTWtWWDNnQ1BqTU1qbHJySG9GVHwzNDU4NzY0NTE2NTg0NjY3ODI0fDI=?share_link_id=547989370245


# CI gitlab

Créeer un dockerFile :

le build
````
from node:alpine

RUN mkdir -p /home/brawl-life
WORKDIR /home/brawl-life

COPY . .

EXPOSE 8000

cmd ['node','app.js']
````

lancer le build :

```
docker build -t brawl-life .
```

lancer le run :

--rm (supprime à la fin)

````
docker run --rm -p 8000:8000 brawl-life
````

on test les test (lol)
```
docker run --rm -p 8000:8000 brawl-life npm test
````

Créer la CI ---> gitlab-ci.yml

Se rendre sur harbor/dockerhub pour enregister nos images docker (pour pas les perdre).

On créer un robot qui va faire des trucs sur notre repo 

On choppe son token et on le fout dans gitlab


"AJOUTER UNE VARIABLE DANS SETTINGS/CI-CD/VARIABLE"


