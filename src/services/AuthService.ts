import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import "dotenv/config";
import { User } from "generated/prisma/client";
import jwt from "jsonwebtoken";

class AuthService {
  public async getUserBy(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  public async createUser(username: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    await this.addUserToDB(username, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async checkPassword(password: string, user: User) {
    return await bcrypt.compare(password, user.password);
  }

  private async addUserToDB(username: string, password: string): Promise<void> {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }

  public async generateToken(userId: number) {
    return jwt.sign({ userId }, `${process.env.JWT_SECRET}`, {
      expiresIn: "7d",
    });
  }
}

export default new AuthService();
