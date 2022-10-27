import { GetStaticPropsContext } from "next";
import { Login } from "components/pages/Marketplace/Users/Login";
import { loadTranslation } from "lib/i18n";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { locale } = ctx;

  try {
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Login Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export default Login;