import Button from "@/components/button";
import ChallengeCard from "@/components/challengeCard";
import Header from "@/components/header";
import ListItem from "@/components/listItem";
import { useState, useEffect } from 'react'

export default function ProfileWithRequest() {
  const [challengeData, setChallengeData] = useState(null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const challengeResp = await fetch("/api/exampleChallenge")
      if (!challengeResp.ok) {
        throw new Error(`Error ${challengeResp.status}`)
      }
      const challengeResult = await challengeResp.json()
      setChallengeData(challengeResult)

      const userResp = await fetch("/api/exampleUser")
      if (!userResp.ok) {
        throw new Error(`Error ${userResp.status}`)
      }
      const userResult = await userResp.json()
      setUserData(userResult)
    }

    fetchData().catch(error => {
      console.error(error)
    })
  }, [])

  if (!userData) return <Header />

  return (
    <>
      <Header />
      <main className="min-h-screen max-w-screen flex justify-center bg-[#f5f5f5]">
        <div className="bg-white w-3/4 h-fit rounded-lg my-8">
          <div className="flex items-center bg-[#091b2d] rounded-lg min-h-48 text-white p-8">
            <img src="/images/user.svg" className="h-32" />
            <div className="mx-16">

              <h1 className="text-6xl font-semibold">{userData.user.first_name} {userData.user.last_name}</h1>
              <p className="text-gray-300 text-lg mt-2">{userData.user.about_me}</p>

              {userData.user.employment_type_preferences.length > 0 ?
                <div className="my-4">
                  <h2 className="text-2xl">Open To</h2>
                  <ul className="list-none">
                    {userData.user.employment_type_preferences.map((type, i) => (
                      <ListItem key={i}>{type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</ListItem>
                    ))}
                  </ul>
                  <Button text="Message" className="mt-2" />
                </div>
                :
                null
              }
            </div>
          </div>

          <div className="flex mt-2 flex-wrap">
            {/* These could expand to a sort of blog page overlayed on the profile where the user can write about their project with the video at the top */}
            {challengeData.map((challenge, i) => (
              (challenge.own_entries.length > 0) && (challenge.own_entries[0].overall_ranking !== null) ?
                <ChallengeCard id={challenge.own_entries[0].video_link.split("=")[1]} title={challenge.name} key={i} />
                :
                null
            ))}
          </div>
        </div>
      </main>
    </>

  );
}
