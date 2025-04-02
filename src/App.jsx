import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Home from "./pages/home/";
import { TaskProvider } from "./contexts/taskContext.jsx";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <TaskProvider>
        <Notifications />
        <Home />
      </TaskProvider>
    </MantineProvider>
  );
}
