import About from "@/app/(root)/components/About/About";
import Courses from "@/app/(root)/components/Courses/Courses";
import FAQ from "@/app/(root)/components/FAQ/FAQ";
import KV from "@/app/(root)/components/KV/KV";
import Levels from "@/app/(root)/components/Levels/Levels";

export default function Home() {
  return (
    <main className="">
      <KV />
      <About />
      <Courses />
      <Levels />
      <FAQ />
    </main>
  );
}
