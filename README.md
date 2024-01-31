# brawl-stars-stats*

https://miro.com/welcomeonboard/TTJWZDBGb0owRXFqOGdteXUwQkxQdGR2YktkSjZVZUdhN3AyeUt5dDVwdlZoTWtWWDNnQ1BqTU1qbHJySG9GVHwzNDU4NzY0NTE2NTg0NjY3ODI0fDI=?share_link_id=547989370245


# CI gitlab build

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

# CI gitlab test et linter

on test les test (lol)
````
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
````


# CI gitlab deployement communication 

Maintenant qu'on a fait la CI, on fait la CD.
Pour ce faire, on utilie des pods, les pods sont des trucs qui heberge les sites web. D'habitude on vole le cluster de l'iut, mais il risque de nous clear le cerveau.
Donc on fait notre propre cluster sur des raspberry qui tournent à 3, histoire que si le master qui tiens notre projet cannent, les 2 autres le ressuscite (le relais).

A ajouter dans le .gitlab-ci.yml :

````
variables:
  DOCKER_IMAGE_TAG: bralw-stars-stats:$CI_COMMIT_SHORT_SHA      #nom dans le registry
  DOCKER_IMAGE_NAME: $CI_REGISTRY/$CI_PROJECT/$DOCKER_IMAGE_TAG   #image docker avec lien vers registry
  KUBE_CONTEXT: rriole/brawl-stars-stats:k3s
  #KUBECTL: "kubectl --insecure-skip-tls-verify"
  #K8S_NAMESPACE: $CI_NAMESPACE_PROJECT


deployments:
  stage: deploy
  tags:
    - docker
  image: 
    name: bitnami/kubectl:latest
    entrypoint: ['']
  script:
    - kubectl config get-contexts
    - kubectl config use-context $KUBE_CONTEXT
    - kubectl get ns
````

On a créer un agent kubernetes (un poto qui parle avec gitlab / notre cluster), pour se donner des infos.

On ajouté une variable (l'agent gitlab) et pour l'instant on affiche les namespaces de notre cluster kubernetes dans le terminal (get ns)


# CI gitlab deployement communication

On doit créer un deployement (un container tah docker nginx pour faire tourner le site).

Puis on crée un service pour pouvoir exposer le deployement.

Enfin, un ingress pour faire sortir le service dehors.

VOila Bisous


dep-brawl-life
````
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dep-brawl-life
  namespace: $K8S_NAMESPACE
  labels:
    app: brawl-life
spec:
  replicas: 3
  selector:
    matchLabels:
      app: brawl-life
  template:
    metadata:
      labels:
        app: brawl-life
    spec:
      containers:
      - name: brawl-life
        image: $DOCKER_IMAGE_NAME
        ports:
          - containerPort: 8000
      imagePullSecrets:
      - name: gitlab-auth
````

ing-app-brawl-life
````
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: ing-app-brawl-life
    namespace: $K8S_NAMESPACE
spec:
    ingressClassName: traefik
    rules:
        - host: 172.20.10.11.sslip.io
          http:
            paths:
              - path: /
                pathType: Prefix
                backend:
                    service:
                        name: svc-clusterip-dep-brawl-life
                        port:
                            number: 80
````

svc-clusterip-dep-brawl-life
````
apiVersion: v1 
kind: Service 
metadata:
  name: svc-clusterip-dep-brawl-life 
  namespace: $K8S_NAMESPACE
spec:
  type: ClusterIP 
  selector:
    app: brawl-life 
  ports:
    - port: 80
      targetPort: 8000
````

Une fois le deployement effectué côté CI, on a connecté les pods avec un réseau wifi spécifique (iPhone de Florent).
Le site sera donc disponible seulement sur ce reseau. Il Faudrait ouvrir les ports du réseau pour pouvoir avoir accès 
au site via internet.
