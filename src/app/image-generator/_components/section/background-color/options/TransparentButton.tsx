import { Button } from "@/components/ui/button";
import { setTransparentBackground } from "@/lib/utils/image-generator/setBackgroundColor/setTransparentBackground";
import { Eraser } from "lucide-react";

const TransparentButton = () => {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => setTransparentBackground()}
      className="mx-1 w-full"
    >
      <Eraser className="mr-2 size-4" />
      Transparent background
    </Button>
  );
};

export default TransparentButton;
