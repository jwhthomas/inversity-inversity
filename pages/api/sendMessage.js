import { retrieveMessages } from "@/lib/retrieveMessages";
import mysql from "mysql2/promise";
import OpenAI from "openai";

export default async function handler(req, res) {
    if(req.method !== "POST") return res.status(405).json({"errorCode": 405, "error": "Method not allowed"})
    
    var required = ["message", "userID"];
    var fail = false
    required.forEach((value) => {
        if(!req.body[value]) fail = true
    })
    
    if(fail){
        res.status(400)
        res.end("Missing one of the required values: "+required.join(", ")+"\n\nMost likely you are seeing this as you didn't enter a userID into the prompt, if so, please reload.")
        return
    }

    const client = new OpenAI({
        organization: process.env.OPENAI_ORG,
        project: process.env.OPENAI_PROJ,
        apiKey: process.env.OPENAI_API_KEY,
    });

    var fullConversation = await retrieveMessages(req.body.userID)
    fullConversation.push({ role: 'user', content: req.body.message })
    
    const response = await client.chat.completions.create({
        messages: fullConversation,
        model: "gpt-4o-mini",
    });

    const db = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    });

    db.execute(`INSERT INTO messages (userID, message, fromAI) VALUES (?, ?, ?)`, [req.body.userID, req.body.message, false]);
    // Production version would likely also include something like conversationID for different ChatBots and have *any* error handling
    db.execute(`INSERT INTO messages (userID, message, fromAI) VALUES (?, ?, ?)`, [req.body.userID, response.choices[0].message.content, true]);
    db.end()


    res.end(response.choices[0].message.content)

}