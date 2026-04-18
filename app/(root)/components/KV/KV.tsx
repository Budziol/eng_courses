import { RevealContainer } from "@/components/anim/reveal-container";
import { PrimaryLink, SecondaryLink } from "../../../../components/Links";
import { RevealItem } from "@/components/anim/reveal-item";

const KV = () => {
  return (
    <RevealContainer>
      <section className="min-h-[90vh] flex flex-col gap-20 px-4 pt-20">
        <div className="max-w-[258px] xs:max-w-[310px] sm:max-w-[516px] flex flex-col items-center gap-10 sm:gap-20 mx-auto">
          <RevealItem>
            <h1 className="text-3xl xs:text-4xl sm:text-6xl text-center">
              Opanuj <span className="text-main">angielski</span> z pewnością
              siebie
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="text-sm sm:text-base text-center">
              Dołącz do tysięcy osób na całym świecie. Nasze profesjonalnie
              przygotowane kursy pomogą Ci mówić, pisać i myśleć po angielsku
              naturalnie. Rozpocznij swoją drogę do biegłości już dziś.
            </p>
          </RevealItem>
          <div className="w-full flex flex-col items-center justify-center sm:flex-row gap-5 sm:gap-10">
            <RevealItem>
              <PrimaryLink
                href="/#poziomy"
                className="min-w-[140px] sm:min-w-[180px] sm:text-base text-center"
              >
                Zacznij teraz
              </PrimaryLink>
            </RevealItem>
            <RevealItem>
              <SecondaryLink
                href="/kontakt"
                className="min-w-[140px] sm:min-w-[180px] sm:text-base text-center"
              >
                Skontaktuj się
              </SecondaryLink>
            </RevealItem>
          </div>
        </div>
        <div className="mt-auto relative z-10">
          <div className="w-fit relative mx-auto">
            <RevealItem y={0}>
              <img
                src="/Home/KV/owl1.png"
                alt="owl mascot"
                className="mx-auto max-w-[600px] w-full h-auto"
              />
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default KV;
