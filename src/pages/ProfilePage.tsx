import FormChangePaassword from "@/components/profile/FormChangePassword";
import FormUser from "@/components/profile/FormUser";
import { useAuth } from "@/hooks/useAuth";
import { Empty, Segmented } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [segment, setSegment] = useState("personal");
  const { user } = useAuth();

  useEffect(() => {
    const initialSegment = searchParams.get("segment") || "personal";
    setSegment(initialSegment);
  }, [searchParams]);
  return (
    <div className="w-full min-h-full bg-white p-5  flex flex-col gap-2">
      {user ? (
        <>
          <Segmented
            options={[
              { value: "personal", label: "Data Diri" },
              { value: "password", label: "Ubah Kata Sandi" },
            ]}
            onChange={(value) => {
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("segment", value);

              navigate({
                pathname: window.location.pathname,
                search: searchParams.toString(),
              });
              setSegment(value);
            }}
            value={segment}
          />
          {segment === "personal" ? (
            <FormUser user={user} />
          ) : segment === "password" ? (
            <FormChangePaassword user={user} />
          ) : (
            <Empty
              className="flex-1 flex justify-center items-center flex-col"
              description="Permintaan tidak ditemukan"
            />
          )}
        </>
      ) : (
        <Empty
          className="flex-1 flex justify-center items-center flex-col"
          description="Pengguna tidak ditemukan"
        />
      )}
    </div>
  );
};

export default ProfilePage;
