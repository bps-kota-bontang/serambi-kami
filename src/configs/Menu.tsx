import { ProductOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menus: MenuItem[] = [
  {
    key: "services",
    label: "Layanan",
    icon: <ProductOutlined />,
  },
  {
    key: "teams",
    label: "Tim",
    icon: <TeamOutlined />,
  },
  // {
  //   key: "users",
  //   label: "Pengguna",
  // },
];
