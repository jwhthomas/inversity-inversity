import Button from "@/components/button";
import ChallengeCard from "@/components/challengeCard";
import Header from "@/components/header";
import ListItem from "@/components/listItem";

export default function Profile() {
  return (
    <>
      <Header />
      <main className="min-h-screen max-w-screen flex justify-center bg-[#f5f5f5]">
        <div className="bg-white w-3/4 h-fit rounded-lg my-8">
          <div className="flex items-center bg-[#091b2d] rounded-lg min-h-48 text-white p-8">
            <img src="/images/user.svg" className="h-32" />
            <div className="mx-16">

              <h1 className="text-6xl font-semibold">Joe Thomas</h1>
              <p className="text-gray-300 text-lg mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt malesuada lorem, a venenatis arcu euismod eget. Maecenas ultrices pretium mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; orci.</p>

              <div className="my-4">
                <h2 className="text-2xl">Open To</h2>
                <ul className="list-none">
                  <ListItem>Example A</ListItem>
                  <ListItem>Example B</ListItem>
                  <ListItem>Example C</ListItem>
                </ul>
                <Button text="Message" className="mt-2" />
              </div>
            </div>
          </div>

          <div className="flex mt-2 flex-wrap">
            {/* These could expand to a sort of blog page overlayed on the profile where the user can write about their project with the video at the top */}
            <ChallengeCard id="xewzi2irp18" title="From Computer to Cockpit: can software revolutionise how Air Forces operate?" />
            <ChallengeCard id="pygGug3TCaI" title="Code Red: can technology improve the medical response to a humanitarian crisis?" />
            <ChallengeCard id="Jdf6BzzfOqM" title="Lights out, let's code. Can software improve FORMULA ONE race strategy decisions?" />
            <ChallengeCard id="RwU7YY6emYc" title="Reimagining Market Research. How can technology help us work out what people are thinking and turn these insights into action?" />
            <ChallengeCard id="G1hKzCkywM8" title="Whodunnit? Can analysis of open-source data help us unravel mysteries?" />
          </div>
        </div>
      </main>
    </>
  );
}
