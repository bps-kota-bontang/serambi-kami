import { createService } from "@/api/Service";
import { App } from "antd";
import FormService from "@/components/service/FormService";

const CreateServicePage = () => {
  const { notification } = App.useApp();

  const onSubmit = async (values: any) => {
    try {
      const {
        image,
        username,
        password,
        note,
        hasSso,
        teams,
        tags,
        ...payload
      } = values;

      const result = await createService({
        ...payload,
        tags: tags ?? [],
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
        message: "Berhasil menambahkan layanan",
        description:
          "Anda telah berhasil menambahkan layanan baru. Silakan cek kembali daftar layanan Anda.",
      });

      return result;
    } catch (error) {
      console.error("An error occurred: ", error);
      notification.error({
        message: "Gagal menambahkan layanan",
        description:
          "Terjadi kesalahan saat menambahkan layanan. Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="w-full min-h-full bg-white p-5 flex flex-col gap-2">
      <FormService onSubmit={onSubmit} />
    </div>
  );
};

export default CreateServicePage;
