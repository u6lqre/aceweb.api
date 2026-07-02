import { Channel, Provider } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

class ChannelService {
  public findByUserIdAndInfohash(
    userId: number,
    infohash: string,
  ): Promise<Channel | null> {
    return prisma.channel.findFirst({
      where: { userId, infohash },
    });
  }

  public create(data: {
    name: string;
    infohash: string;
    provider: Provider;
    userId: number;
  }) {
    return prisma.channel.create({
      data,
    });
  }

  public findChannelsByUserId(userId: number) {
    return prisma.channel.findMany({ where: { userId } });
  }
}

export default new ChannelService();
