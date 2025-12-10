import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
