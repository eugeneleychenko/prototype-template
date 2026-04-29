import { useState } from "react";
import { Layout, Sidebar, type NavId } from "./components/Sidebar";
import { TeamOverviewView } from "./views/TeamOverviewView";
import { RosterView } from "./views/RosterView";
import { ScheduleView } from "./views/ScheduleView";

export default function App() {
  const [nav, setNav] = useState<NavId>("overview");

  let content;
  switch (nav) {
    case "overview":
      content = <TeamOverviewView />;
      break;
    case "roster":
      content = <RosterView />;
      break;
    case "schedule":
      content = <ScheduleView />;
      break;
    default:
      content = <TeamOverviewView />;
  }

  return (
    <Layout sidebar={<Sidebar active={nav} onNavigate={setNav} />}>
      {content}
    </Layout>
  );
}
