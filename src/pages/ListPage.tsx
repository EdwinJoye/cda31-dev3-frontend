import { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Title,
  Pagination,
  Group,
  Button,
} from "@mantine/core";
import { UserCard } from "../components/UserCard";
import useUsersStore from "../stores/useUsersStore";
import { IconUserPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const navigate = useNavigate();
  const { users, fetchAllUsers } = useUsersStore();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container size="xl" py="xl">
      <Group className="justify-between">
        <Title mb="lg">Liste des utilisateurs</Title>
        <Button
          onClick={() => navigate(`/admin/user/create`)}
          leftSection={<IconUserPlus size={20} />}
        >
          Ajouter un utilisateur
        </Button>
      </Group>

      <Grid gutter="lg">
        {displayedUsers.map((user) => (
          <Grid.Col key={user.id} span={{ base: 12, md: 4, lg: 3 }}>
            <UserCard user={user} />
          </Grid.Col>
        ))}
      </Grid>

      <Group mt="xl" justify="center">
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={setActivePage}
        />
      </Group>
    </Container>
  );
};

export default ListPage;
