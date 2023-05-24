# Sujet d'évaluation M1 CYBER : Testing

- installer le projet : `npm i`
- lancer le projet en local : `npm start`

## Analyse statique

Mettez en place tous les outils d'analyse statique vus en cours (Eslint, Prettier, husky, accessibilité, ...)

> Note : La configuration devra être faite manuellement (pas d'utilisation du package kcd-scripts)
> Note : A vous de rajouter les scripts dans le package.json

### Configuration de Jest

- Il faudra avoir une couverture de minimum de 80% (idéalement 100%)
- les fichiers index.js devront avoir été ignorés du coverage
- Ajouter les outils d'accessibilité

### Mock appel d'api

- il faudra installer et configurer msw (pas de mock manuel avec jest.mock)

## Ecrire les scenarios de test

En observant le fonctionnement de l'application, rédigez l'ensemble des spécifications et détermninez les scénarios de test qui serviront de base pour les tests d'intégration

> Note : les scenarios devront être écrit au format markdown

## Tests unitaires

L'ensemble des fichiers devront être testés unitairement

> Note : les snapshots peuvent être utilisés mais ne doivent pas se substituer à la vérification des éléments attendus dans le DOM
> Note : Il faudra mettre en place la vérification sur le respect de l'accessbilité

### Tests d'intégration

Sur la base des scénarios, écrire l'ensemble des tests d'intégration

> Vous pouvez faire de la refacto (sans casser le fonctionnel) pour faciliter les tests
