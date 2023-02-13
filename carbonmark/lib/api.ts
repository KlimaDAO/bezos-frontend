import {
  Category,
  CategoryName,
  CategoryNames,
  Country,
  Project,
  User,
} from "@klimadao/lib/types/carbonmark";

export const loginUser = async (wallet: string): Promise<{ nonce: string }> => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.nonce) {
    throw new Error(data.message);
  }
  return data;
};

export const verifyUser = async (params: {
  address: string;
  signature: string;
}): Promise<{ token: string }> => {
  const res = await fetch("/api/users/login/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wallet: params.address,
      signature: params.signature,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.token) {
    throw new Error(data.message);
  }
  return data;
};

export const putUser = async (params: {
  user: User;
  token: string;
}): Promise<User> => {
  const res = await fetch(`/api/users/${params.user.wallet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const postUser = async (params: {
  user: User;
  token: string;
}): Promise<User> => {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.user),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getUser = async (params: {
  user: string;
  type: "wallet" | "handle";
}): Promise<User> => {
  const result = await fetch(`/api/users/${params.user}?type=${params.type}`);

  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

type Params = {
  search?: string;
  country?: string;
  category?: CategoryName | CategoryNames;
};
export const getProjects = async (params?: Params): Promise<Project[]> => {
  const withQueries =
    !!params &&
    Object.keys(params)
      .map((q) => `${q}=${params[q as keyof Params]}`)
      .join("&");

  const url = withQueries ? `/api/projects?${withQueries}` : "/api/projects";

  const result = await fetch(url);
  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getCategories = async (): Promise<Category[]> => {
  const result = await fetch("/api/categories");
  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getCountries = async (): Promise<Country[]> => {
  const result = await fetch("/api/countries");
  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const getVintages = async (): Promise<string[]> => {
  const result = await fetch("/api/vintages");
  const data = await result.json();

  if (!result.ok || data.error) {
    throw new Error(data.message);
  }
  return data;
};
