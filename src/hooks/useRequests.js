import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = "/api/requests";

export const useRequests = () => {
  const queryClient = useQueryClient();

  const ticketsQuery = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axios.get(API);
      return res.data;
    },
  });

  const addTicket = useMutation({
    mutationFn: (newTicket) => axios.post(API, newTicket),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  const deleteTicket = useMutation({
    mutationFn: (id) => axios.delete(`${API}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  return { ...ticketsQuery, addTicket, deleteTicket };
};
