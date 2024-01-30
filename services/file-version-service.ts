import { PrismaClient, Version as PrismaVersion } from '@prisma/client';

const prisma = new PrismaClient();

export class FileVersionService {
  static async createVersion(fileId: string, content: string): Promise<PrismaVersion> {
    try {
      return await prisma.version.create({
        data: {
          file: { connect: { id: fileId } },
          content,
        },
      });
    } catch (error) {
      console.error('Error in createVersion: ', error);
      throw error;
    }
  }

  static async getVersionsByFileId(fileId: string): Promise<PrismaVersion[]> {
    try {
      return await prisma.version.findMany({
        where: { fileId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error in getVersionsByFileId: ', error);
      throw error;
    }
  }

  static async getVersionById(id: string): Promise<PrismaVersion | null> {
    try {
      return await prisma.version.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error in getVersionById: ', error);
      throw error;
    }
  }

  static async deleteVersionsByUserId(userId: string): Promise<number> {
    try {
      const result = await prisma.version.deleteMany({
        where: {
          file: { userId },
        },
      });

      return result.count;
    } catch (error) {
      console.error('Error in deleteVersionsByUserId: ', error);
      throw error;
    }
  }
}