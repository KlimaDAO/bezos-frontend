import { getCategoryInfo } from "lib/getCategoryInfo";
import Image from "next/legacy/image";
import { FC } from "react";

type Props = {
  category: string;
};

export const ProjectImage: FC<Props> = (props) => {
  const category = getCategoryInfo(props.category);

  return (
    <Image
      src={category.imageSrc}
      alt={category.label}
      objectFit="cover"
      layout="fill"
    />
  );
};
