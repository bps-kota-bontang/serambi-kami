export interface Route {
  root: string;
  title: string;
  isIndex?: boolean;
  isDynamic?: boolean;
  path?: string;
  element: React.ReactNode;
}
