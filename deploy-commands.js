const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { clientId, guildId, token } = require('./config.json');
//Registers the commands
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Ping Pong!'),
	new SlashCommandBuilder().setName('hello').setDescription('"Hello World!" als Antwort'),
	new SlashCommandBuilder().setName('start').setDescription('Startet den Minecraft Server'),
	new SlashCommandBuilder().setName('stop').setDescription('Stoppt den Minecraft Server.'),
	new SlashCommandBuilder().setName('status').setDescription('Zeigt an, ob der Server läuft'),
	new SlashCommandBuilder().setName('help').setDescription('Wenn du mal nicht weißt, was du machen musst'),
	new SlashCommandBuilder().setName('roles').setDescription('Wähle die Rollen aus, die du haben willst!'),
	new SlashCommandBuilder().setName('ip').setDescription('Zeigt die aktuelle IP des Servers an')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
