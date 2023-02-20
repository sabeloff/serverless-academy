const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });


const token = '_____deleted____';
const bot = new TelegramBot(token, { polling: true });
const endpoint='https://api.monobank.ua/bank/currency';

const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{text: 'Select Currency',
        callback_data: 'SC',
        }]
    ],
    resize_keyboard: true,
    one_time_keyboard: true

  }
};

const currencyMenu = {
  reply_markup: {
    inline_keyboard: [[
      
        {text:'USD',
      callback_data:'USD'},

       {text:'EUR',
       callback_data:'EUR'}]
           
    ],
    resize_keyboard: true,
    one_time_keyboard: true
  }
};


bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start' ) {
      bot.sendMessage(chatId, 'Welcome to the Exchange Bot!', mainMenu);
     }  
});


bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
   if(query.data==='SC') { bot.sendMessage(chatId, 'Please select a currency:', currencyMenu); 
      const cachedRateU = cache.get('usd');
      const cachedRateE = cache.get('eur');

      if(!cachedRateU && !cachedRateE){
                  const response = await axios.get(endpoint);              
                  const usdRate = response.data.find(rate => rate.currencyCodeA === 840 && rate.currencyCodeB === 980).rateBuy;
                  const eurRate = response.data.find(rate => rate.currencyCodeA === 978 && rate.currencyCodeB === 980).rateBuy;
                  cache.set('eur', eurRate, 120);
                  cache.set('usd', usdRate, 120);
                  console.log(cache.get('usd'));
                  console.log(cache.get('eur'));
      };
  
  }

   else {
        if(query.data==='USD'){ 
          const cachedRate = cache.get('usd');
          bot.sendMessage(chatId, `1 USD is currently worth ${cachedRate} UAH`,mainMenu);}
                
        if(query.data==='EUR'){
        const cachedRate = cache.get('eur');
         bot.sendMessage(chatId, `1 EUR is currently worth ${cachedRate} UAH`,mainMenu);}
       }   
  
});

