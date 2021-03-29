const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();


let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
client.config = config;

let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds();
let time = (`[${hour}:${minute}:${second}] | `);

client.on('ready', () => {

    console.log(time + `\x1b[32m%s\x1b[0m`, '[ OK ]', '\x1b[0m', 'Connexion à l\'API Discord.js effectuée');
    console.log(time + `\x1b[36m%s\x1b[0m`, '[INFO]', '\x1b[0m', 'Connecté sur ' + client.user.username + '#' + client.user.discriminator);

    client.user.setActivity("Discord-NoPub", {
     type: "PLAYING",
    });
});

client.on('message', message => {

    let server = message.guild.id;
    if(server == config.server_ID && config.nopub){
      const pub = config.pub
      if (pub.some(words => message.content.includes(words))) {
         if(message.member.hasPermission("MANAGE_MESSAGES")) return
         
         message.delete()
         let pubdetect = new Discord.MessageEmbed()
             .setTitle(`🔎 Une publicité viens d'être détecté automatiquement !`)
             .addField(`⚡__Utilisateur__ :`, `<@${message.author.id}> / \`\`${message.author.id}\`\``)
             .addField(`🔒 __Statut de la pub__ :`, `Automatiquement supprimé 🗑️`)
             .addField(`📌 __Information__ :`, "Seul une personne avec la permission \`\`MANAGE_MESSAGES\`\`, peut envoyer des liens")
             .setColor("#FDC436")
         message.channel.send(pubdetect).then(message => message.delete({'timeout': 10000}))

         if(config.channel_LOG){
          let publog = new Discord.MessageEmbed()
             .setTitle(`🔎 Une publicité viens d'être détecté automatiquement !`)
             .addField(`⚡__Utilisateur__ :`, `<@${message.author.id}> / \`\`${message.author.id}\`\`}`)
             .addField(`🔒 __Statut de la pub__ :`, `Automatiquement supprimé 🗑️`)
             .addField(`📌 __Contenu__ :`, `\`\`${message.content}\`\``)
             .setColor("#FDC436")
             client.channels.cache.get(config.channel_LOG).send(publog)
         }

        }
    }
     
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content.indexOf(config.prefix) !== 0) return;
    
    if(command === "setup"){
     if(!message.member.hasPermission("ADMINISTRATOR")) return
     if(server !== config.server_ID) return
     
     if(args[0] == "on"){

      if(config.nopub) return message.channel.send(`Le système NoPub est déjà activé !`)
       config.nopub = true
       fs.writeFile("./config.json", JSON.stringify (config, null, 4), err => {if (err) console.log(err)});
       message.channel.send(`Le système NoPub est maintenant activé !`)

     }else if(args[0] == "off"){

      if(!config.nopub) return message.channel.send(`Le système NoPub est déjà désactivé !`)
       config.nopub = false
       fs.writeFile("./config.json", JSON.stringify (config, null, 4), err => {if (err) console.log(err)});
       message.channel.send(`Le système NoPub est maintenant désactivé !`)
      
     }
    }
})

client.login(config.token);