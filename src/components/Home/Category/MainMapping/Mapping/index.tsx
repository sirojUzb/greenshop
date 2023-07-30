import { FC } from "react";
import Card from "./Card";
import useQueryHandler from "../../../../../hooks/useQuery";
import { useSearchParams } from "react-router-dom";
import { MainCardType } from "../../../../../@types";

const Mappping: FC = () => {
  const useQuery = useQueryHandler();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") ?? "house-plants";
  const paramsSort = searchParams.get("sort") ?? "default-sorting";
  const paramsType = searchParams.get("type") ?? "all-plants";

  const { data } = useQuery({
    queryURL: `/flower/category/${category}`,
    queryKEY: `flower/${category}?sort=${paramsSort}&type=${paramsType}`,
    method: "GET",
    params: {
      sort: paramsSort,
      type: paramsType,
    },
  });

  return (
    <div className="mt-[30px] grid grid-cols-3 gap-4 max-sm:grid-cols-2">
      {data?.map((value: MainCardType) => (
        <Card key={value._id} value={value} />
      ))}
    </div>
  );
};

export default Mappping;