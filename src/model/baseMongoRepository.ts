import { Collection, Document, Filter, ObjectId, WithId } from "mongodb";

import { dbConnection } from "./mongodb";

export default class BaseMongoRepository<T extends Document> {
  collectionName: string;
  /**
   * @param collectionName
   */
  constructor(collectionName: string) {
    if (!collectionName) {
      throw new Error("Required collection name not provided.");
    }
    this.collectionName = collectionName;
  }

  async getCollection(): Promise<Collection<T>> {
    const dbConn = await dbConnection();
    return dbConn.collection<T>(this.collectionName);
  }

  async findById(id: string | ObjectId): Promise<WithId<T> | null> {
    const collection: Collection<T> = await this.getCollection();
    const objectId: ObjectId = id instanceof ObjectId ? id : new ObjectId(id);
    return collection.findOne<WithId<T>>({
      _id: objectId,
    } as unknown as Filter<T>);
  }
}
