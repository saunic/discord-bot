// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token, clientID, guildID } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// When the client is ready, run this code (only once)
client.on("ready", () => {
  console.log("Ready!");
});

// Slash commands

const commands = [
  new SlashCommandBuilder()
    .setName("add")
    .setDescription("adds two numbers together")
    .addIntegerOption((option) =>
      option.setName("num1").setDescription("first number").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("num2").setDescription("second number").setRequired(true)
    ),
].map((command) => command.toJSON());
const rest = new REST({ version: 9 }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), {
  body: commands,
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "add") {
    const num1 = interaction.options.getInteger("num1");
    const num2 = interaction.options.getInteger("num2");
    await interaction.reply(`${num1 + num2}`);
    return;
  }
  // if (interaction.commandName === "hello") {
  //   await interaction.reply("Hello World!");
  //   return;
  // }
  // if (interaction.commandName === "info") {
  //   await infoHandler(interaction);
  //   return;
  // }
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("!hello")) {
    message.channel.send("hello!");
  } else if (message.content.startsWith("!ping")) {
    message.channel.send("Pong!");
  } else if (message.content.startsWith("!embed")) {
    const embed = new MessageEmbed()
      .setTitle("Embed")
      .setDescription(message.content.slice(7))
      .setAuthor({
        name: message.author.username,
        iconURL: "https://i.imgflip.com/69vvn3.jpg",
        url: message.url,
      });

    message.channel.send({
      content: "Hey this is your embed",
      embeds: [embed],
    });
  }
});

// Login to Discord with your client's token
client.login(token);
