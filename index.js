const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "NzAyMjU4Nzc4NTA2MDAyNDMz.Xp9bhQ.9K6_qLOxqBJDlPiWqzWTa2R9tMQ";

bot.on("ready", () => {
  console.log("Goose is on");
});

bot.login(token);
