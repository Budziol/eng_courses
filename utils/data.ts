import ClockIcon from "@/components/Icons/ClockIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import PointIcon from "@/components/Icons/PointIcon";
import ShieldIcon from "@/components/Icons/ShieldIcon";
import { LevelDetails } from "./types";

export const aboutData = [
  {
    id: 0,
    icon: "",
    headline: "Sprawdzony kurs",
    description:
      "Kurs przygotowany przez doświadczonego nauczyciela. Metody nauki zostały przetestowane w praktyce i dają realne rezultaty.",
  },
  {
    id: 1,
    icon: "",
    headline: "Mów od pierwszej lekcji",
    description:
      "Kurs stawia na aktywne używanie języka. Ćwiczysz mówienie w realnych sytuacjach, dzięki czemu szybko przełamujesz barierę językową.",
  },
  {
    id: 2,
    icon: "",
    headline: "Dostosowany grafik",
    description:
      "Grafik jest dostosowany pod Ciebie i twoje potrzeby. Ty decydujesz kiedy odbywają się lekcje.",
  },
  {
    id: 3,
    icon: "",
    headline: "Widoczne postępy",
    description:
      "Każda lekcja ma jasno określony cel. Regularnie widzisz swoje postępy i dokładnie wiesz, co już potrafisz, a nad czym warto jeszcze popracować.",
  },
];

export const aboutList = [
  {
    id: 0,
    text: "Indywidualny plan nauki ustalany z nauczycielem",
  },
  {
    id: 1,
    text: "Stałe monitorowanie postępów i feedback po lekcjach",
  },
  {
    id: 2,
    text: "Dostęp do materiałów edukacyjnych przez całą dobę",
  },
  {
    id: 3,
    text: "Praktyka konwersacji z doświadczonym nauczycielem",
  },
];

export const coursesBenefits = [
  {
    id: 0,
    icon: ClockIcon,
    headline: "Elastyczny harmonogram",
    description: "Daj nam znać w które dni chciałbyś odbywać lekcje.",
  },
  {
    id: 1,
    icon: MessageIcon,
    headline: "Rozmowy na żywo",
    description:
      "Odbywaj rozmowy z certyfikowanymi nauczycielami aby zbierać doświadczenie użycia języka w praktyce.",
  },
  {
    id: 2,
    icon: PointIcon,
    headline: "Udowodnione rezultaty",
    description:
      "95% naszych uczniów osiąga ich założenia językowe w przeciągu 6 miesięcy.",
  },
  {
    id: 3,
    icon: ShieldIcon,
    headline: "Gwarantowany progress",
    description:
      "Masz 30 dni na zwrot pieniędzy w przypadku gdy nie będziesz zadowolony z rezultatów.",
  },
];

export const levelsDetails: LevelDetails[] = [
  {
    id: 0,
    range: "A1-A2",
    name: "Podstawowy",
    shortDesc: "Angielski Od Podstaw",
    description:
      "Idealny dla osób, które dopiero rozpoczynają swoją przygodę z językiem angielskim. Nauczysz się podstawowego słownictwa, prostej gramatyki oraz codziennych zwrotów.",
    timeToComplete: 12,
    topics: [
      "Podstawowa gramatyka",
      "Najczęściej używane zwroty",
      "Liczby i daty",
      "Proste konwersacje",
    ],
    color: "green",
  },
  {
    id: 1,
    range: "B1-B2",
    name: "Średniozaawansowany",
    shortDesc: "Pewna Komunikacja",
    description:
      "Zbuduj pewność siebie w mówieniu i pisaniu. Rozszerzysz słownictwo i opanujesz bardziej złożone struktury gramatyczne.",
    timeToComplete: 16,
    topics: [
      "Złożona gramatyka",
      "Podstawy języka biznesowego",
      "Bieżące wydarzenia i tematy",
      "Płynne mówienie",
    ],
    color: "blue",
  },
  {
    id: 2,
    range: "C1-C2",
    name: "Zaawansowany",
    shortDesc: "Profesjonalna Biegłość Językowa",
    description:
      "Osiągnij biegłość zbliżoną do poziomu native speakera. Idealny kurs dla celów akademickich, zawodowych i specjalistycznych.",
    timeToComplete: 20,
    topics: [
      "Pisanie akademickie",
      "Zaawansowane idiomy",
      "Wystąpienia publiczne",
      "Precyzyjna komunikacja",
    ],
    color: "purple",
  },
];

export const faqItems = [
  {
    id: 0,
    headline: "Jak działa nasz kurs?",
    description:
      "Nasz kurs to indywidualne lekcje z nauczycielem angielskiego. Zajecia odbywaja się w wybrane przez Ciebie dni a jedna lekcja trwa mniej wiecej godzinę.",
  },
  {
    id: 1,
    headline: "Jaki poziom wybrać?",
    description:
      "Jeśli nie jesteś pewny który poziom wybrać, rozwiąż darmowy test poziomujący który pomoże ci z wyborem.",
  },
  {
    id: 2,
    headline: "Czy mogę dostać certyfikat po ukończeniu kursu?",
    description: "Tak",
  },
  {
    id: 3,
    headline: "Ile czasu dziennie przeznaczyć na naukę?",
    description:
      "To zależy od Ciebie, ale polecamy przeznaczyć od 3 do 5 godzin tygodniowo aby osiągnąc założone rezultaty.",
  },
];
