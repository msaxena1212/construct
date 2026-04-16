export interface SidebarMenu {
  id: number;
  name: string;
  path: string;
  icon?: string;
  parentId: number | null;
  order: number;
  subMenuName?: string;
  subMenu?: SidebarMenu[];
}
