# Spécification du projet — My Todo List

## Objectif
Créer une application web simple permettant à un utilisateur d'organiser ses tâches quotidiennes.

## Public cible
Toute personne souhaitant noter et suivre ses tâches depuis un navigateur web.

## Fonctionnalités principales
1. Ajouter une tâche à partir d'un champ de texte.
2. Marquer une tâche comme terminée ou non terminée.
3. Supprimer une tâche individuelle.
4. Supprimer toutes les tâches terminées.
5. Afficher le nombre total de tâches, le nombre de tâches terminées et le nombre de tâches restantes.
6. Conserver les tâches dans le `localStorage` du navigateur après actualisation.

## Exigences techniques
- HTML sémantique pour la structure.
- CSS responsive pour ordinateur et mobile.
- JavaScript natif, sans framework ni dépendance.
- Stockage local avec `localStorage`.
- Point d'entrée : `index.html`.
- Compatible avec un hébergement statique tel que GitHub Pages.

## Critères d'acceptation
- Une tâche non vide peut être ajoutée.
- Une tâche peut être cochée et décochée.
- Une tâche peut être supprimée.
- Les compteurs se mettent à jour après chaque action.
- Les tâches restent présentes après actualisation du navigateur.
- L'interface s'adapte aux petits écrans.
