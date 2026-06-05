const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require('discord.js');

//WIP
module.exports={
    data: new ContextMenuCommandBuilder().setName('User Information').setType(ApplicationCommandType.User),
    async execute(interaction){
        if(!interaction.isUserContextMenuCommand()) return;
        const { username } = interaction.targetUser;
        // console.log(username);
        await interaction.reply({
            content: username,
            flags: MessageFlags.Ephemeral 
        });
    }
}