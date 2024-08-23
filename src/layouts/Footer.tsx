import { Layout } from "antd";

const Footer = () => {
  return (
    <Layout.Footer className="text-center">
      © {new Date().getFullYear()}. Made with ❤️ by BPS Kota Bontang. (Versi:
      {APP_VERSION}, Mode: {import.meta.env.MODE}, Build: {import.meta.env.VITE_BUILD_HASH})
    </Layout.Footer>
  );
};

export default Footer;
