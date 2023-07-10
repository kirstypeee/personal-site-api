import { MongoUser, User } from "../typedef/user";

import BaseMongoRepository from "./baseMongoRepository";

const COLLECTION_NAME = "user";

class UserRepository extends BaseMongoRepository<MongoUser> {
  constructor() {
    super(COLLECTION_NAME);
  }

  async createUser(user: User): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(user);
  }
}

export default new UserRepository();
