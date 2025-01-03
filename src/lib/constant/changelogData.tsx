import Image from "next/image";
import { Changelog } from "../types/Changelog";

export const changelogData: Changelog[] = [
  {
    date: {
      month: "November",
      day: 26,
      year: 2024,
    },
    content: (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Resize image from preview and context menu</p>
        <p className="text-sm text-muted-foreground">
          You can now resize images directly from the preview. Simply hover the corner and border of image and choose the desired size.
        </p>
        <p className="text-sm text-muted-foreground">
          You can also changes settings from the context menu. Simply right click on the image or the background and choose an preset option.
        </p>
        <Image
          src={"/images/changelog/2024 11 26/context-menu-1.png"}
          alt={"Context Menu 1"}
          layout="responsive"
          width={1109}
          height={621}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
        <Image
          src={"/images/changelog/2024 11 26/context-menu-2.png"}
          alt={"Context Menu 2"}
          layout="responsive"
          width={1106}
          height={622}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
      </div>
    ),
  },
  {
    date: {
      month: "November",
      day: 12,
      year: 2024,
    },
    content: (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Free Image Bank</p>
        <p className="text-sm text-muted-foreground">
          Aura now supports 2 royalty-free image banks : Unsplash and Pixabay. This feature helps you find the perfect image for your project. You can now search for images by keyword and filter results by orientation or color theme.
        </p>
        <Image
          src={"/images/changelog/2024 11 12/freeImageBank-2.png"}
          alt={"Free Image Bank"}
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
        <Image
          src={"/images/changelog/2024 11 12/freeImageBank-1.png"}
          alt={"Free Image Bank"}
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
      </div>
    ),
  },
  {
    date: {
      month: "November",
      day: 6,
      year: 2024,
    },
    content: (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Background Image, Rotation and more</p>
        <p className="text-sm text-muted-foreground">
          Aura includes over 13k predefined backgrounds to boost your creativity
          ! To keep up with all the latest standards, this update includes the
          addition of new export dimensions for social networks. More
          flexibility ? You can choose to define a custom format. And
          that&apos;s not all ! You can export to more image formats: JPG, PNG,
          WEBP,... Finally, bring your images to life by giving your renderings
          a 3D effect!
        </p>
        <Image
          src={"/images/changelog/2024 11 06/backgroundImage.png"}
          alt={"Background Image"}
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
        <Image
          src={"/images/changelog/2024 11 06/rotation.png"}
          alt={"Background Image"}
          layout="responsive"
          width={1920}
          height={1080}
          className="rounded-lg border transition-all duration-300 ease-in-out"
        />
      </div>
    ),
  },
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
          src={"/images/changelog/2024 10 23/presentation.png"}
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
