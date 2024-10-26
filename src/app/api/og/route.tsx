/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const homepage = searchParams.get("homepage") || "0";
  const title =
    homepage === "1" ? "Aura" : searchParams.get("title") || "Default Title";
  const description =
    homepage === "1"
      ? "Create, Share, Inspire"
      : searchParams.get("description") || "Default Description";

  const colorDark = "#0E4598";
  const colorLight = "#1573FE";

  const logoPath = process.env.NEXT_PUBLIC_APP_URL + "/Logo.svg";
  const backgroundPath =
    process.env.NEXT_PUBLIC_APP_URL + "/images/og-images/1.jpg";

  const gugiFontPath =
    process.env.NEXT_PUBLIC_APP_URL + "/fonts/Gugi/Gugi-Regular.ttf";
  const gugiFontResponse = await fetch(gugiFontPath);
  const gugiFontData = await gugiFontResponse.arrayBuffer();

  const robotoFontPath =
    process.env.NEXT_PUBLIC_APP_URL + "/fonts/Roboto/Roboto-Regular.ttf";
  const robotoFontResponse = await fetch(robotoFontPath);
  const robotoFontData = await robotoFontResponse.arrayBuffer();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          background: `linear-gradient(45deg, ${colorDark} 0%, ${colorLight} 100%)`,
          padding: "24px",
          fontFamily: "Roboto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: "24px 0 0 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <img
                src={logoPath}
                alt="Logo"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
              <h1
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  color: colorDark,
                  margin: "0 0 20px 0",
                  fontFamily: "Gugi",
                }}
              >
                {title}
              </h1>
            </div>
            <p
              style={{
                fontSize: "32px",
                color: colorLight,
                fontWeight: "bold",
                margin: "0",
              }}
            >
              {description}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              height: "100%",
            }}
          >
            <img
              src={backgroundPath}
              alt="Background image"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 24px 24px 0",
                objectFit: "cover",
                filter: "grayscale(100%)",
              }}
            />
            <p style={{
              position: "absolute",
              bottom: "0%",
              right: "24px",
              color: "white",
              fontSize: "18px",
            }}>@baptistelechat</p>
          </div>
        </div>
      </div>
    ),
    {
      // debug: true,
      fonts: [
        {
          name: "Roboto",
          data: robotoFontData,
        },
        {
          name: "Gugi",
          data: gugiFontData,
        },
      ],
    }
  );
}
