const { REST, Routes } = require('discord.js');

const rest=new REST().setToken(process.env.BOT_TOKEN);

const input=process.argv[2];

let commandId;
(async() =>{
    const commands=await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID));
    commands.forEach(command => {
        if(command.name===input){
            commandId=command.id;
            console.log(`Found command: ${command.name} ${commandId}`);
        }
    });

    //Delete for guild-based commands
    await rest
        .delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, commandId))
        .then(() => console.log('Successfully deleted guild command'))
        .catch(console.error);

    //Delete for Global Commands
    // await rest
    //     .delete(Routes.applicationCommand(process.env.CLIENT_ID, commandId))
    //     .then(() => console.log('Successfully deleted application command'))
    //     .catch(console.error);
})();