"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  Heading4 as Heading4Icon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  AlignJustify as AlignJustifyIcon,
  List as BulletListIcon,
  ListOrdered as OrderedListIcon,
  Link as LinkIcon,
  Link2Off as UnlinkIcon,
} from "lucide-react";

import { useEditorActives } from "@/hoks/useEditorFormatting";
import "./styles.scss";

export default function BlogPostEditor() {
  // States
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  // TipTap Editor Configuration
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Underline,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: "<p>Write your amazing story here...</p>",
    immediatelyRender: false,
  });

  // Track active formatting states
  const actives = useEditorActives(editor, [
    "bold",
    "italic",
    "underline",
    "bulletList",
    "orderedList",
  ]);

  // Save Handler (console only for now)
  const handleSave = () => {
    const json = editor?.getJSON();
    const html = editor?.getHTML();

    const payload = {
      title,
      content_html: html,
      content_json: json,
    };

    console.log("📦 Blog Post Payload:", payload);
    // TODO: Replace with API call
  };

  if (!editor) return null;

  // === Toolbar Button Groups ===

  // Heading Buttons
  const headingItems = [
    {
      name: "heading2",
      icon: Heading2Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      name: "heading3",
      icon: Heading3Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      name: "heading4",
      icon: Heading4Icon,
      command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
    },
  ];

  // Alignment Buttons
  const alignmentItems = [
    {
      name: "left",
      icon: AlignLeftIcon,
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      name: "center",
      icon: AlignCenterIcon,
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      name: "right",
      icon: AlignRightIcon,
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      name: "justify",
      icon: AlignJustifyIcon,
      command: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
    },
  ];

  // List Buttons
  const listItems = [
    {
      name: "bulletList",
      icon: BulletListIcon,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      name: "orderedList",
      icon: OrderedListIcon,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
  ];

  // Mark (formatting) Buttons
  const markItems = [
    {
      name: "bold",
      icon: BoldIcon,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: actives["bold"],
    },
    {
      name: "italic",
      icon: ItalicIcon,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: actives["italic"],
    },
    {
      name: "underline",
      icon: UnderlineIcon,
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: actives["underline"],
    },
  ];

  return (
    <div className="w-full h-full p-6 space-y-6 shadow rounded-xl flex flex-col bg-white text-black">
      {/* === Title Input === */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Post Title"
        className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-black placeholder-gray-500"
      />

      {/* === Toolbar Buttons === */}
      <div className="flex flex-wrap items-center gap-2">
        {[...headingItems, ...markItems, ...alignmentItems, ...listItems].map(
          ({ name, icon: Icon, command, isActive }) => (
            <button
              key={name}
              type="button"
              onClick={command}
              className={`p-2 rounded transition ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
              aria-label={name}
            >
              <Icon className="w-5 h-5" />
            </button>
          )
        )}

        {/* === Link / Unlink Toggle Button === */}
        <button
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setShowLinkInput(true);
            }
          }}
          className={`p-2 rounded transition ${
            editor.isActive("link")
              ? "bg-gray-800 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
          aria-label="toggle-link"
        >
          {editor.isActive("link") ? (
            <UnlinkIcon className="w-5 h-5" />
          ) : (
            <LinkIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* === Link Input Prompt === */}
      {showLinkInput && (
        <div className="flex gap-2 items-center mb-2">
          <input
            type="url"
            placeholder="Paste link here"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
          <button
            onClick={() => {
              if (linkUrl) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: linkUrl })
                  .run();
              }
              setLinkUrl("");
              setShowLinkInput(false);
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Add
          </button>
          <button
            onClick={() => {
              setLinkUrl("");
              setShowLinkInput(false);
            }}
            className="px-2 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      )}

      {/* === Editor Content === */}
      <div
        className="w-full h-full border border-gray-400 rounded-lg overflow-y-auto overflow-x-hidden focus-within:ring-2 custom-scroll bg-white text-black"
        onClick={(e) => {
          if (e.target === e.currentTarget && editor) {
            editor.commands.focus("end");
          }
        }}
      >
        <EditorContent
          editor={editor}
          className="tiptap px-2 py-3 focus:outline-none text-black"
        />
      </div>

      {/* === Permalink + Save Button === */}
      <div className="flex gap-2">
        <input
          id="permalink"
          type="text"
          // value={permalink}
          // onChange={(e) => setPermalink(slugify(e.target.value))}
          placeholder="Permalink (Slug)"
          className="w-full p-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white text-black placeholder-gray-500"
        />
        <button
          onClick={handleSave}
          className="self-start px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition text-nowrap h-full"
        >
          Save Post
        </button>
      </div>
    </div>
  );
}
