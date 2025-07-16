import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

export function useEditorActives(editor: Editor | null, formats: string[]) {
  const [actives, setActives] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const states = Object.fromEntries(
        formats.map((format) => [format, editor.isActive(format)])
      );
      setActives(states);
    };

    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    editor.on("blur", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
      editor.off("blur", update);
    };
  }, [editor, formats.join(",")]);

  return actives;
}
