import User from "../models/User.js";
import Configuration, { OpenAI } from "openai";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        console.log("Received message:", message);
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }
        const config = new Configuration({
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPENAI_ORGANIZATION_ID,
        });
        const openai = new OpenAI({ apiKey: config.apiKey });
        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            ...user.chats.map(({ role, content }) => ({ role, content })),
            { role: "user", content: message },
        ];
        console.log("Constructed messages:", messages);
        const params = {
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
        };
        console.log("OpenAI API Request Params:", params);
        const chatCompletion = await openai.chat.completions.create(params);
        console.log("OpenAI API Response:", chatCompletion);
        if (chatCompletion.choices && chatCompletion.choices.length > 0) {
            const assistantMessage = {
                role: "assistant",
                content: chatCompletion.choices[0].message.content,
            };
            const lastChat = user.chats[user.chats.length - 1];
            console.log("Last chat content:", lastChat ? lastChat.content : "No last chat");
            console.log("New assistant message:", assistantMessage.content);
            if (!lastChat || lastChat.content !== assistantMessage.content) {
                user.chats.push(assistantMessage);
                console.log("User chats after adding message:", user.chats);
                await user.save();
            }
            return res.status(200).json({ chats: user.chats });
        }
        else {
            console.log("OpenAI response is invalid");
            return res.status(500).json({ message: "OpenAI response is invalid" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
//////////
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map