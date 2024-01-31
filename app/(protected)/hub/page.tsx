import Playground from "@/components/code-editor/Playground";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface HubPageProps {
  params: {
    fileId: string;
  };
}

const HubPage = async ({ params }: HubPageProps) => {
  const { user } = auth();

  if (!user) {
    redirectToSignIn();
  }

  // First, check if fileId is defined
  if (!params.fileId) {
    console.error("File ID is undefined");
    // Handle the error appropriately
    return; // Or redirect, or show an error message
  }

  const file = await db.file.findUnique({
    where: {
      id: params.fileId,
    },
  });

  // Validate if the file belongs to the logged-in user
  if (file && file.userId !== user?.id) {
    console.error("File does not belong to the current user");
    // Handle this situation appropriately
    return; // Or redirect, or show an error message
  }

  const collections = await db.collection.findMany();

  return (
    <>
      <Playground
        initialData={file}
        collections={collections}
        displayName={file?.name || ""}
      />
    </>
  );
};

export default HubPage;
