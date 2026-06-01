const { SlashCommandBuilder } = require('discord.js');

module.exports={
    cooldown: 5,
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction){
        const sent=await interaction.reply({
            content: 'Pinging...',
            withResponse: true
        });
        // console.log(sent.resource.message);
        interaction.editReply(`Roundtrip latency: ${sent.resource.message.createdTimestamp-interaction.createdTimestamp}ms`);
    },
};