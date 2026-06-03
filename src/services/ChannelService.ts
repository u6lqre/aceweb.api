import { Channel, Provider } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

class ChannelService {
  public async findByUserIdAndLink(
    userId: number,
    link: string,
  ): Promise<Channel | null> {
    return prisma.channel.findFirst({
      where: { userId, link },
    });
  }

  public async create(data: {
    name: string;
    link: string;
    provider: Provider;
    userId: number;
  }) {
    return prisma.channel.create({
      data,
    });
  }
}

export default new ChannelService();
