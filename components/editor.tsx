'use client';

import {
  BlockNoteEditor,
  PartialBlock
} from '@blocknote/core';

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useTheme } from 'next-themes';
import { useEdgeStore } from '@/lib/edgestore';
import { update } from '@/convex/documents';
import { useCallback } from 'react';
import { UploadFn } from './upload/uploader-provider';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = useCallback(async (file: File, blockId?: string) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url
  }, [edgestore]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload
  });

  const onEditorChange = (editor: BlockNoteEditor) => {
    onChange(JSON.stringify(editor.document, null, 2));
  }
  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={onEditorChange}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}

