const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } = require('discord.js');
const { token } = require('./config.json');

var exec = require('child_process').exec;
var http = require('http');
let serverip;

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    serverip = ip;
  });
});

const client = new Client({ intents: 32267});
let running = false;
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('RentnerSMP');
});
//How the program reacts to certain commands
client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
		console.log(`${interaction.user.tag} used /ping!`);
	}
	if (commandName === 'hello') {
		await interaction.reply('Hello World!');
		console.log(`${interaction.user.tag} used /hello!`);
	}
	if (commandName === 'start') {
		await console.log(`${interaction.user.tag} used /start!`);
		if (!running) {
			running = true;
			await interaction.reply('Starte Server!');
			//Important: replace with your own values
			//          ServerDir           java Arguments          ServerName
			child = exec('cd && cd Server &&java -Xmx4G -Xms4G  -jar quilt-server-launch.jar',
				function (error, stdout, stderr) {
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
		console.log(`${interaction.user.tag} used /stop!`);
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
		console.log(`${interaction.user.tag} used /status!`);
		if (running) {
			interaction.reply('Server läuft gerade, komme drauf und spiel mit!');
		}
		else {
			interaction.reply('Server ist gerade offline, starte ihn mit /start!');
		}
	}
	if (commandName === 'help') {
		console.log(`${interaction.user.tag} used /help!`);
		await interaction.reply('Die Commands: \n - /help: zeigt Hilfe an \n - /pingt: ping den Bot \n - /hello: schreibt "Hello world!" als Antwort \n - /status: zeigt an, ob der Server online ist \n - /start: startet den Minecraft Server \n - /stop: stoppt den Minecraft Server \n - /roles: wähle die Rollen aus, die du willst \n - /ip: zeigt die aktuelle IP des Servers an (weil Kirill zu dumm ist, eine statische zu haben)');
	}
	if (commandName === 'roles') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('server')
					.setLabel('Minecraft Server Updates')
					.setEmoji('1001740923950080040')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('textures')
					.setLabel('Resource Packs Updates')
					.setEmoji('1001738897384013825')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('bot')
					.setLabel('Bot Updates')
					.setEmoji('1001435297231413319')
					.setStyle(ButtonStyle.Secondary),
			);

		await interaction.reply({ content: 'Wähle die Rollen, die du willt, hier aus:', components: [row] });
		console.log(`${interaction.user.tag} used /roles!`);
	}
	if (commandName === 'ip') {
		console.log(`${interaction.user.tag} used /ip!`);
		http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  			resp.on('data', function(ip) {
    				serverip = ip;
 		 	});
		});
		await interaction.reply('Das ist die (heutige) IP vom Server: ' + serverip);
	}
}
if (interaction.isButton()){

	if (interaction.customId === 'server'){
		if(!interaction.member.roles.cache.some(role => role.name === 'Server Updates')) {
			interaction.member.roles.add('1001441493787090994');
			await interaction.reply({content: 'Gebe dir die Server Updates Rolle!', ephemeral: true});
		}
		else{
			interaction.member.roles.remove('1001441493787090994');
			await interaction.reply({content: 'Du hast die Rolle schon, entferne...', ephemeral: true})
		}
		console.log(`${interaction.user.tag} clicked the 'server' button!`);
	}
	if (interaction.customId === 'textures'){
		if(!interaction.member.roles.cache.some(role => role.name === 'RP Updates')) {
			interaction.member.roles.add('1001441694924947498');
			await interaction.reply({ content: 'Gebe dir die Resource Pack Updates Rolle!', ephemeral: true});
		}
		else{
			interaction.member.roles.remove('1001441694924947498');
			await interaction.reply({content: 'Du hast die Rolle schon, entferne...', ephemeral: true})
		}
		console.log(`${interaction.user.tag} clicked the 'textures' button!`)
	}
	if (interaction.customId === 'bot'){
		if(!interaction.member.roles.cache.some(role => role.name === 'Bot Updates')) {
			interaction.member.roles.add('1001441812147339275');
			await interaction.reply({content:'Gebe dir die Bot Updates Rolle!', ephemeral: true});
		}
		else{
			interaction.member.roles.remove('1001441812147339275');
			await interaction.reply({content:'Du hast die Rolle schon, entferne...', ephemeral: true});
		}
		console.log(`${interaction.user.tag} clicked the 'bot' button!`)
	}
}});

client.login(token);
