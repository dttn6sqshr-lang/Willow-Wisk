import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import Card from "../../components/card";

export default function Home() {
  return (
    <div>
      <Sidebar />
      <Topbar />

      <Card title="Open Tickets" />
      <Card title="Orders Completed" />
      <Card title="Staff Activity" />
      <Card title="Pending Verification" />
    </div>
  );
}