const TelegramBot = require('node-telegram-bot-api');
const program = require('commander');

//  Telegram token 
const token = '5242776915:AAEn2PMSnZ1fPakjEw0nQr7NswSx5zZkNPA';

// new bot 
const bot = new TelegramBot(token, {polling: false});

//id of my account
const chatId = '678654162';

// the message 
const message = 'Hello guys';

program
  .command('send-message <message>')
  .description('Send a message to Telegram')
  .action((message) => {
    bot.sendMessage(chatId, message);
  });


program
  .command('send-photo <path-to-photo>')
  .action((pathToPhoto) => {
    bot.sendPhoto(chatId, pathToPhoto)
      .then((response) => {
        console.log('Photo sent:', response);
      })
      .catch((error) => {
        console.error('Error sending photo:', error);
      });
  });

  program.parse(process.argv);
