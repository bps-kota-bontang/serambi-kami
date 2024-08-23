import { APP_NAME } from "@/configs/Constant";
import { menus } from "@/configs/Menu";
import { Layout, Menu } from "antd";
import { forwardRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = forwardRef<HTMLDivElement>((_, ref) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedMenuKey = pathname.toLowerCase().split("/").filter(Boolean)[0];

  return (
    <Layout.Sider
      ref={ref}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log("Broken:", broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Link to="/" className="flex flex-row items-end pt-4 px-5 pb-2">
        <img src="/serambi-logo.png" alt="logo" className="h-12 w-12 mr-1" />
        <span className="text-white text-lg">{APP_NAME}</span>
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedMenuKey]}
        onClick={(e) => {
          return navigate(`/${e.key}`);
        }}
        items={menus}
      />
    </Layout.Sider>
  );
});

export default Sidebar;
