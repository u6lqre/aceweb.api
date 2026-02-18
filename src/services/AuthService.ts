import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";

class AuthService {
  public async checkIfUserExists(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return Boolean(user);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async addUserToDB(username: string, password: string): Promise<void> {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }
}

export default new AuthService();
