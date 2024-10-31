import { uploadImage } from "@/lib/utils/image-generator/uploadImage";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone: React.FC = () => {
  const onDrop = useCallback((files: File[]) => {
    uploadImage(files[0], "image");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-md border-2 border-dashed p-8 transition-all duration-200 ${
        isDragActive
          ? "border-blue-500 bg-blue-100"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} accept="image/*" />
      <p className="text-center text-gray-500">
        {isDragActive
          ? "Dépose tes fichiers ici..."
          : "Glisse et dépose tes fichiers ici, ou clique pour les sélectionner"}
      </p>
    </div>
  );
};

export default DropZone;
