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
  const XPath = process.env.NEXT_PUBLIC_APP_URL + "/images/og-images/x.svg";
  const randomImageNumber = Math.floor(Math.random() * 10) + 1;
const backgroundPath =
    process.env.NEXT_PUBLIC_APP_URL + `/images/og-images/${randomImageNumber}.jpg`;

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
              position: "relative",
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
                  display: homepage === "1" ? "block" : "none",
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
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: "18px",
                right: "18px",
                color: "black",
              }}
            >
              <img
                src={XPath}
                alt="X Logo"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              <p
                style={{
                  fontSize: "20px",
                  padding: "0",
                  margin: "0",
                }}
              >
                @baptistelechat
              </p>
            </div>
          </div>
          <div
            style={{
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
              alt="Background Image"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 24px 24px 0",
                objectFit: "cover",
                filter: "grayscale(100%)",
              }}
            />
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
