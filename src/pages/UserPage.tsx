import { useParams, useNavigate } from "react-router-dom";
import useUsersStore from "../stores/useUsersStore";

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
  Modal,
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

function getAge(birthdate: string) {
  return dayjs().diff(dayjs(birthdate), "year");
}

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { fetchUserById, deleteUser } = useUsersStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserById(userId)
        .then((data) => setUser(data))
        .finally(() => setLoading(false));
    }
  }, [userId, fetchUserById]);

  const handleEdit = () => {
    navigate(`/admin/user/edit/${user?.id}`);
  };

  const confirmDelete = () => {
    if (user) {
      deleteUser(user.id);
      setModalOpened(false);
      navigate("/admin/users");
    }
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
        onClick={() => navigate(-1)}
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
            onClick={() => setModalOpened(true)}
          >
            Supprimer
          </Button>
        </Group>
      </Flex>

      <Divider mb="xl" />

      <Stack>
        <Group align="center">
          <IconCake size={20} />
          <Text size="md">
            {dayjs(user.birthdate).format("DD MMMM YYYY")} (
            {getAge(user.birthdate)} ans)
          </Text>
        </Group>

        <Group align="center">
          <IconMail size={20} />
          <Text size="md">{user.email}</Text>
        </Group>

        <Group align="center">
          <IconPhone size={20} />
          <Text size="md">{user.phone}</Text>
        </Group>
      </Stack>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Confirmer la suppression"
        centered
      >
        <Text>Es-tu sûr de vouloir supprimer cet utilisateur ?</Text>
        <Group mt="md" justify="flex-end">
          <Button variant="default" onClick={() => setModalOpened(false)}>
            Annuler
          </Button>
          <Button color="red" onClick={confirmDelete}>
            Supprimer
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default UserPage;
