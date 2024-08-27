import { getServiceTags } from "@/api/Service";
import ServicesContent from "@/components/service/ServicesContent";
import ServicesFallback from "@/components/service/ServicesFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useServices from "@/hooks/useServices";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Pagination, Select, SelectProps } from "antd";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ServicePage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery();
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [tags, setTags] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [searchParams] = useSearchParams();
  const { services, total, fetchServices } = useServices(
    keyword,
    tags,
    page,
    limit
  );

  const onPageChange = useCallback(
    (page: number, pageSize: number) => {
      setPage(page);
      setLimit(pageSize);

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", page.toString());
      searchParams.set("limit", pageSize.toString());

      navigate({
        pathname: window.location.pathname,
        search: searchParams.toString(),
      });
    },
    [navigate]
  );

  const onKeywordChange = useCallback(
    (newKeyword: string) => {
      setKeyword(newKeyword);
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("keyword", newKeyword);

      navigate({
        pathname: window.location.pathname,
        search: searchParams.toString(),
      });
    },
    [navigate]
  );

  const onTagsChange = useCallback(
    (value: string[]) => {
      setTags(value);
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("tags", value.join(","));

      navigate({
        pathname: window.location.pathname,
        search: searchParams.toString(),
      });
    },
    [navigate]
  );

  useEffect(() => {
    const initialKeyword = searchParams.get("keyword") || "";
    const initialLimit = parseInt(searchParams.get("limit") || "10");
    const initialPage = parseInt(searchParams.get("page") || "1");
    const initialTags =
      searchParams.get("tags") == ""
        ? []
        : searchParams.get("tags")?.split(",") || [];

    setKeyword(initialKeyword);
    setLimit(initialLimit);
    setPage(initialPage);
    setTags(initialTags);
  }, [searchParams]);

  useEffect(() => {
    const fetchServiceTags = async () => {
      const data = await getServiceTags();
      setOptions(
        data.tags.map((item: string) => ({ label: item, value: item }))
      );
    };

    fetchServiceTags();
  }, []);

  return (
    <div className="w-full min-h-full bg-white p-5 flex flex-col gap-2">
      <div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(`/services/create`)}
        >
          Tambah
        </Button>
      </div>
      <div className="grid gap-3 xl:grid-cols-5 md:grid-cols-4 grid-cols-2">
        <Select
          className="xl:col-span-3 md:col-span-3 col-span-1"
          mode="multiple"
          allowClear
          placeholder="Saring berdasarkan label"
          defaultValue={[]}
          value={tags}
          onChange={onTagsChange}
          options={options}
        />
        <Input.Search
          value={keyword}
          className="xl:col-span-2 col-span-1"
          placeholder="Cari berdasarkan nama atau deskripsi layanan"
          onChange={(e) => onKeywordChange(e.target.value)}
          onSearch={(value) => onKeywordChange(value)}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        {services && services.length > 0 ? (
          <Suspense fallback={<ServicesFallback limit={limit} />}>
            <ServicesContent
              services={services}
              onItemDeleted={fetchServices}
            />
            <Pagination
              align="center"
              total={total}
              showSizeChanger
              defaultCurrent={1}
              current={page}
              defaultPageSize={10}
              pageSize={limit}
              pageSizeOptions={[10, 20, 50, 100]}
              showQuickJumper
              onChange={onPageChange}
              showTotal={
                isMobile ? undefined : (total) => `Total ${total} items`
              }
            />
          </Suspense>
        ) : (
          services && <Empty description="Tidak ada layanan" />
        )}
      </div>
    </div>
  );
};

export default ServicePage;
