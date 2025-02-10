import { ReactElement } from "react";
import type { NextPage } from "next";

type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export const withLayout = <T,>(
  PageComponent: NextPageWithLayout<T>,
  Layout: (props: any) => ReactElement
) => {
  PageComponent.getLayout = (page) => <Layout>{page}</Layout>;
  return PageComponent;
};
