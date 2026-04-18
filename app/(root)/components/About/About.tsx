import { aboutData, aboutList } from "@/utils/data";
import AboutCard from "./AboutCard";
import AboutListItem from "./AboutListItem";
import { RevealContainer } from "@/components/anim/reveal-container";
import { RevealItem } from "@/components/anim/reveal-item";

const About = () => {
  return (
    <section
      id="onas"
      className="relative bg-[#f8fafc] px-4 py-20 scroll-mt-30"
    >
      <div className="bg-gradient-to-b from-[#f8fafc] from-0% to-[#fff] to-100% absolute w-full h-[95px] top-0 left-0 -translate-y-full"></div>
      <RevealContainer>
        <div className="flex flex-col gap-20 max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-5">
            <RevealItem>
              <p className="text-main uppercase tracking-wider font-medium text-center">
                O naszym kursie
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="text-center">Nasz sposób na angielski</h2>
            </RevealItem>
            <RevealItem>
              <p className="text-center">
                Łączymy sprawdzone podejście z nowoczesnością, by stworzyć
                angażujący i efektywny kurs pasujący do twojego stylu życia.
              </p>
            </RevealItem>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.map((about) => (
              <AboutCard
                key={about.id}
                icon={about.icon}
                headline={about.headline}
                description={about.description}
              />
            ))}
          </div>
          <RevealItem>
            <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden border border-border">
              <div className="flex flex-col gap-10 p-12 bg-white">
                <RevealItem>
                  <h3 className="">Zacznij swoją przygodę dzisiaj</h3>
                </RevealItem>
                <RevealItem>
                  <p className="text-left">
                    Niezależnie od tego, czy dopiero zaczynasz naukę, czy chcesz
                    udoskonalić swoje umiejętności, dobierzemy program idealnie
                    dopasowany do Ciebie. Adaptujemy się do twoich
                    indywidualnych potrzeb.
                  </p>
                </RevealItem>

                <ul className="flex flex-col gap-4">
                  {aboutList.map((a) => (
                    <AboutListItem key={a.id} text={a.text} />
                  ))}
                </ul>
              </div>
              <div className="bg-main/20 p-12 flex items-center justify-center">
                <div className="bg-white rounded-lg border border-border p-6 shadow-lg max-w-sm w-full ">
                  <RevealItem>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-main/20"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3 bg-main/10 w-3/4 rounded-full"></div>
                        <div className="h-3 bg-main/10 w-1/4 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-main/10 w-full rounded-full"></div>
                      <div className="h-3 bg-main/10 w-5/6 rounded-full"></div>
                      <div className="h-3 bg-main/10 w-4/6 rounded-full"></div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <div className="rounded-lg h-8 bg-main flex-1"></div>
                      <div className="rounded-lg h-8 bg-main/10 w-20"></div>
                    </div>
                  </RevealItem>
                </div>
              </div>
            </div>
          </RevealItem>
        </div>
      </RevealContainer>
    </section>
  );
};
export default About;
