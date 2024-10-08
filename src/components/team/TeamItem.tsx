import { deleteTeam, updateTeamUser, updateTeamUsers } from "@/api/Team";
import { useAuth } from "@/hooks/useAuth";
import { Team } from "@/types/Team";
import { getInitials } from "@/utils/String";
import { MoreOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Badge,
  Button,
  Dropdown,
  Form,
  Modal,
  Tooltip,
} from "antd";
import { useState } from "react";
import FormUpdateTeam from "@/components/team/FormUpdateTeam";
import { User } from "@/types/User";

interface TeamItemProps {
  team: Team;
  onItemUpdated: () => Promise<void>;
  onItemDeleted: () => Promise<void>;
}

const TeamItem = ({ team, onItemUpdated, onItemDeleted }: TeamItemProps) => {
  const { notification, modal } = App.useApp();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const isAdmin = team.users.find((item) => item.user.id === user?.id)?.isAdmin;

  const handleDeleteService = async (id: string) => {
    try {
      await deleteTeam(id);
      notification.success({
        message: "Berhasil Menghapus Tim",
        description: "Tim berhasil dihapus",
      });
      await onItemDeleted();
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Terjadi Kesalahan",
        description: "Gagal menghapus tim",
      });
    }
  };

  const onSubmit = async (values: any) => {
    try {
      setConfirmLoading(true);
      await updateTeamUsers(
        team.id,
        values.users.map((user: string) => {
          return {
            userId: user,
          };
        })
      );
      notification.success({
        message: "Berhasil Memperbarui Anggota Tim",
        description:
          "Anda telah berhasil memperbarui anggota tim. Silakan cek kembali daftar tim Anda.",
      });
      await onItemUpdated();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      notification.error({
        message: "Terjadi Kesalahan",
        description: "Gagal memperbarui anggota tim",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleClickAvatar = async (
    teamId: string,
    user: User,
    status: boolean
  ) => {
    await modal.info({
      maskClosable: true,
      closable: true,
      okCancel: true,
      title: status
        ? `Hapus Admin: ${user.name}`
        : `Jadikan Admin: ${user.name}`,
      content: status
        ? `Apakah Anda yakin ingin menghapus ${user.name} sebagai Admin?`
        : `Apakah Anda yakin ingin menjadikan ${user.name} sebagai Admin?`,
      cancelText: "Batal",
      okText: "Ya",
      onOk: async () => {
        await updateTeamUser(teamId, user.id, { isAdmin: !status });
        await onItemUpdated();
      },
    });
  };

  return (
    <>
      <div className="relative bg-white border rounded-md drop-shadow-sm p-5 gap-2 flex flex-col ">
        {isAdmin || user?.isSuper ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "add",
                  label: "Ubah",
                  onClick: () => {
                    const memberIds = team.users.map((item) => item.user.id);

                    form.setFieldsValue({
                      users: memberIds,
                    });
                    setOpen(true);
                  },
                },
                {
                  key: "delete",
                  label: "Hapus",
                  danger: true,
                  disabled: !user?.isSuper,
                  onClick: async () => {
                    await modal.error({
                      maskClosable: true,
                      closable: true,
                      okCancel: true,
                      title: `Hapus Tim: ${team.name}`,
                      content: "Apakah Anda yakin ingin menghapus tim ini?",
                      cancelText: "Batal",
                      okText: "Hapus",
                      onOk: async () => await handleDeleteService(team.id),
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
        ) : null}

        <div className="flex flex-col justify-center gap-3 mr-10">
          <div className="text-lg text-black font-semibold">{team.name}</div>
          <Avatar.Group
            max={{
              count: 5,
              style: { color: "#f56a00", backgroundColor: "#fde3cf" },
            }}
          >
            {team.users.map((item, index) => {
              return (
                <Tooltip title={item.user.name} placement="top" key={index}>
                  <Badge dot={item.isAdmin} offset={[-5, 5]}>
                    <Avatar
                      style={{ backgroundColor: "#f56a00" }}
                      className={user?.isSuper ? "hover:cursor-pointer" : ""}
                      onClick={
                        user?.isSuper
                          ? async () =>
                              await handleClickAvatar(
                                team.id,
                                item.user,
                                item.isAdmin
                              )
                          : undefined
                      }
                    >
                      {getInitials(item.user.name)}
                    </Avatar>
                  </Badge>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </div>
      </div>

      <Modal
        title={`Ubah Anggota ${team.name}`}
        open={open}
        onOk={form.submit}
        maskClosable={false}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <FormUpdateTeam form={form} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default TeamItem;
