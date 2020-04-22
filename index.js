const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "NzAyMjU4Nzc4NTA2MDAyNDMz.Xp9bhQ.9K6_qLOxqBJDlPiWqzWTa2R9tMQ";

const PREFIX = "!";

var server = {};

bot.on("ready", () => {
  console.log("Goose is on");
});

bot.on(m, (m) => {
  if (m.conten[0] != "!") return;

  let args = m.content.slice(PREFIX.length).split(" ");
  switch (args[0]) {
    case "play":
      if (!args[1]) {
        m.reply("you need to give me an url, brother");
        return;
      } else if (!validURL(args[1])) {
        m.reply("URL not valid, check again!");
        return;
      } else {
        if (!m.member.voiceChannel) {
          //if this memebr is not in a voice channel
          m.reply("You must be in a voice channel in order to activate this!");
          return;
        }
      }
      break;
  }
});

//copied this from stack overflow, thank you!
//ref: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

bot.login(token);
