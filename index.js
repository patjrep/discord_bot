const Discord = require("discord.js")
const client = new Discord.Client()
require('dotenv').config();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.money = new Map();
client.inventory = new Map();

client.on("message", msg => {

const ID = msg.author.username;

  if (msg.content === "i dont feel so good") {
    msg.reply("This man boutta ralph", {
      files: [
        "./images/bigvom.png"
      ]
    });
  };

  if (msg.content === "spook.jpg") {
    msg.reply("noise", {
        files: [
          "./images/FullSizeRender.jpeg"
        ]
      })
    };

  //Gives user a random amount of money
  if (msg.content === "Give me wealth") {
    if (client.money.get(ID)) {
      msg.reply("You already recieved wealth and have $" + client.money.get(ID));
    } else {
      let rand_amount = Math.ceil(Math.random()*1000000)
      client.money.set(ID, rand_amount)
      msg.reply("Of course. You now have $" + rand_amount)
      console.log(client.money.get(ID));
    };
  };

  //Replies with the top 3 richest users
  if (msg.content === "Who's the richest?") {
    let count = 0;
    var keys = [...client.money.keys()];
    var values = [...client.money.values()];
    top_three = [];
    var sort_vals = top_three.sort();
    //pushes keys and values from client.money map() to top_three array
    while (count < keys.length) {
      top_three.push(keys[count] + ' with $' + values[count] + '\n')
      count ++
    }
    console.log(top_three);
    msg.reply("The richest 3 are:\n" + sort_vals) //top_three)
  };

  if (msg.content === "What's in stock?") {
    stocked_items = {"cat": 500, "dog": 700, "lucy": 9999};
    stocked_arr = [];
    //pushes keys and values from stocked_items to stocked_arr
    for (i in stocked_items) {
      stocked_arr.push(i + ' $' + stocked_items[i] + '\n')
    }
    msg.reply(stocked_arr + '\n\n' + 'Would you like to buy anything? Y/N')
    console.log(stocked_arr)

    //Gets reply message, determines what is purchased, and gives it to user / removes from arr
    let collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
        console.log(collector);
        collector.on('collect', msg => {
            if (msg.content == "Y" || msg.content == "y") {
                msg.channel.send("Ok, what do you want to buy? (1, 2, 3...)");
                let reply = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
                reply.on('collect', msg => {
                  buy = msg.content;
                  console.log(stocked_arr.length);
                  if (isNaN(buy) == false && (0 <= buy <= stocked_arr.length)) {
                    choice = buy - 1;
                    var keys = [...stocked_items.keys()];
                    var values = [...stocked_items.values()];
                    console.log(choice)
                    client.inventory.set(ID, stocked_arr[choice]);
                    console.log(client.inventory)
                    msg.reply("You bought a " + stocked_items(keys[choice] + values[choice]) + "!")
                  } else {
                    msg.reply("That choice doesn't exist!")
                  }
                })
            }
            else if (msg.content == "N" || msg.content == "n") {
                msg.channel.send("Goodbye");
            }
        })


    //dict.push({
      // key:   "keyName",
      // value: "the value"
  //});

  };

  if (msg.content === "How wealthy am I?") {
    msg.reply("You currently have $" + client.money.get(ID));
  };

  if (msg.content === "**commands") {
    msg.reply("\n 'i dont feel so good' \n 'spook.jpg' \n 'Give me wealth' \n 'How wealthy am I?' \n 'Who's the richest?")
  };

});

client.login(process.env.CLIENT_TOKEN);