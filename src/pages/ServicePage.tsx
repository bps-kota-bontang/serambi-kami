import { getServices, getServiceTags } from "@/api/Service";
import ServiceItem from "@/components/service/ServiceItem";
import { Service } from "@/types/Service";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, SelectProps } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ServicePage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [tags, setTags] = useState<string[]>([]);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const navigate = useNavigate();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialKeyword = searchParams.get("keyword") || "";
    const initialLimit = parseInt(searchParams.get("limit") || "10");
    const initialPage = parseInt(searchParams.get("page") || "1");
    const initialTags = searchParams.get("tags")?.split(",") || [];

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

  const fetchServices = useCallback(async () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(async () => {
      const data = await getServices(keyword, tags, page, limit);
      setServices(data.services);
      setTotal(data.total);
    }, 300);
  }, [keyword, limit, page, tags]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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
          onChange={(value) => setTags(value)}
          options={options}
        />
        <Input.Search
          value={keyword}
          className="xl:col-span-2 col-span-1"
          placeholder="Cari berdasarkan nama atau deskripsi layanan"
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={(value) => setKeyword(value)}
        />
      </div>

      <div className="my-5 flex-1 grid gap-5 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 auto-rows-min">
        {services.map((item: Service, index: number) => {
          return (
            <ServiceItem
              onItemDeleted={fetchServices}
              key={index}
              service={item}
            />
          );
        })}
      </div>
      <Pagination
        align="center"
        total={total}
        showSizeChanger
        defaultPageSize={1}
        pageSize={limit}
        pageSizeOptions={[10, 25, 50, 100]}
        showQuickJumper
        onChange={(page, pageSize) => {
          setPage(page);
          setLimit(pageSize);
        }}
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
};

export default ServicePage;
