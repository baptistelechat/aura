import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const { format, image: imageData } = await req.json(); // Use req.json() to parse JSON body

  if (!imageData || !format) {
    return NextResponse.json(
      { error: "Image data or format missing" },
      { status: 400 }
    );
  }

  try {
    // Convert base64 to buffer and process with sharp
    const imageBuffer = Buffer.from(imageData, "base64");
    const convertedImage = await sharp(imageBuffer)
      .toFormat(format as keyof sharp.FormatEnum)
      .toBuffer();

    // Create a response with the converted image
    return new Response(convertedImage, {
      status: 200,
      headers: { "Content-Type": `image/${format}` },
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: "Error converting image." },
      { status: 500 }
    );
  }
}
