import Image from "next/image";

interface TextImageSectionProps {
  text: string;
  imageSrc: string;
  imageAlt?: string;
  reverse?: boolean;
}

export default function TextImageSection({
  text,
  imageSrc,
  imageAlt = "Illustration",
  reverse = false,
}: TextImageSectionProps) {
  return (
    <div
      className={`flex flex-col w-full md:flex-row items-center gap-8 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <div className="max-w-xl mx-auto px-4 text-center md:text-left">
            <p className="text-4xl font-black text-black">{text}</p>
        </div>
      </div>

      <div className="flex-1">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={200}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
