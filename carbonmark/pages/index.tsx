import { Home, Props } from "components/pages/Home";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

interface HomeProps extends Props {
  translation: string;
  fixedThemeName: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async (ctx) => {
  const translation = await loadTranslation(ctx.locale);
  return {
    props: { translation, fixedThemeName: "theme-light" },
  };
};

export default Home;
