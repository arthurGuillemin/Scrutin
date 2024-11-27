# Une application de gestion de scrutins

## Contexte

Avec quelques amis, vous avez été convaincu par le mouvement de la **Civic
Tech**, dont l’ambition est de proposer des outils numériques pour offrir des méthodes alternatives au vote majoritaire.

Bien que ce dernier soit la méthodes la plus répandue (et la plus simple) pour prendre des décisions, et en particulier pour les processus politiques locaux et nationaux, il existe depuis très longtemps des approches différentes, plus représentatives, mais
aussi plus difficiles à mettre en œuvre manuellement.

Parmi celles-ci, on peut compter au moins (en Europe) deux travaux majeurs. Tout d’abord celui du philosophe catalan **Ramon Lull**, qui écrit sur le sujet un ouvrage intitulé *De arte electionis* en 1299. L’autre auteur le plus connu sur le sujet est le mathématicien **Nicolas de Condorcet**, qui proposa lors de la Révolution française un système pour organiser des élections reflétant plus justement les préférences des citoyens. Connue depuis lors sous les noms de « méthode de Condorcet » ou
« vote Condorcet », cette approche a vu sa popularité s’agrandir à nouveau dans les mouvements du logiciel libre et les milieux associatifs où les prises de décision se font (en général) davantage sur le mode du consensus.

La possibilité et la part grandissante du vote numérique, même pour les éléctions générales, favorise donc les projets logiciels visant à mettre en œuvre des algorithmes plus sophistiqués que le simple décompte.

Vous avez donc constitué une équipe pour réaliser une plate-forme de vote que vous voudriez par la suite proposer à des organisations de toutes sortes, aussi bien privées que publiques, afin qu’elles puissent organiser en ligne des consultations et des votes.

Naturellement, un tel projet comporte de nombreuses facettes, en particulier la question délicate de la protection des données personnelles de votants, du processus de vote, de la sincérité et de la validation du vote, de la conservation des données, de la disponibilité du service, etc.

Vous avez collectivment opté pour développer l'application en Python avec Flask.

## Objectifs

Les objectifs principaux de votre travail sont les suivants :

1. Concevoir le modèle des données de l'application

2. Réaliser un prototype permettant l'organisation, le déroulement et l'affichage des résultat d'un scrutin. L'appllication devra permettre de choisir l'algorithme de décision.

3. Réaliser une interface d'administration permettant de modérer les scrutins et d'afficher des statistiques concernant ceux-ci.. 

## Cahier des charges

### Modèle

Le modèle de données de l'application est assez simple.

#### Scrutin

Un scrutin est défini par une question, qui peut être développée dans un texte de présentation long.

Les votants pourront choisir entre plusieurs réponses possibles. Le nombre de réponses sera configuré par l'organisateur du scrutin.

À la fin du vote, une des réponses devra être considérée comme l'option préférée et marqué comme telle.

Un scrutin ne peut pas avoir une duréer indéterminée. Il devra être accessible entre deux dates définies par l'organisateur.

#### Utilisateurs

En second lieu, il y a des utilisateurs.

Ceux-ci sont identifiés par un pseudonyme. Par ailleurs on souhaite conserver des informations personnelles à propos des personnes qui veulent participer aux scrutins.

La sécurité de l'application ne fait pas partie du périmètre de la problématique (sauf si vous avez du temps et que vous voulez expérimenter). Un utilisateur n'aura qu'à donner son pseudonyme (comme une signature) lors de son vote.

### Cas d'utilisation

#### UC 1 : Accéder à la page d'accueil

> **En tant que** : Visiteur
> **Je souhaite** : Afficher une page présentant la plate-forme
> **En** : écrivant l'URL du site dans la barre d'adresses du navigateur

Sur la page d'accueil, hormis un petit texte d'explication, , on souhaite afficher :

- La iste des des 10 derniers scrutins créés (avec leur titre la date de leur création)

- La liste des 10 derniers scrutins actifs, c'est-à-dire pour lesquels des personnes ont voté

#### UC 2 : S'inscrire sur la plate-forme

> **En tant que** : Visiteur
> **Je souhaite** : M'enregistrer comme utilisateur de la plate-forme
> **En** : remplissant un formulaire d'inscription

Pour ce cas d'utiisation,on fera attention, naturellement, à ce que deux personnes ne puissent utiliser le même pseudonyme.

Une fois la personne inscrite, on veut afficher un résumé de son profil.

#### UC 3 : Modification du profil

> **En tant que** : Visiteur
> **Je souhaite** : Modifier mes informations personnelles
> **En** : en remplissant un formulaire de modification

Une personne peut modiifer ses données personnelles, sauf son pseudonyme qui reste invariable.  Les nouvelles informations sont affichées en retour.

#### UC 4 : Suppression du profil

> **En tant que** : Visiteur
> **Je souhaite** : Me désinscrire
> **En** : en cliquant sur un lien idoine

Les profils ne peuvent pas être complètement supprimés, car listorique des votes devrait être conservé. A tout le moins, les données personnelles de la personne devraient être effacées, sauf son pseudonyme, qui ne peut être réutilisé. Le profil sera marqué comme « fermé » et ne pourra plus être utilisé pour voter.

#### UC 5 : Créer un scrutin

> **En tant que** : Utilisateur
> **Je souhaite** : Créer une nouvelle consultation
> **En** : remplissant un formulaire

Toute personne ayant un profil sur le site peut organiser un scrutin. Elle choisit le nombre d'options possibles, les alternatives. En retour, les données du scriutin sont affichées à l'utilisateur.

Tout scrutin doit avoir au moins deux options possibles :smile:.

#### UC 5 : Modifier un scrutin

> **En tant que** : Utilisateur
> **Je souhaite** : Modifier le texte des consultations
> **En** : remplissant un formulaire

Tant que le scrutin n'a pas été rendu public, avec une date d'ouverture, par exemple, les textes peuvent être modifiés. En revanche, le nombre d'options reste invariable.

#### UC 6 : Participer à un scrutin

> **En tant que** : Utilisateur
> **Je souhaite** : Voter lors d'une consultation
> **En** : en choisissant une ou plusieurs options dans une interface de vote

Un utilisateur ne peut pasticiper à un scrutin que si celui-ci est ouvert. Pour voter, l'utilisateur donne un « poids » à chaque option, qui indique ses préférences. On admettra que les poids sont ordonnés dans l'ordre croissant, l'option préférée ayant le poids le plus faible.

En retour, on affichera à l'utilisateur ses choix dans l'ordre de ses préférences.

Un utilisateur peut omettre certains choix. Dans ce cas, ceux-ci seront considérés (à égalité) comme les moins préférés.

#### UC 7 : Modifier un vote

> **En tant que** : Utilisateur
> **Je souhaite** : Changer d'avis à propos d'une question
> **En** : remplissant de nouveau le formulaire

On considère que, tant que le scrutin est ouvert, une personne peut revenir sur ses choix. Elle pourrait donc remplir à nouveau le formulaire et la plate-forme devra, dans ce cas, modifier la liste des votes pour le scrutin en question.

La personne devra être avertie qu'elle a déjà voté pour cette question.

#### UC 8 : Afficher les résultats d'une consultation

> **En tant que** : Participant
> **Je souhaite** : Visualiser les résultas d'une consultation
> **En** : en choisissant une consultation dans une liste

Une fois que le scrutin est fermé, les résultats sont disponibles pour la publication. Je peux donc accéder à la liste des scrutins qui sont fermés et afficher les options dans l'ordre de préférence, tel que calculé par l'algorithme. L'option préférée parmi toutes devra être mise en exergue.

#### UC 9 : Dépouiller un scrutin

> **En tant que** : Organisateur
> **Je souhaite** : Visualiser les scrutin autou d'un thème donné
> **En** : choisissant un scrutin que j'ai organisé

En donnant son pseudonyme, la plate-forme devrait pouvoir afficher la liste des scrutins que j'ai organisés, en indiquant ceux qui sont ouvert, ceux qui sont fermés, et ceux pour lesquels les résultats ont déjà été calculés. 

En cliquant sur un bouton, l'organisateur peut lancer la procédure de dépouillement et les résultats lui sont affichés.

#### UC 10 : Modérer un scrutin

> **En tant que** : Administrateur
> **Je souhaite** : Modérer une consultation
> **En** : en choisissant une cinsultation dans une liste

Certaines personnes, qui ont un « rôle » d'administrateur, doivent pouvoir désactiver un scrutin, si celui-ci n'était pas conforme aux conditions d'utilisation, par exemple.

#### UC 11 : Afficher de statistiques

> **En tant que** : Administrateur
> **Je souhaite** : Visualiser les statistiques d'utilisation de la plate-forme
> **En** : en cliquant sur un lien dans le menu d'administration

On aimerait répondre à quelques questions à propos des scrutins :

- Quels sont les scrutins qui on drainé le plus de participants ?

- Pour un scrutin donné, comment se répartissent les votes en fonction des années de naissance des votants ?

- Quel est le nombre moyen d'options pour les scrutins organisés sur la plate-forme ?

## Analyse du vote

### Vote proportionnel

Ce cas est le plus simple.

Le votant ne peut choisir qu'une seule réponse.

Lors de la clôture du scrutin, une fonction n'aura qu'à faire la somme de tous le votes et de choisir celle qui a obtenu le plus de suffrages.

### Vote majoritaire

Dans le cas d'un vote majoritaire, la contraint aoutée est que l'option gagnante doit avoir réuni (50% + 1) des voix.

Le votant ne peut toujours choisir qu'une seule réponse.

Il y a pluseurs manières d'implémenter ce scénario, plus ou moins simples. Faites des propositions.

### Vote Condorcet

L'analyse du vote Condorcet est la plus sophistiquée.

Dans ce cas, l'utilisateur est invité à classer les options, sachant que ce classement ne consitue pas un **ordre total**. Chacun est libre de classer plusieurs options au même niveau.

Cela va, en premier lieu, soulever des questions à propos de la représentation du vote du stockage des données.

#### Normalisation du vote

Le but de cette fonction est de produire une chaîne de caractères
normalisée. Admettons par exemple que le vote comporte 4 choix possibles : A, B, C et D. En fonction de la manière dont l’utilisateur aura rempli le formulaire, plusieurs situations peuvent se produire.

##### Le votant a clairement exprimé des choix différents

Par exemple : B => 1 ; C=> 2 ; A => 3 ; D => 4.

Dans ce cas, nous pouvons produire un tableau : [B, C, A, D]

##### Le votant a exprimé des équivalences de choix

Par exemple : B => 1 ; C => 2 ; A => 2 ; D => 4.

Ce choix et tout à fait licite. Il indique simplement une absence de préférence entre lesoptions C et A.

Dans ce cas, nous pouvons plutôt produire un tableau : [B, [C, A], D]

Remarquons que les nombres 1 .. 4 n’ont pas réellement d’importance. Ce qui compte c’est l’indice de l’option dans le tableau.

##### Le votant s’est abstenu dans certains choix

Par exemple : B => 1 ; C => NULL ; A => 2 ; D => 4.

Dans ce cas, les options non déterminées sont consédérées comme nulles. Vous pouvez alors considérer les deux stratégies suivantes :

1. Les nuls ne sont pas comptabilisés, doù le tableau [B, A, D]

2. Les nuls se voient attribuer l’importance moindre, d’où le tableau [B, A, D, C]

#### Analyse du vote

C’est la partie la plus complexe du système. Elle est décrite sur le simulateur donné en ressource. L’algorithme de Condorcet peut être
décrit de la manière suvante :

1. Pour chaque vote :
   
   1. Prendre un couple d’options ordonné (par exemple [A,B]) et initialiser un score à 0
      1. Si A est mieux classé que B, ajouter 1 au score
      2. Si B est mieux classe que A retrancher 1 au score
      3. Si A et B sont à égalité, rien
      4. Ranger le couple dans un tableau (ou le mettre jour s’il existe déjà)

2. La liste des couples est ensute triée par score décroissant.

3. L’étape suivante consiste à construire un graphe orienté
   
   1. Pour chaque couple :
      
      1. Si le score est positif ou nul, inscrire le premier élément comme clef d’un tableau associatif et ranger le second élément dans le tableau des valeurs avec le score
      2. Si le score est négatif, procéder à l’inverse
      3. Si la clef existait déjà, on met à jour simplement la liste des valeurs
         4. Si un cycle est détecté, le dernier arc est supprimé

4. On cherche maintenant dans ce nouveau tableau les choix qui ne sont pas référencés en tant que valeur (c’est-à-dire les choix qui gagnent sur tous le autres. S'il y en a plusieurs, on les classe suvant la somme des scores décroissante
   
       1. On supprime ces clefs du tableau  
       2. On recommance jusqu’à ce que le tableau soit vide

## Livrables

Votre rendu final prendra la forme d’une **archive Zip** et devra comporter tous les dossiers de l’application contenant votre code.

Votre code devra être correctement commenté, c'est-à-dire contenir des **DocStrings** Python permettant l'engendrement automatique de la documentation technique.

En option, des tests seraient bienvenus.

## Ressources

### Systèmes électoraux

- [Système électoraux](https://fr.wikipedia.org/wiki/Syst%C3%A8me_%C3%A9lectoral) [Wikipedia]
- [Méthode de Condorcet](https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Condorcet) [Wikipedia]
- [Méthode  de Schulze](https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Schulze) [Wikipedia]
- [Décider ensemble](https://www.deciderensemble.com/observatoire) [Observatoire de la Civic Tech]
- [Référentiel des « Civic Tech » actives en France](https://assets-global.website-files.com/65717d03eaee09aef74995dc/65ba6c3ad603ffd57115f451_VF_Analyse-referentiel-0522.pdf) [PDF]
- [Civic Tech](https://www.cnil.fr/fr/technologies/civic-tech) [CNIL]
- [Civic Tech, données et Demos](https://www.cnil.fr/fr/civic-tech-donnees-et-demos-une-exploration-des-interactions-entre-democratie-et-technologies) [CNIL]
- [Technologie civique](https://fr.wikipedia.org/wiki/Technologie_civique) [Wikipedia]

### Python

- [Flask - Manual](https://flask.palletsprojects.com/en/stable/)
- [PyMongo - Manual](https://pymongo.readthedocs.io/en/stable/index.html)
- [PyTest - Manual](https://docs.pytest.org/en/stable/)
- [Faker - Manual](https://faker.readthedocs.io/en/master/)
- [Commentaires Sphinx - Manuel](https://sphinx-rtd-tutorial.readthedocs.io/en/latest/docstrings.html)

### MongoDB

- [Manuel MongoDB](https://www.mongodb.com/docs/manual/

# 

[1](#sdfootnote1anc) Le nombre de couples peut être facilement estimé : `n * (n – 1)  / 2`, donc 6 couples is vous avez 4 choix possibles.
