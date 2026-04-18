"use client";

import { faqItems } from "@/utils/data";
import FAQCard from "./FAQCard";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import { GhostLink } from "@/components/Links";
import { RevealContainer } from "@/components/anim/reveal-container";
import { RevealItem } from "@/components/anim/reveal-item";

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <RevealContainer>
      <section id="faq" className="px-4 py-20 scroll-mt-30">
        <div className="max-w-3xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <RevealItem>
              <p className="text-main uppercase tracking-wider font-medium text-center">
                FAQ
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="text-center">Często zadawane pytania</h2>
            </RevealItem>
            <RevealItem>
              <p className="text-center">
                Wszystko co musisz wiedzieć o naszym kursie.
              </p>
            </RevealItem>
          </div>
          <div className="flex flex-col gap-6">
            {faqItems.map((f) => (
              <FAQCard
                key={f.id}
                id={f.id}
                headline={f.headline}
                description={f.description}
                open={open}
                setOpen={setOpen}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 items-center bg-main/10 rounded-2xl p-8">
            <RevealItem>
              <h3 className="font-medium text-base text-center">
                Nadal masz pytania?
              </h3>
            </RevealItem>
            <RevealItem>
              <p className="text-sm text-center">
                Nasz zespół jest od tego by ci pomóc.
              </p>
            </RevealItem>
            <RevealItem>
              <GhostLink
                href="/kontakt"
                className="mt-2 text-base font-medium flex items-center gap-3"
              >
                Kontakt Z Nami <MoveRight size={16} />
              </GhostLink>
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default FAQ;
