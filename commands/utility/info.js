const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports={
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server')
        .addSubcommand((subcommand)=>
            subcommand
                .setName('user')
                .setDescription('Provides info about the user')
                .addUserOption((option)=>
                    option
                        .setName('target')
                        .setDescription('The user')
                )
        )
        .addSubcommand((subcommand)=>
            subcommand
                .setName('server')
                .setDescription('Provides info about the server.')
        ),
    async execute(interaction){
        //user Subcommand
        if(interaction.options.getSubcommand()==='user'){
            const member=interaction.options.getMember('target');
            if(member){
                await interaction.reply({
                    content: `Their name is ${member.user.username}, joined at ${member.joinedAt}`,
                    flags: MessageFlags.Ephemeral,
                });
            }
            else{
                await interaction.reply({
                    content: `Your name is ${interaction.user.username}, joined at ${interaction.member.joinedAt}`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
        //server Subcommand
        else if(interaction.options.getSubcommand()==='server'){
            await interaction.reply({
                content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`,
                flags: MessageFlags.Ephemeral,
            })
        }
    }
}