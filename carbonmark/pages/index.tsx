import { Home, Props } from "components/pages/Home";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {},
    revalidate: 600,
  };
};

export default Home;
