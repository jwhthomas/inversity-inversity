import mysql from "mysql2/promise";

export async function retrieveMessages(userID) {
    return new Promise(async (resolve, reject) => {
        var convertedResult = [];

        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });

        const [rows, fields] = await db.execute("SELECT * FROM messages WHERE userID = ?", [userID]);

        rows.forEach(row => {
            convertedResult.push({ role: (row.fromAI ? "assistant" : "user"), content: row.message, messageID: row.messageID });
        });

        resolve(convertedResult);
        db.end();
    });
}