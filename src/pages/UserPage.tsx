import { useParams, useNavigate } from "react-router-dom";
import useUsersStore from "../stores/useUsersStore";
import { useConfirmDelete } from "../hooks/useConfirmDelete";

import { useEffect, useState } from "react";
import {
  Avatar,
  Text,
  Group,
  Stack,
  Badge,
  Divider,
  Container,
  Title,
  Button,
  Center,
  Loader,
  Flex,
} from "@mantine/core";
import {
  IconMail,
  IconPhone,
  IconCake,
  IconArrowLeft,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import type { User } from "../models/User";
import { useAuthStore } from "../stores/useAuthStore";

function getAge(birthdate: string) {
  return dayjs().diff(dayjs(birthdate), "year");
}

const UserPage = () => {
  const { connectedUser } = useAuthStore();
  const { userId } = useParams<{ userId: string }>();
  const { fetchUserById, deleteUser } = useUsersStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { confirmDelete } = useConfirmDelete({
    onConfirm: () => user && deleteUser(user.id),
    redirectAfterDelete: () => navigate("/admin/users"),
  });

  useEffect(() => {
    if (userId) {
      console.log("Fetching user with ID:", userId);
      setLoading(true);
      fetchUserById(Number(userId))
        .then((data) => {
          if (data) setUser(data);
        })
        .finally(() => setLoading(false));
    }
  }, [userId, fetchUserById]);

  const handleEdit = () => {
    navigate(`/admin/user/edit/${user?.id}`);
  };

  const handleDelete = () => {
    if (!user) return;
    confirmDelete(user);
  };

  if (loading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );

  if (!user)
    return (
      <Center style={{ height: "100vh" }}>
        <Text>User not found</Text>
      </Center>
    );

  return (
    <Container size="md" my="xl">
      <Button
        variant="subtle"
        leftSection={<IconArrowLeft size={18} />}
        mb="md"
        onClick={() => navigate("/admin/users")}
      >
        Retour
      </Button>

      <Flex align="center" justify="space-between" mb="xl" gap="md" wrap="wrap">
        <Group align="center">
          <Avatar src={user.photo} size={120} className="rounded-full" />
          <div>
            <Title order={2} mb={4}>
              {user.firstname} {user.lastname}
            </Title>
            <Badge color="blue" variant="light" size="md">
              {user.category}
            </Badge>
            <Text color="dimmed" size="sm" mt={8}>
              {user.city}, {user.country}
            </Text>
          </div>
        </Group>

        {connectedUser?.admin ? (
          <Group>
            <Button
              leftSection={<IconEdit size={18} />}
              color="blue"
              variant="outline"
              onClick={handleEdit}
            >
              Éditer
            </Button>
            <Button
              leftSection={<IconTrash size={18} />}
              color="red"
              variant="outline"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </Group>
        ) : null}
      </Flex>

      <Divider mb="xl" />

      <Stack>
        {user.birthdate ? (
          <Group align="center">
            <IconCake size={20} />
            <Text size="md">
              {dayjs(user.birthdate).format("DD MMMM YYYY")} (
              {getAge(user.birthdate)} ans)
            </Text>
          </Group>
        ) : null}
        <Group align="center">
          <IconMail size={20} />
          <Text size="md">{user.email}</Text>
        </Group>

        <Group align="center">
          <IconPhone size={20} />
          <Text size="md">{user.phone}</Text>
        </Group>
      </Stack>
    </Container>
  );
};

export default UserPage;
