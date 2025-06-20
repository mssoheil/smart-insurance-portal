import { Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import loadable from "@loadable/component";

const ApplyPage = loadable(() => import("./pages/apply"));
const SubmissionsPage = loadable(() => import("./pages/submissions"));

const { Header, Content } = Layout;

const menuItems = [
  { key: "/", label: "Apply" },
  { key: "/submissions", label: "Submissions" },
];

const stylesheet = { minHeight: "100vh" };

const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout style={stylesheet}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          onClick={(e) => navigate(e.key)}
          items={menuItems}
        />
      </Header>
      <Content>
        <div className="lg:max-w-6xl mx-auto px-2 lg:px-4 py-2 lg:py-8">
          <Routes>
            <Route path="/" element={<ApplyPage />} />
            <Route path="/submissions" element={<SubmissionsPage />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
