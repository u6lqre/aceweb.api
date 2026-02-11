import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";

class AuthService {
  public async checkIfUserExists(name: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    return Boolean(user);
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async addUserToDB(name: string, password: string): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        password,
      },
    });
  }
}

export default new AuthService();
