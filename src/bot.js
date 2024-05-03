import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import { create_site, send_phone } from "./keyboard/default.js";

dotenv.config();

const token = "6796134838:AAE-GPDSbVLGq7OFQX3fogvx7HytVhAPXU0";
const API = 'https://tech-store.uz/client/check/';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const data = ()=>{
        fetch(API + chatId).then(res => res.json()).then(data =>
           {
            console.log(data);
            if(data.status == 200){
                bot.sendMessage(chatId, 'Assalomu alaykum mahsulotlarni sotib olish uchun web ilovani ishga tushuring',{
                    reply_markup:{
                        keyboard: [[{
                            text: 'Web ilovani ishga tushurish',
                            web_app: {
                                url: `https://alik.abdullayev.uz/${chatId}/category`
                            }
                        }]],resize_keyboard: true,
                    }
                });
            }
            else{
                console.log(send_phone);
                bot.sendMessage(chatId, "Siz ro'yhatdan o'tmagansiz. Iltimos telefon raqamini ulashish tugmasini bosing",{
                    reply_markup: send_phone
                } );
            }

           } 
        )
    }

    data();
});

bot.on('contact', (msg) => {
    const chat_id = msg.chat.id;
    const phone_number = msg.contact.phone_number;
    const username = msg.contact.first_name;
    const data = {
        username: username ,
        chat_id: `${chat_id}`, 
        phone_number: phone_number, 
    };
    const ADD = "https://tech-store.uz/client/create/"
    fetch(ADD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => res.json()).then(data => {
        console.log(data);
        if(data.status == 201){
            bot.sendMessage(chat_id, 'Rahmat! \nMahsulotlarimizni harid qilish uchun web ilovani ishga tushuring',{
                reply_markup:{
                    keyboard: [[{
                        text: 'Web ilovani ishga tushurish',
                        web_app: {
                            url: `https://alik.abdullayev.uz/${chat_id}/category`
                        }
                    }]],resize_keyboard: true,
                }
            });
        }
        else{
            bot.sendMessage(chat_id, "Siz ro`yhatdan o`tib bo'lgansiz! Iltimos /start ni bosing");
        }
    }).catch((error) => console.error('Error:', error));
});