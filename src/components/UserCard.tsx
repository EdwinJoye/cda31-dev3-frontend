import {
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  ActionIcon,
  Box,
  Menu,
} from "@mantine/core";
import {
  IconCake,
  IconMail,
  IconPhone,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import useUsersStore from "../stores/useUsersStore";
import { useConfirmDelete } from "../hooks/useConfirmDelete";
import type { User } from "../models/User";

interface UserCardProps {
  user: User;
}

dayjs.extend(relativeTime);

export const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();
  const { deleteUser } = useUsersStore();

  const { confirmDelete } = useConfirmDelete({
    onConfirm: () => deleteUser(user.id),
  });

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/admin/user/edit/${user.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    confirmDelete(user);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      className="max-w-[420px] !h-full cursor-pointer transition-all duration-200 hover:scale-101 hover:shadow-sm hover:brightness-96"
      onClick={() => navigate(`/admin/user/${user.id}`)}
    >
      <Group mb="md" className="justify-between">
        <Group>
          <Avatar src={user.photo} size={64} radius="xl" />
          <div>
            <Text size="lg" className="font-bol">
              {user.firstname} {user.lastname}
            </Text>
            <Text size="sm" color="dimmed">
              {user.city}, {user.country}
            </Text>
          </div>
        </Group>

        <Box className="h-full">
          <Menu shadow="md" width={160} position="bottom-start">
            <Menu.Target>
              <ActionIcon
                size={20}
                variant="default"
                className="border-0"
                onClick={handleMenuClick}
              >
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEdit size={16} />}
                onClick={handleEdit}
              >
                Éditer
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size={16} />}
                color="red"
                onClick={handleDelete}
              >
                Supprimer
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Group>
      <Badge variant="light" size="md" color="blue">
        {user.category}
      </Badge>
      <Divider my="sm" />

      <Stack>
        <Group>
          <IconMail size={16} />
          <Text size="sm">{user.email}</Text>
        </Group>

        <Group>
          <IconPhone size={16} />
          <Text size="sm">{user.phone}</Text>
        </Group>

        <Group>
          <IconCake size={16} />
          <Text size="sm">{dayjs(user.birthdate).format("DD MMMM YYYY")}</Text>
        </Group>
      </Stack>
    </Card>
  );
};
