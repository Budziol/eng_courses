import { RevealItem } from "@/components/anim/reveal-item";

const AboutListItem = ({ text }: { text: string }) => {
  return (
    <RevealItem>
      <li className="flex items-center gap-3">
        <div className="w-5 h-5 bg-main/20 rounded-full flex items-center justify-center shrink-0">
          <div className="w-2 h-2 bg-main rounded-full"></div>
        </div>
        <span className="text-sm text-text-sub">{text}</span>
      </li>
    </RevealItem>
  );
};
export default AboutListItem;
