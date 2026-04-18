import { RevealItem } from "@/components/anim/reveal-item";

type Props = {
  icon: string;
  headline: string;
  description: string;
};

const AboutCard = ({ icon, headline, description }: Props) => {
  return (
    <RevealItem>
      <div className="bg-white p-6 flex flex-col gap-5 rounded-2xl border border-border hover:shadow-lg md:max-w-[420px] min-h-[190.25px] mx-auto first:mr-auto last:ml-auto transition-shadow duration-300">
        {/* <img src="" alt="" className="" /> */}
        <h3 className="">{headline}</h3>
        <p className="text-left text-sm">{description}</p>
      </div>
    </RevealItem>
  );
};
export default AboutCard;
