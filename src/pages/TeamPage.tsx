import { createTeam, getTeams } from "@/api/Team";
import FormCreateTeam from "@/components/team/FormCreateTeam";
import TeamItem from "@/components/team/TeamItem";
import { useAuth } from "@/hooks/useAuth";
import { Team } from "@/types/Team";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, notification } from "antd";
import { useCallback, useEffect, useState } from "react";

const TeamPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();
  const fetchTeams = useCallback(async () => {
    const data = await getTeams("all");
    setTeams(data);
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const onSubmit = async (values: any) => {
    try {
      setConfirmLoading(true);
      await createTeam(values);
      notification.success({
        message: "Berhasil Membuat Tim",
        description:
          "Anda telah berhasil membuat tim. Silakan cek kembali daftar tim Anda.",
      });
      form.resetFields();
      fetchTeams();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      notification.error({
        message: "Terjadi Kesalahan",
        description: "Gagal membuat tim",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-white p-5 flex flex-col gap-2">
        {user?.isSuper && (
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
            >
              Buat
            </Button>
          </div>
        )}

        <div className="my-5 flex-1 grid gap-5 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 auto-rows-min">
          {teams.map((team, index) => {
            return (
              <TeamItem onItemUpdated={fetchTeams} team={team} key={index} />
            );
          })}
        </div>
      </div>
      <Modal
        title={`Buat Tim`}
        open={open}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <FormCreateTeam form={form} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default TeamPage;
