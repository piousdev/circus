'use client';
import { ToastError, ToastSuccess } from "@/utils/toastUtils";
import { Prisma, File as PrismaFile } from '@prisma/client';
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

interface DatabaseError {
    type: 'database';
    code: number;
    statusText: string;
}

interface NetworkError {
    type: 'http';
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
        onSuccess: (file: PrismaFile) => PrismaFile,
        onError: (error: DatabaseError | NetworkError) => DatabaseError | NetworkError
    ) => {
        setIsLoading(true);
        try {
            let file
            if (fileData.id) {
                file = await axios.put<PrismaFile>(`/api/file/${fileData.id}`, fileData);
            } else {
                file = await axios.post<PrismaFile>('/api/file', fileData);
            }

            ToastSuccess({ message: 'File saved successfully' });
            onSuccess(file.data); // .data is the axios response
            router.refresh();
            router.push('/hub');
        } catch (error: any) {
            let errorData: DatabaseError | NetworkError;

            if (error.response) {
                errorData = {
                    type: 'http',
                    statusText: error.response?.data?.statusText || 'An error occurred during the HTTP request',
                    status: error.response?.data?.status || '500',
                };
            } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
                errorData = {
                    type: 'database',
                    code: 500,
                    statusText: 'An error occurred during the database request',
                };
            } else {
                errorData = {
                    type: 'http',
                    statusText: 'An error occurred during the HTTP request',
                    status: '500',
                };
            }

            ToastError({ message: errorData.statusText });
            onError(errorData);
        } finally {
            setIsLoading(false);
        }
    }

    return { saveFile, isLoading };
}

export default useFile;