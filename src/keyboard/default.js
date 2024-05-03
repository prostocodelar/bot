import text from '../var/var.js'
import dotenv from "dotenv"
dotenv.config()

export const create_site = (id) => {
    const chat_id = msg.chat.id;
    return {
        keyboard: [[{
            text: text.t5,
            web_app: {
                url: `https://data.abdullayev.uz/${chat_id}`
            }
        }]],
        one_time_keyboard: true,
        resize_keyboard: true
    }
}

export const send_phone = {
    keyboard: [[{
        text: 'Telefon Raqam jonatish 📲',
        request_contact: true,
    }]],
    one_time_keyboard: true,
    resize_keyboard: true
}