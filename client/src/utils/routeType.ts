export interface routeType {
  name: string;
  path: string;
  exact: boolean;
  component: any;
  icon: string | null;
  auth: boolean;
}
