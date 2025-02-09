import { ReactElement } from "react";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export const withLayout = (
  PageComponent: NextPageWithLayout,
  Layout: (props: any) => ReactElement
) => {
  PageComponent.getLayout = (page) => <Layout>{page}</Layout>;
  return PageComponent;
};
