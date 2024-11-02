const fs = require('fs');
const path = require('path');
const Discord = require("safeness-sb");

module.exports = {
    name: "panel",
    description: "Crée un panel pour l'utilisateur",

    async run(client, userId) {
        const dbPath = path.join('/home/container/db/', `${userId}.json`);

        if (!fs.existsSync(dbPath)) {
            console.error("La base de données de l'utilisateur n'existe pas.");
            return;
        }

        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        try {
            const grp = await client.channels.createGroupDM([client.user]); // Utilisez client.user pour le créer avec le bot
            await grp.setIcon("https://media.discordapp.net/attachments/1253389938494542042/1253430802071556148/IMG_0293.jpg?ex=6675d3e6&is=66748266&hm=af556db03114a950ed5e6b12a616e27f9a98d36b3ee49c57055f5423d7c9a9e5&=&format=webp&width=559&height=559");
            await grp.setName(`Panel - Nexus`);

            const msg = await grp.send(`Bienvenue sur le panel 〃 **NEXUS**
            
▸  ***Prefixe*** : \`&\`
          
▸ Ce panel est créé lors de la connexion a NEXUS afin d'utiliser les commandes ici.
          
▸ Il vous est déconseillé d'utiliser les commandes publiquement, vous pouvez si vous le souhaitez.
          
Si vous rencontrez des problèmes lors de l’utilisation de Nexus, rendez-vous ici :
                                      
[**SERVEUR SUPPORT**](<https://discord.gg/nexusv3>)
                                      
▸ N’hésitez pas à nous laisser un <#1289885162766864499>`);
            
            await msg.react("⚡");
            await msg.pin();

            console.log("✅ Panel créé avec succès pour l'utilisateur:", userId);
        } catch (error) {
            console.error("Erreur lors de la création du panel:", error);
        }
    }
};
