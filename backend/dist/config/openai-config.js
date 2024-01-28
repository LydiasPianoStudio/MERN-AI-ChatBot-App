import Configuration from "openai";
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
};
//ORIGINAL
////import  Configuration  from "openai";
//export const configureOpenAI = () => {
//const config = new Configuration({
//apiKey: process.env.OPEN_AI_SECRET, 
//organization: process.env.OPENAI_ORGANIZATION_ID,
// });
// return config;
//};
//CHATGPT
//import OpenAI from 'openai';
//
//export const configureOpenAI = () => {
//  const config = new OpenAI.Configuration({
//    apiKey: process.env.OPEN_AI_SECRET,
//  organization: process.env.OPENAI_ORGANIZATION_ID,
//});
//return config;
//};
//# sourceMappingURL=openai-config.js.map