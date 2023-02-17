import { Project, Purchase, User } from "lib/types/carbonmark";

import { getURL } from "lib/networkAware/getURL";

export const getCarbonmarkProjects = async (): Promise<Project[]> => {
  try {
    const result = await fetch(`${getURL("carbonmarkApi")}/projects`);
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getCarbonmarkProjects", e);
    return Promise.reject(e);
  }
};

export const getCarbonmarkProject = async (
  projectId: string
): Promise<Project> => {
  try {
    const result = await fetch(
      `${getURL("carbonmarkApi")}/projects/${projectId}`
    );
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getCarbonmarkProject", e);
    return Promise.reject(e);
  }
};

export const getCarbonmarkUser = async (params: {
  user: string;
  type: "wallet" | "handle";
}): Promise<User> => {
  try {
    const result = await fetch(
      `${getURL("carbonmarkApi")}/users/${params.user}?type=${params.type}`
    );
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getCarbonmarkUser", e);
    return Promise.reject(e);
  }
};

export const getPurchase = async (params: {
  id: string;
}): Promise<Purchase | null> => {
  try {
    const result = await fetch(
      `${getURL("carbonmarkApi")}/purchases/${params.id}`
    );

    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getPurchase", e);
    return Promise.reject(e);
  }
};
