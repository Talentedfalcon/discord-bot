const { REST, Routes } = require('discord.js');

const rest=new REST().setToken(process.env.BOT_TOKEN);

const input=process.argv[2];

(async() =>{
    //Delete for guild-based commands
    await rest
        .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),{body:[]})
        .then(() => console.log('Successfully deleted all guild command'))
        .catch(console.error);

    //Delete for Global Commands
    // await rest
    //     .put(Routes.applicationCommands(process.env.CLIENT_ID),{body:[]})
    //     .then(() => console.log('Successfully deleted all application command'))
    //     .catch(console.error);
})();