import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema.js";
import { Model } from "mongoose";


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) { }

  async upsertAuthUser(input: { clerkUserId: string, name: string, email: string }) {
    const now = new Date();
    return this.userModel.findOneAndUpdate(
      {
        clerkUserId: input.clerkUserId
      },
      {
        $set: { // This will update the fields if the document already exists
          email: input.email,
          name: input.name,
          lastSeenAt: now
        },
        $setOnInsert: { // This will set the fields only if a new document is created
          role: 'user'
        }
      },
      {
        new: true, // This will return the updated document rather than the original
        upsert: true, // This will create a new document if no document matches the filter
        setDefaultsOnInsert: true // This will apply the default values specified in the schema when creating a new document
      }
    );
  }

  async findByClerkUserId(clerkUserId: string) {
    return this.userModel.findOne({});
  }
}