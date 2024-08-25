import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Layout } from "antd";

const Footer = () => {
  const isMobile = useMediaQuery();

  return (
    <Layout.Footer className="text-center text-xs">
      {isMobile ? (
        <>
          <p>© {new Date().getFullYear()}. </p>
          <p>BPS Kota Bontang.</p>
        </>
      ) : (
        <>
          © {new Date().getFullYear()}. Made with ❤️ by BPS Kota Bontang.
          (Versi:
          {APP_VERSION}, Mode: {import.meta.env.MODE}, Build: {import.meta.env.VITE_BUILD_HASH})
        </>
      )}
    </Layout.Footer>
  );
};

export default Footer;
