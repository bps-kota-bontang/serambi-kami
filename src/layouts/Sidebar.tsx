import { APP_NAME } from "@/configs/Constant";
import { menus } from "@/configs/Menu";
import { Layout, Menu } from "antd";
import { forwardRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsed, setCollapsed }, ref) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const selectedMenuKey = pathname
      .toLowerCase()
      .split("/")
      .filter(Boolean)[0];

    return (
      <Layout.Sider
        ref={ref}
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Link to="/" className="flex flex-row items-end pt-4 px-5 pb-2">
          <img src="/serambi-logo.png" alt="logo" className="h-10 w-10 mr-1" />
          {!collapsed ? (
            <span className="text-white text-lg">{APP_NAME}</span>
          ) : null}
        </Link>

        <Menu
          theme="dark"
          selectedKeys={[selectedMenuKey]}
          onClick={(e) => {
            return navigate(`/${e.key}`);
          }}
          items={menus}
        />
      </Layout.Sider>
    );
  }
);

export default Sidebar;
