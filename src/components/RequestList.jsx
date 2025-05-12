import React from "react";
import { Table, Button, Input, DatePicker, Space, message } from "antd";
import { useRequests } from "../hooks/useRequests";
import dayjs from "dayjs";

export default function RequestList() {
  const { data: requests = [], isLoading, deleteTicket } = useRequests();
  const [flightNumber, setFlightNumber] = React.useState("");
  const [departureDate, setDepartureDate] = React.useState(null);

  const handleDelete = (id) => {
    deleteTicket.mutate(id, {
      onSuccess: () => message.success("Заявку видалено"),
      onError: () => message.error("Помилка при видаленні"),
    });
  };

  const filtered = requests.filter((r) => {
    const matchesFlight = flightNumber
      ? r.flightNumber.includes(flightNumber)
      : true;
    const matchesDate = departureDate
      ? r.departureDate === dayjs(departureDate).format("YYYY-MM-DD")
      : true;
    return matchesFlight && matchesDate;
  });

  const columns = [
    { title: "№", render: (_, __, index) => index + 1 },
    { title: "Пункт призначення", dataIndex: "destination" },
    { title: "Місце відправлення", dataIndex: "departure" },
    { title: "Номер рейсу", dataIndex: "flightNumber" },
    { title: "Тип літака", dataIndex: "aircraftType" },
    { title: "ПІБ пасажира", dataIndex: "passengerName" },
    { title: "Дата вильоту", dataIndex: "departureDate" },
    { title: "Тривалість польоту", dataIndex: "flightDuration" },
    {
      title: "Дії",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Видалити
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Номер рейсу"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <DatePicker
          placeholder="Дата вильоту"
          value={departureDate}
          onChange={(value) => setDepartureDate(value)}
        />
        <Button
          onClick={() => {
            setFlightNumber("");
            setDepartureDate(null);
          }}
        >
          Скинути
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
