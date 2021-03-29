# Discord-NoPub 🚫
Discord-NoPub est un bot discord [FR] supprimant les pubs discord ou les liens. 

⚠️ **Ne supporte pas le multiserveur !**

<img src="https://zupimages.net/up/21/13/av22.png" style="margin-right: 2px;width: 100%;" ></img>

## Installation

* Cloner le repository
* Installer les dépendances avec NPM `npm install`
* Modifier le ficher *config.json*
* Démarrer le bot `node index.js` 

## Configuration

🔧 Une configuration 100% personalisable ! 

⚠️ Toutes les personnes avec la permission `MANAGE_MESSAGE` peuvent envoyer des liens

### Config.json
```json
{
    "prefix": "nopub!",
    "token": "YOUR_PREFIX",
    "server_ID": "ID_SERVEUR",
    "channel_LOG": "LOGCHANNEL_SERVEUR",
    "nopub": true,
    "pub": [
        "discord.me",
        "discord.io",
        "discord.gg",
        "invite.me",
        "discordapp.com/invite",
        ".fr"
    ]
}
```

## Commande

La commande `nopub!setup on/off` permet d'activer ou désactiver le système de pub (**ADMINISTRATOR**)