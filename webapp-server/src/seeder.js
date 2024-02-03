import dotenv from 'dotenv';
dotenv.config({path: '.env'});

import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { User } from './models/user.model.js';
import {users} from "./data/users.js";
import {chats} from "./data/chats.js";
import {Chat} from "./models/chat.model.js";
import { Message } from './models/message.model.js';

function generateChatMessage(chatId, senderId, index){
    return {
            "sender": chatId,
            "content": `Hey this is message from ${senderId} in chat ${chatId} --- ${index}`,
            "chat": chatId
    }
}

try {
    connectDB();
    
    const importData = async () =>  {
        try {
            await User.deleteMany();
            console.log('inside import : Data deleted successfully');
    
            const exportUser = await User.insertMany(users);

            await Chat.deleteMany();
            await Message.deleteMany();
            for(let i=0; i<chats.length; i++){
                let currObj = chats[i];
                let userIdArr = [];
                for(let j=0; j<currObj.users.length; j++){
                    let currUser = currObj.users[j];
                    let userDetails = await User.find({email: currUser.email});
                    userIdArr.push(new mongoose.Types.ObjectId(JSON.stringify(userDetails._id)));
                }
                currObj.users = userIdArr;

                const exportChat = await Chat.create(currObj);

                for(let k=0; k<exportChat.users.length; k++){
                    let chatMessage = generateChatMessage(exportChat._id, exportChat.users[k], k);
                    await Message.create(chatMessage);
                }
            }
            process.exit();
        } catch (error) {
            console.log(`${error}`)
            process.exit(1);
        }
    }
    
    const destroyData = async () => {
        try {
            await User.deleteMany();
            await Chat.deleteMany();
            await Message.deleteMany();
            console.log('Data destroyed successfully');
            process.exit();
        } catch (error) {
            console.log(`${error}`)
            process.exit(1);
        }
    }
    
    if(process.argv[2] === '-d'){
        destroyData();
    }
    else {
        importData();
    }
} catch (error) {
    console.log(error)
}


/*
chatmessage obj
    "_id": {
        "$oid": "65bd80820cccb6e36b24295b"
      },
      "chatName": "sender",
      "isGroupChat": false,
      "users": [
        {
          "$oid": "65bd5f4c71b6a5d6af328dd4"
        },
        {
          "$oid": "65bd4e7a80feb47536eb1fe8"
        }
      ],
      "__v": 0,
      "latestMessage": {
        "$oid": "65bd97e1730af818c62b51cf"
      }
    }

*/


/*
messageObj
{
  "_id": {
    "$oid": "65bd8ada050b3e1d10f42ee0"
  },
  "sender": {
    "$oid": "65bd5f4c71b6a5d6af328dd4"
  },
  "content": "this is my second message",
  "chat": {
    "$oid": "65bd80820cccb6e36b24295b"
  },
  "__v": 0
}
 */