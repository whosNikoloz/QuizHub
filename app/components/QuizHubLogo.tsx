import QuizHubLogo from "@/public/QuizHubLogo.png";
import Image from "next/image";

export const QuizHub = ({ width = 40, height = 40 }) => (
  <Image
    src={QuizHubLogo}
    height={height}
    width={width}
    alt="logo"
    priority={true}
  />
);
