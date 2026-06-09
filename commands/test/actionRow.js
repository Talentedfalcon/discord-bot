const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, time } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder().setName('actionrow').setDescription('Test for interactive components'),
    async execute(interaction){

        //BUTTONS
        const b1=new ButtonBuilder().setCustomId('Primary').setLabel('Primary').setStyle(ButtonStyle.Primary);
        const b2=new ButtonBuilder().setCustomId('Secondary').setLabel('Secondary').setStyle(ButtonStyle.Secondary);
        const b3=new ButtonBuilder().setCustomId('Success').setLabel('Success').setStyle(ButtonStyle.Success);
        const b4=new ButtonBuilder().setCustomId('Danger').setLabel('Danger').setStyle(ButtonStyle.Danger);
        const b5=new ButtonBuilder().setLabel('Link').setURL('https://www.google.com').setStyle(ButtonStyle.Link);

        const b6=new ButtonBuilder().setCustomId('primary').setLabel('Primary').setStyle(ButtonStyle.Primary).setEmoji('😀'); 
        
        const row=new ActionRowBuilder().addComponents(b1,b2,b3,b4,b5);
        // const row=new ActionRowBuilder().addComponents(b6);

        //SELECT MENUS
        const starterPokemon=new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('Make a selection')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bulbasaur')
                    .setDescription('Weed')
                    .setValue('bulbasaur'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Charmander')
                    .setDescription('Fire')
                    .setValue('charmander'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Squirtle')
                    .setDescription('Squad')
                    .setValue('squirtle')
            )
            .setMinValues(1)    //For multiple select
            .setMaxValues(3);

        // const row=new ActionRowBuilder().addComponents(starterPokemon);

        const response=await interaction.reply({
            content: "This is just a test!!",
            components: [row],
            withResponse: true
        });

        try{
            const message=await response.resource.message.awaitMessageComponent({time: 10_000});
            console.log(message.values);
            await message.update({
                content:`Response: ${message.customId}`,
                components: []
            })
        }
        catch{
            await interaction.editReply({
                content:"Timeout: No reply received",
                components: []
            });
        }
    }
}