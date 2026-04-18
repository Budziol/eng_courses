import { RevealItem } from "@/components/anim/reveal-item";
import { ComponentType, SVGProps } from "react";

const CoursesBenefitCard = ({
  icon,
  headline,
  description,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  headline: string;
  description: string;
}) => {
  const Icon = icon;

  return (
    <RevealItem>
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-main/20 rounded-lg flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-main" />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm">{headline}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </RevealItem>
  );
};
export default CoursesBenefitCard;
