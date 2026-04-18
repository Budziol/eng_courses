import { coursesBenefits } from "@/utils/data";
import CoursesBenefitCard from "./CoursesBenefitCard";
import ProgressCard from "@/components/ProgressCard";
import { RevealContainer } from "@/components/anim/reveal-container";
import { RevealItem } from "@/components/anim/reveal-item";

const Courses = () => {
  return (
    <RevealContainer>
      <section id="kursy" className="px-4 py-20 scroll-mt-40">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 items-center gap-16">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5">
              <RevealItem>
                <p className="text-main uppercase tracking-wider font-medium text-center lg:text-left">
                  Dlaczego my
                </p>
              </RevealItem>
              <RevealItem>
                <h2 className="text-center lg:text-left">
                  Sprawdzone sposoby na{" "}
                  <span className="text-main">naukę angielskiego</span>
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-center lg:text-left">
                  Pomogliśmy już ponad 100 osobom osiągnąć płynność w
                  porozumiewaniu się po angielsku. Oto dlaczego uczniowie
                  wybierają nasz kurs.
                </p>
              </RevealItem>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {coursesBenefits.map((c) => (
                <CoursesBenefitCard
                  key={c.id}
                  icon={c.icon}
                  headline={c.headline}
                  description={c.description}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <RevealItem>
              <div className="absolute inset-0 bg-main/10 rounded-3xl transform rotate-3"></div>
              <ProgressCard
                level={"C1"}
                talkingLvl={78}
                listeningLvl={85}
                readingLvl={92}
                writingLvl={65}
                lessons={24}
              />
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Courses;
