import { Contributions, MongoContributions } from "src/typedef/contributions";

import BaseMongoRepository from "./baseMongoRepository";
import { WithId } from "mongodb";

const COLLECTION_NAME = "githubContributions";

class ContributionsRepository extends BaseMongoRepository<MongoContributions> {
  constructor() {
    super(COLLECTION_NAME);
  }
    
  async getContributions(): Promise<WithId<MongoContributions> | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ "key": "kirsty" });
  }

  async updateContributions(contributions: Contributions): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne({ "key": "kirsty" }, { $set: {user: contributions.user} }, {upsert: true});
  }
}

export default new ContributionsRepository();
