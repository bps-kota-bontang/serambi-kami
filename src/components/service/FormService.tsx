import { getService, getServiceTags } from "@/api/Service";
import { getTeams } from "@/api/Team";
import { API_BASE_URL } from "@/configs/Constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Team } from "@/types/Team";
import {
  App,
  Card,
  Form,
  Input,
  Image,
  Select,
  SelectProps,
  Upload,
  Checkbox,
  Button,
  Empty,
  Spin,
} from "antd";
import { useEffect, useState } from "react";

interface FormServiceProps {
  serviceId?: string;
  onSubmit: (values: any) => Promise<any>;
}
const FormService = ({ serviceId, onSubmit }: FormServiceProps) => {
  const [labels, setLables] = useState<SelectProps["options"]>([]);
  const [teams, setTeams] = useState<SelectProps["options"]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { message, notification } = App.useApp();
  const [image, setImage] = useState<string>();
  const isMobile = useMediaQuery();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchServiceTags = async () => {
      try {
        const data = await getServiceTags("all");
        setLables(
          data.tags.map((item: string) => ({ label: item, value: item }))
        );
      } catch (error) {
        setError(error);
      }
    };

    fetchServiceTags();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(
          data.map((item: Team) => ({ label: item.name, value: item.id }))
        );
      } catch (error) {
        setError(error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      if (serviceId) {
        try {
          setIsLoading(true);
          const data = await getService(serviceId);
          form.setFieldsValue({
            name: data.name,
            description: data.description,
            link: data.link,
            teams: data.teams.map((item: { team: Team }) => item.team.id),
            tags: data.tags,
            image: data.imageUrl,
            hasLogo: data.hasLogo,
            username: data.credential?.username,
            password: data.credential?.password,
            note: data.credential?.note,
            hasSso: data.credential?.hasSso,
          });
          setImage(data.imageUrl);
        } catch (error) {
          console.error("An error occurred: ", error);
          setError(error);
          notification.error({
            message: "Gagal mendapatkan informasi layanan",
            description:
              "Terjadi kesalahan saat mendapatkan informasi layanan. Silakan coba lagi.",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchService();
  }, [form, notification, serviceId]);

  const onFinish = async (values: any) => {
    setIsSubmitting(true);
    const result = await onSubmit(values);
    if (result && !serviceId) {
      form.resetFields();
      setImage(undefined);
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <Spin className="flex-1 flex justify-center items-center" size="large" />
    );
  }

  if (error) {
    return (
      <Empty
        className="flex-1 flex flex-col justify-center items-center"
        description="Terjadi kesalahan"
      />
    );
  }

  return (
    <Form onFinish={onFinish} layout="vertical" form={form}>
      <Card>
        <Card.Grid
          style={{
            width: isMobile ? "100%" : "50%",
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
            <Input.TextArea rows={4} placeholder="Masukkan deskripsi layanan" />
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
              optionFilterProp="label"
              placeholder="Masukan tim"
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
            tooltip="Foto layanan wajib diisi"
            rules={[
              { required: true, message: "Silahkan masukan foto layanan" },
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
                  //console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  const imageUrl = info.file.response.data.imageUrl;
                  setImage(imageUrl);

                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Image
                preview={false}
                className="max-w-lg max-h-96"
                alt="Foto layanan"
                src={image || ""}
                loading="lazy"
                fallback={"/default.png"}
              />
            </Upload>
          </Form.Item>
          <p className="text-xs italic">
            Foto layanan dapat berupa logo atau tangkapan layar layanan.
          </p>
          <p className="text-xs italic">
            Khusus tangkapan layar gunakan ukuran 300 x 100.
          </p>
          <Form.Item name="hasLogo" valuePropName="checked">
            <Checkbox>Apakah berupa logo?</Checkbox>
          </Form.Item>
        </Card.Grid>
        <Card.Grid
          style={{
            width: isMobile ? "100%" : "50%",
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
            <Button loading={isSubmitting} type="primary" htmlType="submit">
              Perbarui
            </Button>
          </Form.Item>
        </Card.Grid>
      </Card>
    </Form>
  );
};

export default FormService;
