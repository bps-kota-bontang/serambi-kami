import { createTeam, getTeams } from "@/api/Team";
import FormCreateTeam from "@/components/team/FormCreateTeam";
import TeamItem from "@/components/team/TeamItem";
import TeamSkeletonItem from "@/components/team/TeamSkeletonItem";
import { useAuth } from "@/hooks/useAuth";
import { Team } from "@/types/Team";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Empty, Form, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";

const TeamPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { notification } = App.useApp();
  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getTeams("all");
      setTeams(data);
    } catch (e) {
      console.error("An error occurred: ", e);
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? (
          <div className="my-5 flex-1 grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-min">
            {[...Array(5)].map((_item, index) => (
              <TeamSkeletonItem key={index} />
            ))}
          </div>
        ) : teams.length > 0 ? (
          <div className="my-5 flex-1 grid gap-5 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-min">
            {teams.map((team, index) => {
              return (
                <TeamItem
                  onItemDeleted={fetchTeams}
                  onItemUpdated={fetchTeams}
                  team={team}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <Empty className="my-5 flex-1 content-center"></Empty>
        )}
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
