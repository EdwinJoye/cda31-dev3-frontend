import {
  Anchor,
  Button,
  Center,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur de connexion");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        ta="center"
        style={{
          fontFamily: "Greycliff CF, sans-serif",
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        Connexion
      </Title>

      <Text size="sm" ta="center" mt={5} mb={30}>
        Connectez-vous à votre compte pour continuer
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "L'email est requis",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Format d'email invalide",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Email"
                placeholder="votre.email@example.com"
                required
                size="md"
                radius="md"
                error={errors.email?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Le mot de passe est requis" }}
            render={({ field }) => (
              <PasswordInput
                label="Mot de passe"
                placeholder="Votre mot de passe"
                required
                size="md"
                radius="md"
                error={errors.password?.message}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            size="md"
            radius="md"
            loading={isSubmitting}
            styles={(theme) => ({
              root: {
                backgroundColor: theme.colors.blue[6],
                "&:hover": {
                  backgroundColor: theme.colors.blue[7],
                },
              },
            })}
          >
            Se connecter
          </Button>
        </Stack>
      </Paper>

      <Center mt="xl">
        <Text size="sm" color="dimmed">
          Pas encore de compte ?{" "}
          <Anchor href="#" size="sm" style={{ cursor: "pointer" }}>
            Créez-en un ici
          </Anchor>
        </Text>
      </Center>
    </Container>
  );
}
