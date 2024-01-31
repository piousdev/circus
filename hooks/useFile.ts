"use client";
import { showToast } from "@/utils/getToast";
import { Prisma, File as PrismaFile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FileData {
  id?: string;
  name: string;
  description: string;
  content: string;
  language: string;
  starred: boolean;
}

export interface DatabaseError {
  type: "database";
  code: number;
  statusText: string;
}

export interface NetworkError {
  type: "http";
  statusText: string;
  status: string; // http status code
  code?: number; // prisma db error code
}

/**
 * Custom hook for file operations.
 * @returns An object containing the `saveFile` function and `isLoading` state.
 */
const useFile = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const saveFile = async (
    fileData: FileData,
    onSuccess: (file: PrismaFile) => void,
    onError: (error: DatabaseError | NetworkError) => void
  ) => {
    setIsLoading(true);
    try {
      let file;
      if (fileData.id) {
        console.log("Updating file:", fileData.id);
        file = await axios.put<PrismaFile>(
          `/api/files/${fileData.id}`,
          fileData
        );
      } else {
        console.log("Creating new file");
        file = await axios.post<PrismaFile>("/api/files", fileData);
      }

      showToast({ message: "File saved successfully" });
      onSuccess(file.data); // .data is the axios response
      router.refresh();
      router.push("/hub");
    } catch (error: any) {
      let errorData: DatabaseError | NetworkError;

      if (error.response) {
        errorData = {
          type: "http",
          statusText:
            error.response?.data?.statusText ||
            "[ERROR_AXIOS_API] An error occurred during the HTTP request",
          status: error.response?.data?.status || "500",
        };
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        errorData = {
          type: "database",
          code: 500,
          statusText: "[ERROR_PRISMA_API] An error occurred during the database request",
        };
      } else {
        errorData = {
          type: "http",
          statusText: "[GENERIC_ERROR] An error occurred during the HTTP request",
          status: "500",
        };
      }

      console.log("Error:", errorData);
      showToast({ message: errorData.statusText });
      onError(errorData);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveFile, isLoading };
};

export default useFile;
