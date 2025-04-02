import { AppShell, Burger, Image, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateButton from "../../components/createButton";
import CreateTaskModal from "../../components/createTaskModal";
import TaskAccordion from "../../components/taskAccordion/";
import useTasks from "../../hooks/useTasks";
import RefreshButton from "../../components/refreshButton";
import { useState } from "react";
import DeleteModal from "../../components/deleteModal/deleteModal";
import UpdateModal from "../../components/updateModal/updateModal";
import Sidebar from "../../components/sidebar";

export default function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [
    createTaskModalOpened,
    { open: openCreateTaskModal, close: closeCreateTaskModal },
  ] = useDisclosure(false);
  const { tasks, fetchTasks, createTask, deleteTaskById, updateTask } =
    useTasks();
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Image width="30px" height="30xpx" src="/icon.svg" />
          <h3>Task Management App</h3>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <CreateTaskModal
          createTaskModalOpened={createTaskModalOpened}
          closeCreateTaskModal={closeCreateTaskModal}
          createTask={createTask}
        />
        <DeleteModal
          taskToDelete={taskToDelete}
          setTaskToDelete={setTaskToDelete}
          deleteTaskById={deleteTaskById}
        />
        <UpdateModal
          taskToUpdate={taskToUpdate}
          setTaskToUpdate={setTaskToUpdate}
          updateTask={updateTask}
        />
        <Stack>
          <Group justify="space-between">
            <RefreshButton refresh={fetchTasks} />
            <CreateButton open={openCreateTaskModal} />
          </Group>
          <TaskAccordion
            tasks={tasks}
            setTaskToUpdate={setTaskToUpdate}
            setTaskToDelete={setTaskToDelete}
          />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
