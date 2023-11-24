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
import {Button} from "~/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/components/ui/toggle-group"

export type TipTapProps = {
  content: string;
  showButton?: boolean;
  buttonAction?: (content: string) => Promise<void>;
  onChange?: (content: string) => void;
}

const Tiptap = ({ content, showButton, buttonAction, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          `unreset p-4 pt-0 m-3 ml-0 ${showButton ? "min-h-[70px]" : "min-h-[150px]"}`,
      },
    },
    onCreate: () => {
      editor?.commands.setContent(JSON.parse(content))
    },
    onBlur: () => {
      const data = JSON.stringify(editor?.getJSON());
      onChange !== undefined && onChange(data ?? "");
    },
  });

  const buttonActionWrapper = () => {
    if(buttonAction !== undefined) {
      buttonAction(content);
      editor?.commands.clearContent();
    }
  }

  return (
    <div className="border border-zinc-900 dark:border-zinc-700 rounded-md mr-6 pr-0 shadow-sm">
      <div className="flex justify-between p-4 pb-2 border-b border-zinc-900 dark:border-zinc-700">
        <span className="text-xs rounded-sm bg-zinc-100 dark:bg-zinc-700 p-2 flex justify-center items-center">
          <MarkdownIcon className="mr-1" />
          Markdown Supported
        </span>
        <div className="flex justify-around w-6/12 mr-2">
          <ToggleGroup size="sm" type="multiple">
            <ToggleGroupItem value="Heading">
              <HeadingIcon className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="bold">
              <BoldIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic">
              <ItalicIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="quote">
              <QuoteIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="code">
              <CodeIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="link">
              <LinkIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="ol">
              <ListOrderedIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="ul">
              <ListUnorderedIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="flex items-center w-1/12">
          </div>
        </div>
      </div>
      <EditorContent editor={editor} />
      {showButton && <div className="flex justify-end pb-2 pr-4 mr-4 mb-2">
        <Button onClick={buttonActionWrapper} size="sm">Add Comment</Button>
      </div>}
    </div>
  );
};

export default Tiptap;
