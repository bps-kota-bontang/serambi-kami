import { deleteService, getService } from "@/api/Service";
import { Service } from "@/types/Service";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Image, App, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import FormCredentialService from "@/components/service/FormCredentialService";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ServiceItemProps {
  service: Service;
  onItemDeleted: () => void;
}

const ServiceItem = ({ service, onItemDeleted }: ServiceItemProps) => {
  const { modal, notification } = App.useApp();
  const isMobile = useMediaQuery();
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

  const handleClick = (link: string) => {
    window.open(link, "_blank");
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
        content: <FormCredentialService credential={credential} />,
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
    <div className="relative bg-white rounded-md drop-shadow-md p-5 gap-2 flex flex-col ">
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
              onClick: () => {
                modal.error({
                  maskClosable: true,
                  closable: true,
                  okCancel: true,
                  title: `Hapus Layanan: ${service.name}`,
                  content: "Apakah Anda yakin ingin menghapus layanan ini?",
                  cancelText: "Batal",
                  okText: "Hapus",
                  onOk: () => handleDeleteService(service.id),
                });
              },
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
        <Image
          preview={false}
          height={isMobile ? undefined : 48}
          width={isMobile ? 48 : undefined}
          src={service.imageUrl}
        />
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
            <Button onClick={showModal}>
              {isMobile ? "Kredensial" : "Tampilkan Kredensial"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
