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

RUN npm install

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

Key -- > CI_ROBOT_TOKEN

Value -- > token du robot

Key -- > CI_REGISTRY_ROBOT_NAME

Value -- > nom du robot sur harbor 

Key -- > CI_REGISTRY

Value -- > url de harbor (forge-registry.iut-larochelle.fr)

Key -- > CI_PROJECT

Value -- > nom du projet sur harbor (brawl-life)



.gitlab-ci.yml

````

default:
  image: docker:24.0.5
  services:
    - docker:24.0.5-dind

stages:          # List of stages for jobs, and their order of executionj
  - build
  - test
  - lint

variables:
  DOCKER_IMAGE_TAG: bralw-stars-stats:$CI_COMMIT_SHORT_SHA      #nom dans le registry
  DOCKER_IMAGE_NAME: $CI_REGISTRY/$CI_PROJECT/$DOCKER_IMAGE_TAG   #image docker avec lien vers registry


build-job:       # This job runs in the build stage, which runs first.
  stage: build
  tags:
    - docker
  before_script:
  - docker login -u $CI_REGISTRY_ROBOT_NAME -p $CI_ROBOT_TOKEN $CI_REGISTRY
  - docker info
  script:
    - docker build -t $DOCKER_IMAGE_NAME .
    - docker push $DOCKER_IMAGE_NAME

unit-test-job:   # This job runs in the test stage.
  stage: test    # It only starts when the job in the build stage completes successfully.
  tags:
    - shell
  script:
    - docker run $DOCKER_IMAGE_NAME npm run test
  

lint-test-job:   # This job also runs in the test stage.v
  stage: lint    # It can run at the same time as unit-test-job (in parallel).
  tags:
    - shell
  script:
    - docker run $DOCKER_IMAGE_NAME npm run lint

```