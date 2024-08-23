import { getUsers } from "@/api/User";
import { User } from "@/types/User";
import { Form, FormInstance, Select } from "antd";
import { useCallback, useEffect, useState } from "react";

interface FormUpdateTeamProps {
  form: FormInstance<any>;
  onSubmit: (values: any) => void;
}

const FormUpdateTeam = ({ onSubmit, form }: FormUpdateTeamProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    const data = await getUsers();
    setUsers(data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item
        label="Anggota Tim"
        name={"users"}
        required
        tooltip="Anggota tim wajib diisi"
        rules={[
          {
            required: true,
            message: "Silahkan masukan anggota tim",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Masukan daftar anggota tim"
          options={users.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
        />
      </Form.Item>
    </Form>
  );
};

export default FormUpdateTeam;
