import { NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const API_KEY = process.env.PIXABAY_ACCESS_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { status: "error", message: "Missing API key" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "nature";
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "10";

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "Error fetching images from Pixabay" },
        { status: 500 }
      );
    }

    const data = await response.json();

    const nextResponse = NextResponse.json(
      { status: "success", images: data.hits },
      { status: 200 }
    );

    nextResponse.headers.set(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=59"
    );

    return nextResponse;
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { status: "error", message: "An error occurred while fetching images" },
      { status: 500 }
    );
  }
}
