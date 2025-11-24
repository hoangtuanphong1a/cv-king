import ImageAvatar from "@/assets/images/avatar.jpg";
import { User } from "@/types/user.type";

export const sampleUserData: User[] = [
  {
    id: "1",
    avatar: ImageAvatar,
    username: "jon_snow",
    firstName: "Jon",
    lastName: "Snow",
    email: "jon.snow@winterfell.com",
    age: "35",
  },
  {
    id: "2",
    avatar: ImageAvatar,
    username: "cersei_lannister",
    firstName: "Cersei",
    lastName: "Lannister",
    email: "cersei.lannister@kingslanding.com",
    age: "42",
  },
  {
    id: "3",
    avatar: ImageAvatar,
    username: "jaime_lannister",
    firstName: "Jaime",
    lastName: "Lannister",
    email: "jaime.lannister@kingslanding.com",
    age: "45",
  },
  {
    id: "4",
    avatar: ImageAvatar,
    username: "arya_stark",
    firstName: "Arya",
    lastName: "Stark",
    email: "arya.stark@winterfell.com",
    age: "16",
  },
  {
    id: "5",
    avatar: ImageAvatar,
    username: "daenerys_targaryen",
    firstName: "Daenerys",
    lastName: "Targaryen",
    email: "daenerys.targaryen@dragonstone.com",
    age: "",
  },
];