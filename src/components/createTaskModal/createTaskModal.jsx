import {
  IconPin,
  IconHourglass,
  IconChecks,
  IconCheck,
} from "@tabler/icons-react";
import {
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 160;
const STATUS_VALUES = ["To Do", "In Progress", "Completed"];

const icons = {
  "To Do": <IconPin size={20} color="var(--mantine-color-red-6)" />,
  "In Progress": (
    <IconHourglass size={20} color="var(--mantine-color-blue-6)" />
  ),
  Completed: <IconChecks size={20} color="var(--mantine-color-green-6)" />,
};

const renderSelectOption = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.value}
    {checked && <IconCheck style={{ marginInlineStart: "auto" }} />}
  </Group>
);

export default function CreateTaskModal({
  createTaskModalOpened,
  closeCreateTaskModal,
  createTask,
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      status: "To Do",
    },
    validate: {
      title: (value) => {
        if (value.length === 0) return "Must not be empty";
        if (value.length > MAX_TITLE_LENGTH)
          return `Maximum of ${MAX_TITLE_LENGTH} characters`;
        return null;
      },
      description: (value) =>
        value.length > MAX_DESCRIPTION_LENGTH
          ? `Maximum of ${MAX_DESCRIPTION_LENGTH} characters`
          : null,
      status: (value) => !STATUS_VALUES.includes(value),
    },
  });

  useEffect(() => {
    if (createTaskModalOpened) form.reset();
  }, [createTaskModalOpened]);

  const onSubmit = () => {
    const validation = form.validate();
    if (validation.hasErrors) return;
    const id = notifications.show({
      loading: true,
      title: "Creating new task...",
      message: "We'll let you know when it's done",
      autoClose: false,
      withCloseButton: false,
    });
    createTask(form.getValues())
      .then(() => {
        notifications.update({
          id,
          color: "teal",
          title: "Task created!",
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
    closeCreateTaskModal();
  };

  return (
    <Modal
      opened={createTaskModalOpened}
      onClose={closeCreateTaskModal}
      title="New task"
      centered
    >
      <form>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Insert title here"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Insert description here"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <Select
          withAsterisk
          label="Status"
          data={STATUS_VALUES}
          defaultValue={STATUS_VALUES[0]}
          searchValue={form.getValues()["status"]}
          allowDeselect={false}
          renderOption={renderSelectOption}
          onSearchChange={(value) => {
            form.setFieldValue("status", value);
          }}
        />
        <Group justify="center" mt="xl">
          <Button onClick={onSubmit}>Create</Button>
        </Group>
      </form>
    </Modal>
  );
}
