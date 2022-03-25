// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.on("ready", () => {
  console.log("Ready!");
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
