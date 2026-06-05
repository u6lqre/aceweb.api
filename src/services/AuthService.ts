import { User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

class AuthService {
  public getUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  public getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  public async createUser(username: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    await this.addUserToDB(username, hashedPassword);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public checkPassword(password: string, user: User) {
    return bcrypt.compare(password, user.password);
  }

  private async addUserToDB(username: string, password: string): Promise<void> {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }

  public generateToken(userId: number) {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
  }
}

export default new AuthService();
