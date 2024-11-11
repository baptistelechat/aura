import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "nature";
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "10";
  const orientation = searchParams.get("orientation") || "all";

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}${
        orientation !== "all" ? `&orientation=${orientation}` : ""
      }&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "Error fetching images from Unsplash" },
        { status: 500 }
      );
    }

    const data = await response.json();

    const nextResponse = NextResponse.json(
      { status: "success", images: data.results },
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
