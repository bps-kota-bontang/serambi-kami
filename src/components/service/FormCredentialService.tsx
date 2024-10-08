import { Credential } from "@/types/Credential";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CopyOutlined,
} from "@ant-design/icons";
import { App, Button, Input, Space } from "antd";

interface FormCredentialServiceProps {
  credential: Credential;
}

const FormCredentialService = ({ credential }: FormCredentialServiceProps) => {
  const { message } = App.useApp();

  const handleCopy = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      message.success({
        content: "Kredensial berhasil disalin",
      });
    });
  };
  return (
    <div className="flex flex-col gap-3">
      {credential.username && (
        <>
          <span className="text-sm">Nama Pengguna</span>
          <Space.Compact>
            <Input.Password value={credential.username} />
            <Button
              onClick={() => handleCopy(credential.username)}
              icon={<CopyOutlined />}
            />
          </Space.Compact>
        </>
      )}
      {credential.password && (
        <>
          <span className="text-sm">Kata Sandi</span>
          <Space.Compact>
            <Input.Password value={credential.password} />
            <Button
              onClick={() => handleCopy(credential.password)}
              icon={<CopyOutlined />}
            />
          </Space.Compact>
        </>
      )}
      <span className="italic">
        {credential.hasSso ? (
          <>
            <CheckCircleTwoTone twoToneColor={"#52c41a"} className="mr-1" />
            Tersedia Single Sign On
          </>
        ) : (
          <>
            <CloseCircleTwoTone twoToneColor={"#ff4d4f"} className="mr-1" />
            Tidak Tersedia Single Sign On
          </>
        )}
      </span>
      <span className="italic">Catatan: {credential.note ?? "-"}</span>
    </div>
  );
};

export default FormCredentialService;
