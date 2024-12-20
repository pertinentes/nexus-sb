const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "my-users",
    description: "Obtient tes informations (token etc)",
    permissions:  "Aucune",

    async run(bot, interaction) {
        const userId = interaction.user.id;

        const configPath = './config.json';
        let configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const userConfigData = configData.user[userId] || {};



       try {
        const dbData = JSON.parse(fs.readFileSync(`./db/${userId}.json`, 'utf8'));

        const embed = new Discord.EmbedBuilder()
            .setColor("Purple")
            .setTitle('Informations du compte')
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .addFields(
                { name: 'Id', value: userId },
                { name: 'Pseudo', value: interaction.user.username },
                { name: 'Token', value: userConfigData.token || 'Aucun' },
                { name: 'Prefixe', value: dbData.prefix || 'Aucun' },
                { name: 'Settings RPC', value: 'Titre: ' + dbData.rpctitle + '\nDétail: ' + dbData.rpcdetails + '\nState: ' + dbData.rpcstate + '\nType: ' + dbData.rpctype + '\nImage: ' + dbData.rpclargeimage },
                { name: 'Status', value: dbData.status || 'Aucun' },
                { name: 'Nitro Sniper', value: dbData.nitrosniper ? 'Activé' : 'Désactivé' }
            );


            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error);
            await interaction.reply({content: "Il semble que tu ne soit pas connecté... Rendez-vous sur ce site : https://nexus-sb.online/ !", ephemeral: true});
        }
    },
};