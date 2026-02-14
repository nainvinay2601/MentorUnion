// import styles from "./page.module.css";
import  GoalsMentor  from "@/components/GoalsMentor/GoalsMentor";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import JourneySlider from "@/components/JourneySlider/JourneySlider";
import MentorGrid from "@/components/MentorGrid/MentorGrid";
import ProblemStatement from "@/components/ProblemStatement/ProblemStatement";
import Stats from "@/components/Stats/Stats";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <ProblemStatement />
<MentorGrid/>
<Stats/>
<JourneySlider/>
<GoalsMentor/>
      <ProblemStatement />



    </div>
  );
}
