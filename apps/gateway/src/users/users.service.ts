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
        $set: {
          email: input.email,
          name: input.name,
          lastSeenAt: now
        },
        $setOnInsert: {
          role: 'user'
        }
      }
    );
  }
}