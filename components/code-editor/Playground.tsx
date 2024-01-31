"use client";
import Editor from "@/components/code-editor/Editor";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/use-theme";
import useFile from "@/hooks/useFile";
import { File as fileContent } from "@prisma/client";
import { Save, Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface PlaygroundProps {
  displayName: string;
  initialData: fileContent | null;
  collections: any;
}

let documentCount = 0;

const Playground = ({ displayName, initialData }: PlaygroundProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [cssContent, setCssContent] = useState<string>("");
  const [jsContent, setJsContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    documentCount += 1;
  }, []);

  const documentTitle = `${
    title || displayName || "Untitled"
  } - ${documentCount}`;
  const { theme } = useTheme();

  const getIframeSrcDoc = () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${documentTitle}</title>
            <style>${cssContent}</style>
        </head>
        <body class='iframeBody'>
            ${htmlContent}
            <script>
              ${jsContent}
            </script>
        </body>
        </html>
      `;
  };

  const { saveFile: saveFileHook, isLoading } = useFile();

  const saveFile = async () => {
    const fileContent = getIframeSrcDoc().trim();
    const fileData = {
      id: initialData?.id,
      name: documentTitle,
      description: description,
      content: fileContent,
      language: cssContent && htmlContent && jsContent ? "html/css/js" : "",
      starred: (File as unknown as { starred: boolean }).starred || false,
    };

    console.log("Saving file with body:", fileData);

    try {
      const savedFile = await saveFileHook(
        fileData,
        (file) => file,
        (error) => error
      );

      console.log(`Saved File: ${savedFile}`);
    } catch (error) {
      console.log(`Error saving file: ${error}`);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-8 py-4 bg-background">
        <div className="flex flex-row gap-2">
          <Input
            className=""
            value={title}
            onChange={handleTitleChange}
            placeholder="Choose a title..."
          />
          <Input
            className="text-sm text-foreground"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe you game..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button className="flex space-x-2" size="default" variant="outline">
            <span className="text-md">Star</span>
            <Star className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Trash2 className="text-forground h-4 w-4" />
          </Button>
          <Button
            onClick={saveFile}
            className="flex space-x-2"
            size="default"
            variant="outline"
          >
            <span className="text-md">Save</span>
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ResizablePanelGroup direction="vertical" className="px-8">
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30}>
              <Editor
                language="html"
                theme={theme || ""}
                onChange={setHtmlContent}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <Editor
                language="css"
                theme={theme || ""}
                onChange={setCssContent}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <Editor
                language="javascript"
                theme={theme || ""}
                onChange={setJsContent}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="iframe">
            <iframe
              className="bg-background text-forground"
              title="output"
              sandbox="allow-scripts"
              srcDoc={getIframeSrcDoc()}
              style={{
                border: "none",
              }}
              width="100%"
              height="100%"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Playground;
