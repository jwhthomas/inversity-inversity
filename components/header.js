import Button from "./button";
import Link from "next/link";

export default function Header(){
    return (
        <header className="flex bg-[#091b2d] h-[5em] items-center w-full">
            <Link href="/" className="h-full py-[10px] ml-[10vw]">
                <img src="/images/full_logo.svg" className="h-full"/>
            </Link>
            <div className="ml-auto mr-[10vw] flex items-center">
                <img src="/images/group.svg" className="mr-4 w-10" />
                <p className="text-white text-xl mr-4">Hi User!</p>
                <Link href="https://github.com/jwhthomas/inversity-inversity">
                    <Button text="Logout" />
                </Link>
            </div>
        </header>
    )
}