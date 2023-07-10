import { ObjectId } from "mongodb";

export interface User {
  name: string;
  company: string;
}

export interface MongoUser extends User {
  _id?: ObjectId;
}
