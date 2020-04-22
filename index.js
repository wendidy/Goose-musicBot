const Discord = require("discord.js");
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const token = "NzAyMjU4Nzc4NTA2MDAyNDMz.Xp9bhQ.9K6_qLOxqBJDlPiWqzWTa2R9tMQ";

const PREFIX = "!";

var servers = {};

bot.on("ready", () => {
  console.log("Goose is on");
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
//this is also a way to check if url is valid
// let validate = ytdl.validateURL(args[1]);
// if (!validate) return ("Needs to be Url");

bot.on("message", (m) => {
  if (m.content[0] != "!") return;

  let args = m.content.slice(PREFIX.length).split(" ");
  switch (args[0]) {
    case "play":
      function play(connection, m) {
        var server = server[m.guild.id];
        server.dispatcher = connection.playStream(
          ytdl(server.queue[0], { filter: "audioonly" })
        );
        server.queue.shift();
        server.dispatcher.on("end", function () {
          if (server.queue[0]) {
            play(connection, m);
          } else {
            connection.disconnect();
          }
        });
      }

      if (!args[1]) {
        m.reply("you need to give me an url, brother");
        return;
      }
      if (!validURL(args[1])) {
        m.reply("URL not valid, check again!");
        return;
      }
      if (!m.member.voice.channel) {
        //if this memebr is not in a voice channel
        m.reply("You must be in a voice channel in order to activate this!");
        return;
      }
      if (!servers[m.guild.id])
        servers[m.guild.id] = {
          queue: [],
        };

      var server = servers[m.guild.id];

      server.queue.push(args[1]);
      console.log(server.queue[0]);

      if (!m.guild.voiceConnection) {
        m.member.voice.channel.join().then(function (connection) {
          play(connection, m);
        });
      }
      break;

    case "skip":
      var server = servers[m.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      m.channel.send("Skipping the song");
      break;

    case "stop":
      var server = servers[m.guild.id];
      if (m.guild.voiceConnection) {
        for (var i = server.queue.length - 1; i >= 0; i--) {
          server.queue.splice(i, 1);
        }
        server.dispatcher.end();
        m.channel.send("Ending the queue, leaving the voice channel");
        console.log("stop the queue");
      }
      if (m.guild.connection) m.guild.voiceConnection.disconnect();
      break;
  }
});

bot.login(token);
