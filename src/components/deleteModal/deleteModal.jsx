import { IconCheck } from "@tabler/icons-react";
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react";

const STATUS_VALUES = ["To Do", "In Progress", "Completed"];

export default function DeleteModal({
  taskToDelete,
  setTaskToDelete,
  deleteTaskById,
}) {
  const [open, setOpened] = useState(false);

  useEffect(() => {
    setOpened(taskToDelete !== null);
  }, [JSON.stringify(taskToDelete)]);

  const clearTaskToDelete = () => {
    setTaskToDelete(null);
  };

  const onDelete = () => {
    const id = notifications.show({
      loading: true,
      title: "Deleting task...",
      message: "We'll let you know when it's done",
      autoClose: false,
      withCloseButton: false,
    });
    deleteTaskById(taskToDelete.id)
      .then(() => {
        notifications.update({
          id,
          color: "teal",
          title: "Task deleted!",
          message: "Updating list...",
          icon: <IconCheck size={18} />,
          loading: false,
          autoClose: 2000,
        });
      })
      .catch(() => {
        notifications.update({
          id,
          color: "red",
          title: "Something went wrong!",
          message: "Please try again next time",
          icon: <IconCheck size={18} />,
          loading: false,
          autoClose: 2000,
        });
      });
    clearTaskToDelete();
  };

  return (
    <Modal
      opened={open}
      onClose={clearTaskToDelete}
      title="Delete task"
      centered
    >
      <form>
        <TextInput label="Title" placeholder={taskToDelete?.title} disabled />
        <Textarea
          label="Description"
          placeholder={taskToDelete?.description}
          disabled
        />
        <Select
          label="Status"
          data={STATUS_VALUES}
          defaultValue={taskToDelete?.status}
          allowDeselect={false}
          disabled
        />
        <Group justify="space-between" mt="xl">
          <Button variant="filled" color="red" onClick={onDelete}>
            Delete
          </Button>
          <Button onClick={clearTaskToDelete}>Cancel</Button>
        </Group>
      </form>
    </Modal>
  );
}
