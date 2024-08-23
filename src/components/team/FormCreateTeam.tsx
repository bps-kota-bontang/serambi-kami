import { Form, FormInstance, Input } from "antd";

interface FormCreateTeamProps {
  form: FormInstance<any>;
  onSubmit: (values: any) => void;
}

const FormCreateTeam = ({ onSubmit, form }: FormCreateTeamProps) => {
  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item
        label="Nama Tim"
        name={"name"}
        required
        tooltip="Nama tim wajib diisi"
        rules={[
          {
            required: true,
            message: "Silahkan nama tim",
          },
        ]}
      >
        <Input placeholder="Nama Tim" />
      </Form.Item>
    </Form>
  );
};

export default FormCreateTeam;
