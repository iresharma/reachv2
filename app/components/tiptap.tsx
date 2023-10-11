import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MarkdownIcon,
  HeadingIcon,
  BoldIcon,
  ItalicIcon,
  QuoteIcon,
  CodeIcon,
  LinkIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
} from "@primer/octicons-react";

const Tiptap = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "unreset min-h-[150px] dark:bg-zinc-900 bg-zinc-200 p-4 pt-0 m-3 ml-0",
      },
    },
    content: content,
  });

  return (
    <div className="dark:bg-zinc-900 bg-zinc-200 rounded-md mr-6 pr-0">
      <div className="flex justify-between p-4 pb-2 border-b border-zinc-900 dark:border-zinc-700">
        <span className="text-sm">
          <MarkdownIcon className="mr-1" />
          Markdown Supported
        </span>
        <div className="flex justify-around w-4/12">
          <div className="flex items-center w-1/12">
            <HeadingIcon className="mr-1 dark:text-muted-foreground text-zinc-600" />
            <BoldIcon className="mr-1 dark:text-muted-foreground text-zinc-600" />
            <ItalicIcon className="dark:text-muted-foreground text-zinc-600" />
          </div>
          <div className="flex items-center w-1/12">
            <QuoteIcon className="mr-1 dark:text-muted-foreground text-zinc-600" />
            <CodeIcon className="mr-1 dark:text-muted-foreground text-zinc-600" />
            <LinkIcon className="dark:text-muted-foreground text-zinc-600" />
          </div>
          <div className="flex items-center w-1/12">
            <ListOrderedIcon className="mr-1 dark:text-muted-foreground text-zinc-600" />
            <ListUnorderedIcon className="dark:text-muted-foreground text-zinc-600" />
          </div>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
