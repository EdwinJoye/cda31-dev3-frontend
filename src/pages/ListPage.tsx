import { useState, useEffect } from "react";
import { Grid, Container, Title, Pagination, Group } from "@mantine/core";
import { UserCard } from "../components/UserCard";
import useUsersStore from "../stores/useUsersStore";

const ListPage = () => {
  const { collaborators, fetchAllCollaborators } = useUsersStore();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchAllCollaborators();
  }, [fetchAllCollaborators]);

  const totalPages = Math.ceil(collaborators.length / itemsPerPage);
  const displayedUsers = collaborators.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container size="xl" py="xl">
      <Title mb="lg">Liste des utilisateurs</Title>

      <Grid gutter="lg">
        {displayedUsers.map((user) => (
          <Grid.Col key={user.id} span={{ base: 12, md: 4, lg: 3 }}>
            <UserCard user={collaborators} />
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
