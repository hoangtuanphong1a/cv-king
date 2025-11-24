import { StaticImageData } from "next/image";

export type User = {
  id: string;
  avatar: string | StaticImageData;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
};
