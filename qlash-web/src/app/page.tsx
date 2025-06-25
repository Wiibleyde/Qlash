import Navbar from "./components/Navbar";
import TextImageSection from "./components/TextImageSection";

export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen">
      <Navbar />
      <div className="h-screen flex items-center">
        <TextImageSection
          text="Create, share and play quizzes whenever and wherever you want"
          imageSrc="/images/multiple-choice.svg"
        />
      </div>
      <div className="min-h-[70vh] flex items-center">
        <TextImageSection
          text="Find fun and interesting quizzes to boost up your knowledge"
          imageSrc="/images/questions.svg"
          reverse
        />
      </div>
    </div>
  );
}
