import { levelsDetails } from "@/utils/data";
import LevelsCard from "./LevelsCard";
import { SecondaryLink } from "@/components/Links";
import { RevealContainer } from "@/components/anim/reveal-container";
import { RevealItem } from "@/components/anim/reveal-item";

const Levels = () => {
  return (
    <RevealContainer>
      <section id="poziomy" className="px-4 py-20 bg-muted scroll-mt-30">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <RevealItem>
              <p className="text-main uppercase tracking-wider font-medium text-center">
                Poziomy nauczania
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="text-center">Znajdź swój idealny poziom</h2>
            </RevealItem>
            <RevealItem>
              <p className="text-center">
                Nasze kursy są zgodne z Europejskim Systemem Opisu Kształcenia
                Językowego (CEFR), co zapewnia uporządkowany i mierzalny postęp
                w nauce.
              </p>
            </RevealItem>
          </div>
          <div className="grid md:grid-cols-3 justify-between gap-8">
            {levelsDetails.map((l, i) => (
              <LevelsCard
                i={i}
                key={l.id}
                id={l.id}
                range={l.range}
                name={l.name}
                shortDesc={l.shortDesc}
                description={l.description}
                timeToComplete={l.timeToComplete}
                topics={l.topics}
                color={l.color}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-6">
            <RevealItem>
              <p className="text-center">
                Nie jesteś pewny który poziom jest dla Ciebie?
              </p>
            </RevealItem>
            <RevealItem>
              <SecondaryLink href="/test">
                Darmowy Test Poziomujący
              </SecondaryLink>
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Levels;
