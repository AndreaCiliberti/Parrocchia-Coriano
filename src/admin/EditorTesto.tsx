import React, { useRef } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Link as IconaLink, List } from 'lucide-react';
import { normalizzaLink } from './utilita';

interface EditorTestoProps {
  valore: string;
  onCambia: (html: string) => void;
}

export const EditorTesto: React.FC<EditorTestoProps> = ({ valore, onCambia }) => {
  // Tiptap registra onUpdate alla creazione: il ref evita di chiamare una callback vecchia.
  const ultimoOnCambia = useRef(onCambia);
  ultimoOnCambia.current = onCambia;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        italic: false,
        strike: false,
        underline: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        orderedList: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
    ],
    content: valore,
    editorProps: {
      attributes: { class: 'testo-avviso min-h-[8rem] px-4 py-3 text-[#324A6D] focus:outline-none' },
    },
    onUpdate: ({ editor: e }) => ultimoOnCambia.current(e.isEmpty ? '' : e.getHTML()),
  });

  const stato = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      grassetto: e?.isActive('bold') ?? false,
      link: e?.isActive('link') ?? false,
      elenco: e?.isActive('bulletList') ?? false,
    }),
  });

  if (!editor) return null;

  const modificaLink = () => {
    const attuale = editor.getAttributes('link').href as string | undefined;
    const risposta = window.prompt(
      'Indirizzo del link (sito, email o telefono). Lascia vuoto per togliere il link.',
      attuale ?? '',
    );
    if (risposta === null) return;
    if (!risposta.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    const href = normalizzaLink(risposta);
    if (editor.state.selection.empty && !editor.isActive('link')) {
      editor.chain().focus().insertContent({ type: 'text', text: risposta.trim(), marks: [{ type: 'link', attrs: { href } }] }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    }
  };

  const classeBottone = (attivo: boolean) =>
    `p-2 rounded-lg transition-colors ${attivo ? 'bg-[#467FF7] text-white' : 'text-[#1C244B] hover:bg-gray-100'}`;
  const nonPerdereFocus = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="rounded-xl border border-gray-200 focus-within:border-[#467FF7] bg-white">
      <div className="flex gap-1 border-b border-gray-100 p-1.5">
        <button type="button" title="Grassetto" aria-label="Grassetto" aria-pressed={stato?.grassetto}
          className={classeBottone(!!stato?.grassetto)} onMouseDown={nonPerdereFocus}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </button>
        <button type="button" title="Link" aria-label="Link" aria-pressed={stato?.link}
          className={classeBottone(!!stato?.link)} onMouseDown={nonPerdereFocus} onClick={modificaLink}>
          <IconaLink size={16} />
        </button>
        <button type="button" title="Elenco puntato" aria-label="Elenco puntato" aria-pressed={stato?.elenco}
          className={classeBottone(!!stato?.elenco)} onMouseDown={nonPerdereFocus}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
