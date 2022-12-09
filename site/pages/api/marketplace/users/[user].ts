import { NextApiHandler } from "next";
import { marketplace } from "@klimadao/lib/constants";
import { User } from "@klimadao/lib/types/marketplace";

export interface APIDefaultResponse {
  message: string;
}

const singleUser: NextApiHandler<User | APIDefaultResponse> = async (
  req,
  res
) => {
  switch (req.method) {
    case "GET":
      try {
        const { type, user } = req.query;

        if (!type || !user) {
          return res
            .status(400)
            .json({ message: "Not found! Queries are not correct" });
        }

        const result = await fetch(`${marketplace.users}/${user}?type=${type}`);

        const json = await result.json();

        return res.status(200).json(json);
      } catch ({ message }) {
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "PUT":
      try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
          return res.status(400).json({ message: "Bad request" });
        }

        if (!req.body.handle && !req.body.wallet) {
          return res
            .status(400)
            .json({ message: "Bad request! Handle or Wallet is missing" });
        }

        const result = await fetch(`${marketplace.users}/${req.body.wallet}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(req.body),
        });

        const json = await result.json();

        return res.status(200).json(json);
      } catch ({ message }) {
        console.error("Request failed:", message);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default singleUser;