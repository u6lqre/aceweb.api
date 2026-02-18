import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { User } from "generated/prisma/client";

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
    return bcrypt.hash(password, 10);
  }

  private async addUserToDB(username: string, password: string): Promise<void> {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }
}

export default new AuthService();
