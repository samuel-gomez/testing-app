# Exo 9 : Création d'un contexte pour un formulaire

## Refacto champ de formulaire

On va d'abord créer un composant de champ de formulaire plus générique
On l'appellera Input, il prendra en paramètre les mêmes propriétés que le SearchInput avec en plus une propriété icon (string)

> Note : n'oubliez pas de changer la class SearchInput par Input
> et de déplacer le css dans le composant Input
> Puis on remplacera le code SearchInput par :

```javascript
import Input from "../Input";
const SearchInput = (props) => <Input icon="search" {...props} />;
```

## Création de la page Formulaire d'ajout

Le but est de proposer un formulaire qui permettra d'ajouter une nouvelle personne

### Créer un nouveau composant de page AddPeople

- Créer le composant dans le dossier /pages
- dans le composant affichez 'Addpeople' (n'oubliez pas d'exporter le composant)
- Ajouter la route sur le router /add-people
- Ajouter le lien dans AppBar

### Formulaire

- Créer un d'abord un container
- une balise form sans attribut pour le moment
- Ajoutez les champs suivants à l'aide du composant Input :

  - firstname (label : 'The firstname', icon: 'face' )
  - lastname (label : 'The lastname', icon: 'account_circle')
  - email (label : 'The email', icon: 'email')
  - manager (label : 'The manager', icon: 'supervisor_account')
  - un bouton de sousmission (label : 'Soummettre' ) https://materializecss.com/buttons.html
  - les noms des icones : https://materializecss.com/icons.html

### Contexte

- Créer un contexte qui va permettre de gérer les données du formulaire FormContext (createContext)
- valeur d'initialisation :

```javascript
{
  data: {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@gmail.com",
    manager: "unknown"
  },
  onChange: () => ({})
}

```

> data contiendra les valeurs des champs et onChange permettra aux champs de mettre à jour le contexte

### Création du composant Form qui va gérer l'état du context

- Créer un composant Form
- il recevra 3 propriétés : defaultValue, onSubmit, children
- Ce composant renverra la balise form entourée du provider
  Exemple :

```javascript
return (
  <Provider value={}>
    <form>{children}</form>
  </Provider>
);
```

### dans AddPeople

- Remplacer la balise form de AddPeople par le composant Form
- et mettre comme defaultValue

```javascript
{
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  manager: "unknown"
}
```

### dans Form, ajouter une gestion d'état pour gérer le contexte

- créer l'état pour data/setData à l'aide d'un useState
- l'init de l'état sera defaultValue (la valeur des champs par defaut)
- créer un handler handleChange, il recevra l'event d'un champ et mettre à jour l'état avec setData
- créer une constante value au même format que le context avec les valeurs de data et handleChange
- attribuer la value du provider

### Connecter les champs au context

- créer un nouveau composant InputWithContext
- ce composant va récupérer le context
- il retourne le composant Input avec les props d'entrée et en plus la value récupérée du
- on ajoute également la propriété onChange du contexte
- remplacer les champs Input de AddPeople par InputWithContext

> Un petit bug d'affichage peut survenir sur les champs
> Ajouter ce code dans AddPeople pour le résoudre

```javascript
useEffect(() => {
  window.M.updateTextFields();
}, []);
```

### Soumission

> On va afficher le résultat de la soumission du formulaire dans la console

- Ajouter un handler handleSubmit dans le composant form
  il recevra l'event du formulaire
- on stoppera le comportement natif de la soumission
- on exécute le onSubmit reçu en props avec en paramètre value
- maintenant il faut créer la fonction onSubmit envoyée en props de Form dans AddPeople
- cette fonction recevra donc la value et fera un console.log de value

## Affichage des données

- Ajouter un titre en dessous du bouton
- Ajouter une liste qui affiche les données du formulaire
  (https://materializecss.com/collections.html)
- créer un composant DisplayData et afficher les valeurs du formulaire
