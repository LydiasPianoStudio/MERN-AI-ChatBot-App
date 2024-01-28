import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try { 
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });

        // Specify the type for the messages array
        const messages: { role: string; content: string }[] = [
            ...user.chats.map(({ role, content }) => ({ role, content })),
            { content: message, role: "user" },
        ];

        // send all chats with the new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAI({ apiKey: config.apiKey });

        // chat completion response
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." }],
        });

        user.chats.push({
            role: "assistant",
            content: chatCompletion.choices[0].message.content,
        });

        await user.save();
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });

};
};