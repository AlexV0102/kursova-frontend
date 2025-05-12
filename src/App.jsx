import { Layout, Row, Col, Card, Typography } from "antd";
import RequestForm from "./components/RequestForm";
import RequestList from "./components/RequestList";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Header style={{ background: "#1677ff", padding: "0 20px" }}>
        <Title
          style={{ color: "#fff", lineHeight: "64px", margin: 0 }}
          level={3}
        >
          Облік заявок на авіаквитки
        </Title>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="Нова заявка">
              <RequestForm />
            </Card>
          </Col>
          <Col xs={24} lg={16}>
            <Card title="Список заявок">
              <RequestList />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
