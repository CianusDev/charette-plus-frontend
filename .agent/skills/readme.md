# Skills — Guide

## Qu'est-ce qu'un skill ?

Un skill est un guide d'action pas à pas pour une tâche concrète et récurrente.

Différence avec les **rules** :
- `rules/` → *comment les choses fonctionnent* (architecture, conventions, patterns)
- `skills/` → *comment faire une tâche précise* (séquence d'étapes actionables)

Un agent lisant un skill sait exactement quoi créer, dans quel ordre, avec quel contenu.

## Skills disponibles

| Skill | Déclencheur |
|-------|-------------|
| `create-feature.md` | "Crée une feature X", "Ajoute le module Y" |
| `create-route.md` | "Ajoute une page X", "Crée la route /Y" |
| `create-component.md` | "Crée un composant X", "Ajoute le composant Y" |
| `create-form-input.md` | "Crée un FormInput", "Ajoute un champ de formulaire" |

## Comment utiliser un skill

1. Identifier la tâche demandée
2. Lire le skill correspondant en entier
3. Suivre les étapes dans l'ordre
4. Vérifier les règles dans `rules/conventions.md` pour le nommage

## Comment créer un nouveau skill

Structure d'un skill :

```md
# Skill : {Nom de la tâche}

## Quand utiliser ce skill
{description du déclencheur}

## Prérequis
{ce qui doit exister avant}

## Étapes

### 1. {Nom étape}
{description + code}

### 2. {Nom étape}
...

## Vérification finale
{checklist}
```
