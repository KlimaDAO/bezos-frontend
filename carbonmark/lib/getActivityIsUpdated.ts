import { User } from "lib/types/carbonmark";

export const getActivityIsUpdated = (oldUser: User, newUser: User) => {
  const formerActivityLength = oldUser?.activities?.length || 0;
  const newActivityLength = newUser?.activities?.length || 0;
  return newActivityLength > formerActivityLength;
};
