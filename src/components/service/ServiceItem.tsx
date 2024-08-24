import { deleteService, getService } from "@/api/Service";
import { Service } from "@/types/Service";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CopyOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, message, App, Space, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

interface ServiceItemProps {
  service: Service;
  onItemDeleted: () => void;
}

const handleClick = (link: string) => {
  window.open(link, "_blank");
};

const handleCopy = (text?: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    message.success({
      content: "Kredensial berhasil disalin",
    });
  });
};

const CredentialField = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <Space.Compact>
    <Input
      value={value}
      type={label === "password" ? "password" : "text"}
      disabled
    />
    <Button
      onClick={(event) => {
        event.stopPropagation();
        handleCopy(value);
      }}
      icon={<CopyOutlined />}
      aria-label={`Copy service ${label}`}
    />
  </Space.Compact>
);

const ServiceItem = ({ service, onItemDeleted }: ServiceItemProps) => {
  const { modal, notification } = App.useApp();

  const navigate = useNavigate();

  const handleDeleteService = async (id: string) => {
    try {
      await deleteService(id);
      notification.success({
        message: "Berhasil Menghapus Layanan",
        description: "Layanan berhasil dihapus",
      });
      onItemDeleted();
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Terjadi Kesalahan",
        description: "Gagal menghapus layanan",
      });
    }
  };

  const showModal = async () => {
    try {
      const serviceDetail = await getService(service.id);

      const { credential } = serviceDetail;

      if (!credential) return;

      modal.info({
        maskClosable: true,
        closable: true,
        okCancel: true,
        title: `Kredensial Layanan: ${service.name}`,
        content: (
          <div className="flex flex-col gap-3">
            {credential.username && (
              <CredentialField label="username" value={credential.username} />
            )}
            {credential.password && (
              <CredentialField label="password" value={credential.password} />
            )}
            <span className="italic">
              {credential.hasSso ? (
                <>
                  <CheckCircleTwoTone
                    twoToneColor={"#52c41a"}
                    className="mr-1"
                  />
                  Tersedia Single Sign On
                </>
              ) : (
                <>
                  <CloseCircleTwoTone
                    twoToneColor={"#ff4d4f"}
                    className="mr-1"
                  />
                  Tidak Tersedia Single Sign On
                </>
              )}
            </span>
            <span className="italic">Catatan: {credential.note ?? "-"}</span>
          </div>
        ),
        cancelText: "Tutup",
        okText: "Lihat",
        onOk: () => handleClick(service.link),
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Terjadi Kesalahan",
        description: "Gagal memuat kredensial layanan",
      });
    }
  };

  return (
    <div className="bg-white rounded-md drop-shadow-md p-5 gap-2 flex flex-col ">
      <Dropdown
        menu={{
          items: [
            {
              key: "update",
              label: "Ubah",
              onClick: () => navigate(`/services/${service.id}`),
            },
            {
              key: "delete",
              label: "Hapus",
              danger: true,
              onClick: () => handleDeleteService(service.id),
            },
          ],
        }}
        placement="bottomRight"
      >
        <Button
          className="absolute top-5 right-5"
          icon={<MoreOutlined />}
          size="small"
        />
      </Dropdown>
      <div>
        <Image preview={false} height={48} src={service.imageUrl} />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <div className="text-lg text-black font-semibold">{service.name}</div>
        <div className="text-sm text-gray-500 line-clamp-2 mb-5">
          {service.description}
        </div>
        <div className=" flex flex-col gap-2 mt-auto">
          <Button type="primary" onClick={() => handleClick(service.link)}>
            Lihat
          </Button>
          {service.credential && (
            <Button onClick={showModal}>Tampilkan Kredensial</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
