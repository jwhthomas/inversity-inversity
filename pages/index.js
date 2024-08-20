import Header from "@/components/header";
import Link from "next/link";
import ListItem from "@/components/listItem";

export default function Home(){
    return (
        <>
        <Header />
        <main className="h-[calc(100vh-5em)] max-w-screen bg-[#f5f5f5]">
            <h1 className="text-2xl font-bold p-8">Landing Page</h1>
            <ul className="text-lg font-semibold py-2 px-8">
                <ListItem><Link href="/profile">Inversity Profile Page</Link></ListItem>
                <ListItem><Link href="/profileWithRequest">Inversity Profile Page (Using Example API Requests)</Link></ListItem>
                {/* <ListItem><Link href="/certificate">Certificate Generator</Link></ListItem> */}
                <ListItem><Link href="/chatbot">ChatBot QoL Improvements</Link></ListItem>
            </ul>
        </main>
        </>
    )
}