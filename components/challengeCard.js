import { useRouter } from "next/router";
import { useState } from "react";

export default function ChallengeCard({id, title, userSubmittedText}){
    const router = useRouter();
    const [hover, setHover] = useState(false);

    function watchVideo(id){
      return router.push(`https://youtube.com/watch?v=${id}`)
    }

    return (
        <div className="w-1/4 rounded-lg p-2 cursor-pointer" onClick={() => watchVideo(id)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} className={`rounded-t-lg transition duration-250 ${hover ? "opacity-75" : ""}`} width="1280" height="720" />
            <div className="bg-gray-200 rounded-b-lg p-1">
                <b>{title}</b>
                <p>{userSubmittedText}</p>
                <p></p>
            </div>
        </div>
    )
}