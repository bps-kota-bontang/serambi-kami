import { getServiceTags } from "@/api/Service";
import ServicesContent from "@/components/service/ServicesContent";
import ServicesFallback from "@/components/service/ServicesFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useServices from "@/hooks/useServices";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Pagination, Select, SelectProps } from "antd";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

const ServicePage = () => {
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const initialLimit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
  const initialPage = Number(searchParams.get("page")) || DEFAULT_PAGE;
  const initialTags =
    searchParams.get("tags")?.split(",")?.filter(Boolean) || [];

  const navigate = useNavigate();
  const isMobile = useMediaQuery();
  const [keyword, setKeyword] = useState<string>(initialKeyword);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const debounceTimeoutRef = useRef<number | null>(null);

  const { services, total, fetchServices } = useServices(
    debouncedKeyword,
    tags,
    page,
    limit
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    searchParams.set("keyword", keyword);
    searchParams.set("tags", tags.join(","));

    navigate({
      pathname: window.location.pathname,
      search: searchParams.toString(),
    });
  }, [page, limit, keyword, tags, navigate]);

  const onPageChange = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  }, []);

  const onKeywordChange = useCallback((newKeyword: string) => {
    setKeyword(newKeyword);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      setPage(DEFAULT_PAGE);
      setDebouncedKeyword(newKeyword);
    }, 300);
  }, []);

  const onTagsChange = useCallback((value: string[]) => {
    setTags(value);
  }, []);

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
              defaultCurrent={DEFAULT_PAGE}
              current={page}
              defaultPageSize={DEFAULT_LIMIT}
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
