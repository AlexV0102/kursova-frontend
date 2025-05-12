import { Form, Input, DatePicker, Button, message } from "antd";
import { useRequests } from "../hooks/useRequests";

export default function RequestForm() {
  const [form] = Form.useForm();
  const { addTicket } = useRequests();

  const onFinish = (values) => {
    const payload = {
      ...values,
      departureDate: values.departureDate.format("YYYY-MM-DD"),
    };

    addTicket.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        message.success("Заявка додана");
      },
      onError: () => {
        message.error("Помилка при додаванні заявки");
      },
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="destination"
        label="Пункт призначення"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="departure"
        label="Місце відправлення"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="flightNumber"
        label="Номер рейсу"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="aircraftType"
        label="Тип літака"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="passengerName"
        label="ПІБ пасажира"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="departureDate"
        label="Дата вильоту"
        rules={[{ required: true }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        name="flightDuration"
        label="Тривалість польоту"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Додати заявку
        </Button>
      </Form.Item>
    </Form>
  );
}
