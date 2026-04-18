export type LevelColor = "green" | "blue" | "purple";

export type LevelDetails = {
  id: number;
  range: string;
  name: string;
  shortDesc: string;
  description: string;
  timeToComplete: number;
  topics: string[];
  color: LevelColor;
};

export type faqItem = {
  id: number;
  headline: string;
  description: string;
};
