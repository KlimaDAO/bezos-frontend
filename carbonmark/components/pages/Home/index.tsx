import { Section, Text } from "@klimadao/lib/components";
import { NextPage } from "next";

export interface Props {
  deleteme?: () => void;
}

export const Home: NextPage<Props> = () => {
  return (
    <>
      <Section variant="gray">
        <Text>A new era for kleema dow</Text>
      </Section>
    </>
  );
};
