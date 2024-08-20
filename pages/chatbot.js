import { useState, useEffect } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '@/components/header';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        async function fetchChatHistory() {
            var id = prompt("Please enter your UserID", "1");
            if(!id) id = null
            setUserID(id);

            const response = await fetch(`/api/getChatHistory?userID=${id}`);
            const history = await response.json();

            history.map(async (msg) => {
                if (msg.role === "assistant") {
                    msg.content = await processMarkdown(msg.content)
                }
            })
            setMessages(history);
        }

        fetchChatHistory();
    }, []);

    useEffect(() => {
        scrollToBottomOfChat();
    }, [messages])

    async function handleSendMessage() {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((oldMessages) => [...oldMessages, userMessage]);

        setLoading(true)
        setInput("")


        const response = await fetch("/api/sendMessage", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({ userID: userID, message: input })
        });

        const assistantResponse = await response.text();
        const assistantMessage = { role: "assistant", content: await processMarkdown(assistantResponse) };

        setMessages((oldMessages) => [...oldMessages, assistantMessage]);
        setLoading(false)
    }


    async function processMarkdown(text) {
        const result = await remark().use(html).process(text);
        return result.toString()
    }

    function scrollToBottomOfChat() {
        const scrollArea = document.getElementById("scrollArea");
        scrollArea.scrollTop = scrollArea.scrollHeight;
    }

    return (
        <>
            <Header />
            <div className="h-[calc(100vh-5em)] w-full flex items-center justify-center bg-[#f5f5f5]">
                <div className="bg-white rounded-lg w-1/3" id="ChatBotArea">
                    <div className="bg-[#091b2d] rounded-t-lg p-6">
                        <p className="text-white text-xl">Talk with the ChatBot</p>
                    </div>

                    <div className="h-96 overflow-auto" id="scrollArea">
                        <div id="chatArea">
                            {messages.map((msg, i) => (
                                <div key={i} className="flex m-2">
                                    <div className={`p-2 rounded ${msg.role === 'user' ? 'bg-[#c62e65] text-white ml-auto' : 'bg-[#F8F8F8] text-[#565867]'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex m-2" id="loading">
                                    <div className="bg-[#F8F8F8] p-4 rounded text-[#565867] flex">
                                        <div className="bg-gray-400 h-3 w-3 rounded-full mr-1 animate-bounce-1"></div>
                                        <div className="bg-gray-400 h-3 w-3 rounded-full mr-1 animate-bounce-2"></div>
                                        <div className="bg-gray-400 h-3 w-3 rounded-full animate-bounce-3"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-16 flex items-center bg-[#f4f7f9] rounded-b-lg">
                        <input
                            className="focus:outline-none w-full h-full bg-[#f4f7f9] rounded-b-lg p-4 text-[#565867]"
                            placeholder="Tell me about yourself?"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => ((e.key === "Enter") ? handleSendMessage() : null)}
                        />
                        <img src="/images/send.svg" className="mr-8 cursor-pointer" onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </>
    );
}
