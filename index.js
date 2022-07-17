const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

var exec = require('child_process').exec;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let running = false;
client.once('ready', () => {
	console.log('Ready!');
});
//How the program reacts to certain commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
		await console.log(`${interaction.user.tag} used /ping!`);
	}
	if (commandName === 'hello') {
		await interaction.reply('Hello World!');
		await console.log(`${interaction.user.tag} used /hello!`);
	}
	if (commandName === 'start') {
		await console.log(`${interaction.user.tag} used /start!`);
		if (!running) {
			running = true;
			await interaction.reply('Starte Server!');
			//Important: replace with your own values
			//          ServerDir           java Arguments          ServerName
			child = exec('cd && cd Server &&java -Xmx4G -Xms2G -jar server.jar',
				function (error, stdout, stderr) {
					console.log('stdout: ' + stdout);
					console.log('stderr: ' + stderr);
					if (error !== null) {
						console.log('exec error: ' + error);
					}
				});
			}

		else {
			interaction.reply('Server läuft noch; nicht doppelt startbar!');
    		}
		}
	if (commandName === 'stop') {
		await console.log(`${interaction.user.tag} used /stop!`);
		if (!running) {
			interaction.reply('Server läuft nicht; ist schon gestoppt!');
		}
		else {
			interaction.reply('Stoppe Server!');
			console.log('Stopping server!');
			child.stdin.write('stop\n');
			running = false;
		}
	}
	if (commandName === 'status') {
		await console.log(`${interaction.user.tag} used /status!`);
		if (running) {
			interaction.reply('Server läuft gerade, komme drauf und spiel mit!');
		}
		else {
			interaction.reply('Server ist gerade offline, starte ihn mit /start!');
		}
	}
	if (commandName === 'help') {
		await console.log(`${interaction.user.tag} used /help!`);
		await interaction.reply('Die Commands: \n - /help: zeigt Hilfe an \n - /pingt: ping den Bot \n - /hello: schreibt "Hello world!" als Antwort \n - /status: zeigt an, ob der Server online ist \n - /start: startet den Minecraft Server \n - /stop: stoppt den Minecraft Server');
	}
});

client.login(token);
