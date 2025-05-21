import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  PasswordInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCheck, IconPhotoPlus, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Category } from "../models/Category";
import type { Gender } from "../models/Gender";
import type { User } from "../models/User";
import useUsersStore from "../stores/useUsersStore";

const genderOptions = [
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
  { value: "other", label: "Autre" },
];

const categoryOptions = [
  { value: "Marketing", label: "Marketing" },
  { value: "Client", label: "Client" },
  { value: "Technique", label: "Technique" },
];

const UserFormPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const { fetchUserById, users, setUsers } = useUsersStore();
  const [loading, setLoading] = useState(false);
  const [initialPhoto, setInitialPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm({
    initialValues: {
      gender: "male" as Gender,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      birthdate: null as Date | null,
      city: "",
      country: "",
      photo: null as File | null,
      category: "Client" as Category,
      isAdmin: false,
    },

    validate: {
      firstname: (value) => (value.length < 2 ? "Minimum 2 caractères" : null),
      lastname: (value) => (value.length < 2 ? "Minimum 2 caractères" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email invalide"),
      password: (value) =>
        userId ? null : value.length < 6 ? "Minimum 6 caractères" : null,
      phone: (value) =>
        value && value.length < 10 ? "Téléphone invalide" : null,
      birthdate: (value) =>
        value === null ? "Date de naissance requise" : null,
      city: (value) =>
        value && value.length < 2 ? "Minimum 2 caractères" : null,
      country: (value) =>
        value && value.length < 2 ? "Minimum 2 caractères" : null,
    },
  });

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserById(Number(userId)).then((user) => {
        setLoading(false);
        if (user) {
          form.setValues({
            gender: user.gender,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: "",
            phone: user.phone || "",
            birthdate: user.birthdate ? new Date(user.birthdate) : null,
            city: user.city || "",
            country: user.country || "",
            photo: null,
            category: user.category || "Client",
            isAdmin: user.isAdmin,
          });
          setInitialPhoto(user.photo);
        } else {
          navigate("/admin/users");
        }
      });
    }
  }, [userId, fetchUserById, form, navigate]);

  const handleSubmit = (values: typeof form.values) => {
    setLoading(true);

    const newUser: User = {
      id: userId ? Number(userId) : Math.floor(Math.random() * 1000000),
      gender: values.gender,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birthdate: values.birthdate
        ? values.birthdate.toISOString().split("T")[0]
        : null,
      city: values.city,
      country: values.country,
      photo: initialPhoto || null,
      category: values.category,
      isAdmin: values.isAdmin,
    };

    const updatedUsers: User[] = userId
      ? users.map((u) => (u.id === Number(userId) ? newUser : u))
      : [...users, newUser];

    setUsers(updatedUsers);
    setLoading(false);
    navigate("/admin/users");
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setFieldValue("photo", file);
      setInitialPhoto(null);
    }
  };

  return (
    <Container size="sm" py="xl" style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />
      <Title order={2} mb="md" className="text-center">
        {userId ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}
      </Title>

      <Stack className="flex-1 items-center !h-full">
        <Box className="relative">
          <Avatar
            src={
              form.values.photo
                ? URL.createObjectURL(form.values.photo)
                : initialPhoto || ""
            }
            size={180}
            style={{ cursor: "pointer" }}
            onClick={() => fileInputRef.current?.click()}
          />
          <ActionIcon
            variant="transparent"
            size="xl"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <IconPhotoPlus color="white" size={32} />
          </ActionIcon>
        </Box>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />
      </Stack>
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-[15px]"
      >
        <Select
          label="Genre"
          data={genderOptions}
          {...form.getInputProps("gender")}
          required
        />

        <Group grow>
          <TextInput
            label="Prénom"
            placeholder="Prénom"
            {...form.getInputProps("firstname")}
            required
          />
          <TextInput
            label="Nom"
            placeholder="Nom"
            {...form.getInputProps("lastname")}
            required
          />
        </Group>

        <TextInput
          label="Email"
          placeholder="exemple@mail.com"
          type="email"
          {...form.getInputProps("email")}
          required
        />

        {!userId && (
          <PasswordInput
            label="Mot de passe"
            placeholder="Minimum 6 caractères"
            {...form.getInputProps("password")}
            required
          />
        )}

        <TextInput
          label="Téléphone"
          placeholder="+33 6 12 34 56 78"
          {...form.getInputProps("phone")}
        />

        <Group grow>
          <TextInput
            label="Ville"
            placeholder="Ville"
            {...form.getInputProps("city")}
          />
          <TextInput
            label="Pays"
            placeholder="Pays"
            {...form.getInputProps("country")}
          />
        </Group>

        <Group justify="space-between" className="items-end">
          <Select
            className="flex-1"
            label="Catégorie"
            data={categoryOptions}
            {...form.getInputProps("category")}
            required
          />
          <Group className="flex-1 !h-full p-2">
            <Switch
              label="Administrateur"
              labelPosition="left"
              {...form.getInputProps("isAdmin", { type: "checkbox" })}
            />
          </Group>
        </Group>
        <Stack className="items-center gap-3 flex-1">
          <Text>Date d'anniversaire</Text>
          <DatePicker
            value={form.values.birthdate}
            onChange={(date) => {
              const parsedDate =
                typeof date === "string" ? new Date(date) : date;
              form.setFieldValue("birthdate", parsedDate);
            }}
          />
        </Stack>
        <Group mt="md" className="justify-center">
          <Button
            type="button"
            leftSection={<IconX size={18} />}
            color="gray"
            onClick={() => navigate("/admin/users")}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            leftSection={<IconCheck size={18} />}
            color="green"
          >
            {userId ? "Enregistrer" : "Créer"}
          </Button>
        </Group>
      </Box>
    </Container>
  );
};

export default UserFormPage;
