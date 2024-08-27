import { useAuth } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { protectedRoutes } from "@/routes/ProtectedRoute";
import { createBreadcrumbItems } from "@/utils/Breadcrumb";
import { getInitials } from "@/utils/String";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, MenuProps, Breadcrumb, Button } from "antd";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ collapsed, setCollapsed }, ref) => {
    const { user, logout } = useAuth();
    const { pathname } = useLocation();
    const isMobile = useMediaQuery();

    const pathnames = pathname
      .toLowerCase()
      .split("/")
      .filter((x) => x);

    const breadcrumbItems = createBreadcrumbItems(pathnames, protectedRoutes);

    const items: MenuProps["items"] = [
      {
        key: "profile",
        label: <Link to="/profile">Profile</Link>,
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        danger: true,
        label: "Logout",
        onClick: () => logout(),
      },
    ];

    return (
      <>
        <Layout.Header
          ref={ref}
          className="flex items-center p-0 gap-2 pr-5 bg-white"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex-1" />

          <span className="text-md">{!isMobile ? user?.name : null}</span>

          <Dropdown menu={{ items }}>
            <Avatar style={{ backgroundColor: "#f56a00" }}>
              {user?.name ? getInitials(user.name) : "😸"}
            </Avatar>
          </Dropdown>
        </Layout.Header>
        <Breadcrumb className="p-3" items={breadcrumbItems} />
      </>
    );
  }
);

export default Header;
