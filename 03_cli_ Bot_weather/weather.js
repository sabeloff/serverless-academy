const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');


//  Telegram token MoodWeatherBot
const token = '5740557658:AAFpCROOT79Ynh4ngXnE_YLlWRvnM_vcdYY';

// new bot 
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Choose the forecast period:", {
    reply_markup: {
          keyboard: [
          [{ text: '3-hour'}],//menu
          [{ text: '6-hour'}],
          [{ text: '12-hour' }],
          [{ text: '24-hour'}],
        ],
        one_time_keyboard: true,
      
    },
  });
});

bot.onText(/^(3-hour|6-hour|12-hour|24-hour)$/, (msg, match) => {
  console.log('receive hours');
  const chatId = msg.chat.id;
  const period = match[1];
  
  const apiKey = '5e4caface96b5ef824bd936b0d271bbc';//API key
  const city = 'Paris'; // My city
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {
      

      const forecastList = response.data.list.filter((item, index) => {
        if (period === '3-hour') {
          return index % 1 === 0;//take every record
        } else if (period === '6-hour') {
          
          return index % 2 === 0;//take every second record
        } else if (period === '12-hour') {
          
          return index % 4 === 0;//take every four record
        } else {
          
          return index % 8 === 0;//take every eight record
        }
      });

      const forecastText = forecastList.map((item) => {
        return `${item.dt_txt}: ${item.main.temp}°C`;//dt_txt - date
      }).join('\n');
      
      bot.sendMessage(chatId, `Here is the ${period} forecast for ${city}:\n${forecastText}`);
    })
    .catch(error => {
      bot.sendMessage(chatId, 'Sorry, there was an error retrieving the forecast.');
    });
});