import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  BoxSelect,
  FileImage,
  LampDesk,
  Rotate3D,
  Scaling,
} from "lucide-react";
import { ReactNode } from "react";
import ContextSubMenu from "./components/ContextSubMenu";

interface IImageContextMenuProps {
  children: ReactNode;
}

const ImageContextMenu = ({ children }: IImageContextMenuProps) => {
  const image = useImageGeneratorStore((s) => s.settings.image);
  const setImage = useImageGeneratorStore((s) => s.setImage);

  const defaultValue = defaultImageGeneratorSettings.image;

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>
          <span className="flex items-center gap-1.5">
            <FileImage className="size-4" />
            Image
          </span>
        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextSubMenu
          label="Size"
          logo={<Scaling className="size-4" />}
          currentValue={image.scale}
          defaultValue={defaultValue.scale}
          options={[
            { label: "25%", value: 0.25 },
            { label: "50%", value: 0.5 },
            { label: "75%", value: 0.75 },
            { label: "100%", value: 1 },
          ]}
          onClick={(scale) => setImage({ scale })}
        />
        <ContextSubMenu
          label="Border"
          logo={<BoxSelect className="size-4" />}
          currentValue={image.borderRadius}
          defaultValue={defaultValue.borderRadius}
          options={[
            { label: "25%", value: defaultValue.borderRadius * 0.5 },
            { label: "50%", value: defaultValue.borderRadius * 1 },
            { label: "75%", value: defaultValue.borderRadius * 1.5 },
            { label: "100%", value: defaultValue.borderRadius * 2 },
          ]}
          onClick={(borderRadius) => setImage({ borderRadius })}
        />
        <ContextSubMenu
          label="Shadow"
          logo={<LampDesk className="size-4" />}
          currentValue={image.shadow}
          defaultValue={defaultValue.shadow}
          options={[
            { label: "25%", value: 0.25 },
            { label: "50%", value: 0.5 },
            { label: "75%", value: 0.75 },
            { label: "100%", value: 1 },
          ]}
          onClick={(shadow) => setImage({ shadow })}
        />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <span className="flex items-center gap-1.5">
              <Rotate3D className="size-4" />
              Rotation
            </span>{" "}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextSubMenu
              label="RotateX"
              currentValue={image.rotateX}
              defaultValue={defaultValue.rotateX}
              options={[
                { label: "-90°", value: -90 },
                { label: "-45°", value: -45 },
                { label: "0°", value: 0 },
                { label: "45°", value: 45 },
                { label: "90°", value: 90 },
              ]}
              onClick={(rotateX) => setImage({ rotateX })}
            />
            <ContextSubMenu
              label="RotateY"
              currentValue={image.rotateY}
              defaultValue={defaultValue.rotateY}
              options={[
                { label: "-90°", value: -90 },
                { label: "-45°", value: -45 },
                { label: "0°", value: 0 },
                { label: "45°", value: 45 },
                { label: "90°", value: 90 },
              ]}
              onClick={(rotateY) => setImage({ rotateY })}
            />
            <ContextSubMenu
              label="RotateZ"
              currentValue={image.rotateZ}
              defaultValue={defaultValue.rotateZ}
              options={[
                { label: "-180°", value: -180 },
                { label: "-135°", value: -135 },
                { label: "-90°", value: -90 },
                { label: "-45°", value: -45 },
                { label: "0°", value: 0 },
                { label: "45°", value: 45 },
                { label: "90°", value: 90 },
                { label: "135°", value: 135 },
                { label: "180°", value: 180 },
              ]}
              onClick={(rotateZ) => setImage({ rotateZ })}
            />
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ImageContextMenu;
