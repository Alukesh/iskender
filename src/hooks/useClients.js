import { useQuery } from "react-query";

import api from "../services/api";

export const fetchClients = ({ searchString }) => {
  return api
    .get(`/sklad/searchUsers?search=${searchString}`)
    .then((res) => res.data);
};

export const useClients = (props) => {
  const searchString = props?.searchString
  return useQuery({
    queryKey: [searchString],
    queryFn: () => fetchClients({ searchString }),
    enabled: true,
  });
};
