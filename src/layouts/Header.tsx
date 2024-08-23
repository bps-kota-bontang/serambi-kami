import { useAuth } from "@/hooks/useAuth";
import { protectedRoutes } from "@/routes/ProtectedRoute";
import { createBreadcrumbItems } from "@/utils/Breadcrumb";
import { Avatar, Dropdown, Layout, MenuProps, Breadcrumb } from "antd";
import { forwardRef } from "react";
import { useLocation } from "react-router-dom";

const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const pathnames = pathname
    .toLowerCase()
    .split("/")
    .filter((x) => x);

  const breadcrumbItems = createBreadcrumbItems(pathnames, protectedRoutes);

  const items: MenuProps["items"] = [
    {
      key: "profile",
      disabled: true,
      label: "Profile",
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
      <Layout.Header ref={ref} className="flex items-center gap-2 bg-white">
        <div className="flex-1" />

        <span className="text-md">{user?.name}</span>

        <Dropdown menu={{ items }}>
          <Avatar src={"/serambi-logo.png"} />
        </Dropdown>
      </Layout.Header>
      <Breadcrumb className="p-3" items={breadcrumbItems} />
    </>
  );
});

export default Header;
