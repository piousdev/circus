import { Prisma, PrismaClient, File as PrismaFile } from '@prisma/client';

const prisma = new PrismaClient();

export class FileService {
  static async createFile(userId: string, name: string, description: string, content: string, language: string): Promise<PrismaFile> {
    try {
      return await prisma.file.create({
        data: {
          user: { connect: { id: userId } },
          name,
          description,
          content,
          language,
        },
      });
    } catch (error) {
      console.error('Error in createFile: ', error);
      throw error;
    }
  }

  static async getFilesByUserId(userId: string): Promise<PrismaFile[]> {
    try {
      return await prisma.file.findMany({
        where: { userId },
      });
    } catch (error) {
      console.error('Error in getFilesByUserId: ', error);
      throw error;
    }
  }

  static async getFileById(id: string): Promise<PrismaFile | null> {
    try {
      return await prisma.file.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error in getFileById: ', error);
      throw error;
    }
  }

  static async updateFileById(id: string, name: string, description: string, content: string, language: string): Promise<PrismaFile> {
    try {
      return await prisma.file.update({
        where: { id },
        data: { name, description, content, language },
      });
    } catch (error) {
      console.error('Error in updateFileById: ', error);
      throw error;
    }
  }

  static async deleteFileById(id: string): Promise<PrismaFile> {
    try {
      return await prisma.file.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in deleteFileById: ', error);
      throw error;
    }
  }

  static async deleteFilesByUserId(userId: string): Promise<Prisma.BatchPayload> {
    try {
      return await prisma.file.deleteMany({
        where: { userId },
      });
    } catch (error) {
      console.error('Error in deleteFilesByUserId: ', error);
      throw error;
    }
  }
}
