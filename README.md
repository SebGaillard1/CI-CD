# Projet Node.js - Exemple de CI/CD avec Docker

Ce projet est une application Node.js simple qui renvoie "Hello World" sur le port HTTP 3000. Cette app a pour but de démontrer l'utilisation de Docker, GitHub Actions pour l'intégration continue (CI) et le déploiement continu (CD) sur Docker Hub.

## Fabrication de l'Image Docker

Pour construire l'image Docker de cette application, exécutez la commande suivante dans le répertoire racine du projet :

```bash
docker build -t sebgaillard/cicd .
```

Cette commande construit une image Docker basée sur le `Dockerfile` fourni, taguée comme `sebgaillard/cicd`.

## Exécution Locale de l'Application

Après avoir construit l'image Docker, vous pouvez démarrer l'application localement en exécutant :

```bash
docker run --rm  -p 3000:3000 sebgaillard/cicd
```

Pour tester l'application, utilisez :

```bash
curl http://localhost:3000
```

Vous devriez voir "Hello World" comme réponse.

## Intégration Continue (CI)

Le projet utilise GitHub Actions pour automatiser les tests et la construction de l'image Docker à chaque push dans les branches `main` et `dev`, ainsi qu'à chaque pull request vers `main`. Les étapes du workflow CI sont définies dans `.github/workflows/ci.yml` et incluent :

- Installation des dépendances.
- Construction de l'image Docker.
- Démarrage d'un conteneur à partir de l'image.
- Exécution d'une requête HTTP pour tester la réponse de l'application.

## Déploiement Continu (CD)

Le déploiement continu est configuré pour pousser automatiquement l'image Docker construite sur Docker Hub à chaque fusion dans la branche `main`. Les détails du workflow CD sont dans `.github/workflows/cd.yml`.

## Gestion des Tags et Livraison Continue

Lorsqu'un nouveau tag Git est créé, le workflow défini dans `.github/workflows/tag-release.yml` est déclenché, construisant et poussant l'image Docker sur Docker Hub avec le tag correspondant. Cela permet une gestion versionnée des déploiements.

## Linting du Dockerfile

Le linting du `Dockerfile` est réalisé automatiquement à chaque push et pull request grâce au workflow défini dans `.github/workflows/docker-lint.yml`, utilisant hadolint pour garantir les meilleures pratiques.

## Destination du CD

L'image Docker est déployée sur Docker Hub à l'adresse suivante : [sebgaillard/cicd](https://hub.docker.com/r/sebgaillard/cicd/)

## Mode Read-Only

Notre application peut être exécutée dans un conteneur Docker en mode "read-only". Voici comment la démarrer en mode Read-Only :

```bash
docker run --name mon-app-node --read-only -p 3000:3000 sebgaillard/cicd
```

## Gestion des Branches

Le projet contient trois branches principales :

-   `main` : la branche principale où les fonctionnalités testées et approuvées sont fusionnées.
-   `dev` : une branche pour le développement et les tests des nouvelles fonctionnalités.
-   `test-breaking-bug` : cette branche contient une pull request bloquée en raison d'un bug introduit volontairement. Le CI génère une erreur, ce qui empêche la fusion de cette branche avec `main`.
