import { updateService } from "@/api/Service";
import FormService from "@/components/service/FormService";
import { App } from "antd";
import { useParams } from "react-router-dom";

const DetailServicePage = () => {
  const { notification } = App.useApp();
  const { serviceId } = useParams();

  const onSubmit = async (values: any) => {
    try {
      const { image, username, password, note, hasSso, teams, ...payload } =
        values;

      if (!serviceId) {
        throw new Error("Service ID is required");
      }

      const result = await updateService(serviceId, {
        ...payload,
        teams: teams.map((team: string) => {
          return {
            teamId: team,
          };
        }),
        credential: {
          username: username,
          password: password,
          note: note,
          hasSso: hasSso ? true : false,
        },
        imageUrl: image.file ? image.file.response.data.imageUrl : image,
      });

      notification.success({
        message: "Berhasil memperbarui layanan",
        description:
          "Anda telah berhasil memperbarui layanan. Silakan cek kembali daftar layanan Anda.",
      });

      return result;
    } catch (error) {
      console.error("An error occurred: ", error);
      notification.error({
        message: "Gagal memperbarui layanan",
        description:
          "Terjadi kesalahan saat memperbarui layanan. Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="w-full min-h-full bg-white p-5 flex flex-col gap-2">
      <FormService onSubmit={onSubmit} serviceId={serviceId} />
    </div>
  );
};

export default DetailServicePage;
