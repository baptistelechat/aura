import Image from "next/image";
import { Changelog } from "../types/Changelog";

export const changelogData: Changelog[] = [
  {
    date: {
      month: "October",
      day: 28,
      year: 2024,
    },
    content: (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Launch Aura Studio</p>
        <p className="text-sm text-muted-foreground">
          Aura Studio is now available ! your new toolkit designed to help you
          create beautiful visuals faster than ever.
        </p>
        <Image
          src={"/changelog/2024 10 23/presentation.png"}
          alt={"Aura Presentation"}
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
      </div>
    ),
  },
];
