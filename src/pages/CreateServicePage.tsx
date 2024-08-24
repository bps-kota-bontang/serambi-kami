import { createService, getServiceTags } from "@/api/Service";
import { getTeams } from "@/api/Team";
import { API_BASE_URL } from "@/configs/Constant";
import { Team } from "@/types/Team";
import { UploadOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Select,
  SelectProps,
  Upload,
} from "antd";
import { useEffect, useState } from "react";

const CreateServicePage = () => {
  const { notification, message } = App.useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [labels, setLables] = useState<SelectProps["options"]>([]);
  const [teams, setTeams] = useState<SelectProps["options"]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchServiceTags = async () => {
      const data = await getServiceTags("all");
      setLables(
        data.tags.map((item: string) => ({ label: item, value: item }))
      );
    };

    fetchServiceTags();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeams();
      setTeams(
        data.map((item: Team) => ({ label: item.name, value: item.id }))
      );
    };

    fetchTeams();
  }, []);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const { image, username, password, note, hasSso, teams, ...payload } =
        values;

      await createService({
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
        imageUrl: image.file.response.data.imageUrl,
      });
      form.resetFields();
      notification.success({
        message: "Berhasil menambahkan layanan",
        description:
          "Anda telah berhasil menambahkan layanan baru. Silakan cek kembali daftar layanan Anda.",
      });
    } catch (error) {
      console.error("An error occurred: ", error);
      notification.error({
        message: "Gagal menambahkan layanan",
        description:
          "Terjadi kesalahan saat menambahkan layanan. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full bg-white p-5 flex flex-col gap-2">
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Card>
          <Card.Grid
            style={{
              width: "50%",
            }}
            hoverable={false}
          >
            <Form.Item
              name="name"
              label="Nama Layanan"
              required
              tooltip="Nama layanan wajib diisi"
              rules={[
                { required: true, message: "Silahkan masukan nama layanan" },
              ]}
            >
              <Input placeholder="Masukkan nama layanan" />
            </Form.Item>
            <Form.Item
              label="Deskripsi Layanan"
              name="description"
              required
              tooltip="Deskripsi layanan wajib diisi"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukan deskripsi layanan",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Masukkan nama deskripsi" />
            </Form.Item>
            <Form.Item
              label="Tautan Layanan"
              required
              name={"link"}
              rules={[
                {
                  required: true,
                  message: "Silahkan masukan tautan layanan",
                },
              ]}
              tooltip="Tautan layanan wajib diisi"
            >
              <Input placeholder="Masukkan tautan layanan" />
            </Form.Item>
            <Form.Item
              label="Tim"
              name={"teams"}
              required
              tooltip="Tim wajib diisi"
              rules={[
                {
                  required: true,
                  message: "Silahkan masukan tim",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Masukan label layanan"
                options={teams}
              />
            </Form.Item>
            <Form.Item label="Label Layanan" name={"tags"}>
              <Select
                mode="tags"
                allowClear
                placeholder="Masukan label layanan"
                options={labels}
              />
            </Form.Item>
            <Form.Item
              label="Foto Layanan"
              name={"image"}
              valuePropName="image"
              required
              rules={[
                { required: true, message: "Silahkan pilih foto layanan" },
              ]}
            >
              <Upload
                name="image"
                accept="image/*,"
                action={`${API_BASE_URL}/v1/services/upload`}
                withCredentials={true}
                maxCount={1}
                onChange={(info) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Card.Grid>
          <Card.Grid
            style={{
              width: "50%",
            }}
            hoverable={false}
          >
            <Form.Item
              name="username"
              label="Nama Pengguna Layanan"
              tooltip="Hanya diisi jika layanan memiliki kredensial selain Single Sign On"
            >
              <Input placeholder="Masukkan nama pengguna layanan" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Kata Sandi Pengguna Layanan"
              tooltip="Hanya diisi jika layanan memiliki kredensial selain Single Sign On"
            >
              <Input.Password
                placeholder="Masukkan kata sandi pengguna layanan"
                autoComplete="on"
              />
            </Form.Item>
            <Form.Item label="Catatan Kredensial Layanan" name="note">
              <Input.TextArea rows={4} placeholder="Masukkan nama deskripsi" />
            </Form.Item>
            <Form.Item name="hasSso" valuePropName="checked">
              <Checkbox>Apakah tersedia Single Sign On?</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Tambah
              </Button>
            </Form.Item>
          </Card.Grid>
        </Card>
      </Form>
    </div>
  );
};

export default CreateServicePage;
