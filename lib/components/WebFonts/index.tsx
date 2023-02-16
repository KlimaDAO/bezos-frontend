import React from "react";

/** <link> elements to load Righteous and Raleway fonts. For Next.js, render this in a <Head> component */
export const WebFonts = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
        rel="stylesheet"
      />
    </>
  );
};
