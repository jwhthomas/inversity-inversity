import { retrieveMessages } from "@/lib/retrieveMessages";

export default async function handler(req, res) {
    if(!req.query.userID) return res.status(400).json({"errorCode": 400, "error": "Bad request"})
    res.json(await retrieveMessages(req.query.userID))
}