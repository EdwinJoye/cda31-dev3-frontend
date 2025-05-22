import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import type { User } from "../models/User";

interface UseConfirmDeleteOptions {
  onConfirm: () => void;
  redirectAfterDelete?: () => void;
}

export const useConfirmDelete = ({
  onConfirm,
  redirectAfterDelete,
}: UseConfirmDeleteOptions) => {
  const confirmDelete = (user: User) => {
    modals.openConfirmModal({
      title: "Confirmer la suppression",
      children: (
        <Text size="sm">
          Êtes-vous sûr de vouloir supprimer l'utilisateur
          <strong>
            {user.firstname} {user.lastname}
          </strong>
          ? Cette action est irréversible.
        </Text>
      ),
      labels: { confirm: "Supprimer", cancel: "Annuler" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        onConfirm();
        redirectAfterDelete?.();
      },
    });
  };

  return { confirmDelete };
};
