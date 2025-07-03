import Navbar from "../components/Navbar";
import TextImageSection from "../components/TextImageSection";

export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen">
      <Navbar />
      <div className="h-screen flex items-center">
        <TextImageSection
          text="Créez, partagez et jouez à des quiz où et quand vous le souhaitez."
          imageSrc="/images/multiple-choice.svg"
        />
      </div>
      <div className="min-h-[70vh] flex items-center">
        <TextImageSection
          text="Trouvez des quiz amusants et intéressants pour améliorer vos connaissances."
          imageSrc="/images/questions.svg"
          reverse
        />
      </div>
    </div>
  );
}
