"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Placeholder from "@tiptap/extension-placeholder";
import FontFamily from "@tiptap/extension-font-family";
import {
  CodeBracketIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  DocumentPlusIcon,
  FolderOpenIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  TableCellsIcon,
  PhotoIcon,
  LinkIcon,
  ListBulletIcon,
  PaintBrushIcon,
  PrinterIcon,
  MagnifyingGlassIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import * as beautify from "js-beautify";

/* ══════════════════════════════════════════════════════════════════════════
   TEMPLATES
   ══════════════════════════════════════════════════════════════════════════ */

const templates: Record<string, { name: string; icon: string; html: string }> = {
  blank: {
    name: "Blank Document",
    icon: "\u{1F4C4}",
    html: "<h1>Untitled Document</h1><p>Start typing here\u2026</p>",
  },
  letter: {
    name: "Business Letter",
    icon: "\u2709\uFE0F",
    html: '<p style="text-align:right"><strong>Your Company Name</strong><br>123 Business St<br>City, State 12345<br>' +
      new Date().toLocaleDateString() +
      "</p><br><p>Dear Recipient,</p><p>I am writing to you regarding\u2026</p><p>Thank you for your time and consideration.</p><br><p>Sincerely,<br><strong>Your Name</strong><br>Title</p>",
  },
  newsletter: {
    name: "Email Newsletter",
    icon: "\u{1F4F0}",
    html: '<div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" style="background:#FF6C37;border-radius:8px 8px 0 0"><tr><td style="padding:24px 32px;text-align:center;color:white"><h1 style="margin:0;font-size:28px">\u{1F4F0} Weekly Newsletter</h1><p style="margin:8px 0 0;opacity:0.9">Your weekly dose of updates</p></td></tr></table><div style="padding:32px;background:white;border:1px solid #e5e7eb"><h2 style="color:#1a1a2e;margin:0 0 12px">Featured Story</h2><p style="color:#555;line-height:1.6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><a href="#" style="display:inline-block;padding:10px 24px;background:#FF6C37;color:white;text-decoration:none;border-radius:6px;font-weight:bold;margin:16px 0">Read More \u2192</a><hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"><h2 style="color:#1a1a2e;margin:0 0 12px">Quick Updates</h2><ul style="color:#555;line-height:1.8;padding-left:20px"><li>Update one goes here</li><li>Update two goes here</li><li>Update three goes here</li></ul></div></div>',
  },
  report: {
    name: "Simple Report",
    icon: "\u{1F4CA}",
    html: '<h1>Quarterly Report \u2014 Q1 2026</h1><p><em>Prepared by: Your Name \u00B7 Date: ' +
      new Date().toLocaleDateString() +
      '</em></p><hr><h2>Executive Summary</h2><p>This report covers the key performance indicators and milestones achieved during Q1 2026.</p><h2>Key Metrics</h2><table style="width:100%;border-collapse:collapse"><thead><tr style="background:#f3f4f6"><th style="border:1px solid #d1d5db;padding:10px;text-align:left">Metric</th><th style="border:1px solid #d1d5db;padding:10px;text-align:left">Target</th><th style="border:1px solid #d1d5db;padding:10px;text-align:left">Actual</th><th style="border:1px solid #d1d5db;padding:10px;text-align:left">Status</th></tr></thead><tbody><tr><td style="border:1px solid #d1d5db;padding:10px">Revenue</td><td style="border:1px solid #d1d5db;padding:10px">$100K</td><td style="border:1px solid #d1d5db;padding:10px">$112K</td><td style="border:1px solid #d1d5db;padding:10px">\u2705 Achieved</td></tr><tr><td style="border:1px solid #d1d5db;padding:10px">Users</td><td style="border:1px solid #d1d5db;padding:10px">5,000</td><td style="border:1px solid #d1d5db;padding:10px">4,800</td><td style="border:1px solid #d1d5db;padding:10px">\u26A0\uFE0F Close</td></tr></tbody></table><h2>Conclusion</h2><p>Overall, Q1 has been a strong quarter with most targets met or exceeded.</p>',
  },
  landing: {
    name: "Landing Page",
    icon: "\u{1F680}",
    html: '<div style="text-align:center;padding:60px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border-radius:12px;margin-bottom:32px"><h1 style="font-size:42px;margin:0 0 12px">Build Something Amazing</h1><p style="font-size:18px;opacity:0.9;max-width:500px;margin:0 auto 24px">A beautiful page template to kickstart your next project.</p><a href="#" style="display:inline-block;padding:12px 32px;background:white;color:#764ba2;font-weight:bold;border-radius:999px;text-decoration:none;font-size:16px">Get Started \u2192</a></div><div style="display:flex;gap:24px;flex-wrap:wrap"><div style="flex:1;min-width:200px;padding:24px;background:#f8f9fa;border-radius:12px;text-align:center"><div style="font-size:32px;margin-bottom:8px">\u26A1</div><h3>Lightning Fast</h3><p style="color:#666">Optimized for speed out of the box.</p></div><div style="flex:1;min-width:200px;padding:24px;background:#f8f9fa;border-radius:12px;text-align:center"><div style="font-size:32px;margin-bottom:8px">\u{1F3A8}</div><h3>Beautiful Design</h3><p style="color:#666">Clean, modern aesthetics.</p></div><div style="flex:1;min-width:200px;padding:24px;background:#f8f9fa;border-radius:12px;text-align:center"><div style="font-size:32px;margin-bottom:8px">\u{1F4F1}</div><h3>Fully Responsive</h3><p style="color:#666">Looks perfect on every device.</p></div></div>',
  },
  embed: {
    name: "Embeddable Widget",
    icon: "\u{1F9E9}",
    html: '<div style="max-width:400px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.08)"><div style="padding:20px;background:#fff"><div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div style="width:48px;height:48px;border-radius:50%;background:#FF6C37;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;font-weight:bold">JD</div><div><strong style="display:block">Jane Doe</strong><span style="color:#888;font-size:13px">Product Designer</span></div></div><p style="color:#333;line-height:1.6;margin:0 0 16px">\u201CThis tool has completely transformed our workflow. Highly recommend it to any team!\u201D</p><div style="display:flex;gap:4px;color:#FF6C37;font-size:18px">\u2605\u2605\u2605\u2605\u2605</div></div><div style="padding:12px 20px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center"><a href="#" style="color:#FF6C37;text-decoration:none;font-weight:600;font-size:14px">View all reviews \u2192</a></div></div>',
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   COLOR PRESETS
   ══════════════════════════════════════════════════════════════════════════ */

const colorPresets = [
  "#000000","#434343","#666666","#999999","#b7b7b7","#cccccc","#d9d9d9","#efefef","#f3f3f3","#ffffff",
  "#980000","#ff0000","#ff9900","#ffff00","#00ff00","#00ffff","#4a86e8","#0000ff","#9900ff","#ff00ff",
  "#e6b8af","#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#c9daf8","#cfe2f3","#d9d2e9","#ead1dc",
  "#dd7e6b","#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#a4c2f4","#9fc5e8","#b4a7d6","#d5a6bd",
  "#cc4125","#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6d9eeb","#6fa8dc","#8e7cc3","#c27ba0",
  "#a61c00","#cc0000","#e69138","#f1c232","#6aa84f","#45818e","#3c78d8","#3d85c6","#674ea7","#a64d79",
  "#85200c","#990000","#b45f06","#bf9000","#38761d","#134f5c","#1155cc","#0b5394","#351c75","#741b47",
  "#5b0f00","#660000","#783f04","#7f6000","#274e13","#0c343d","#1c4587","#073763","#20124d","#4c1130",
];

/* ══════════════════════════════════════════════════════════════════════════
   HTML ELEMENTS & CSS VARIABLES REFERENCE
   ══════════════════════════════════════════════════════════════════════════ */

const htmlReference = [
  { category: "Structure", items: [
    { tag: "&lt;!DOCTYPE html&gt;", code: "<!DOCTYPE html>", desc: "Document type declaration" },
    { tag: "&lt;html&gt;", code: '<html lang="en">\n\n</html>', desc: "Root element" },
    { tag: "&lt;head&gt;", code: "<head>\n  \n</head>", desc: "Document metadata container" },
    { tag: "&lt;body&gt;", code: "<body>\n  \n</body>", desc: "Document body" },
    { tag: "&lt;meta&gt;", code: '<meta charset="UTF-8">', desc: "Metadata element" },
    { tag: "&lt;link&gt;", code: '<link rel="stylesheet" href="">', desc: "External resource link" },
    { tag: "&lt;script&gt;", code: "<script>\n  \n</script>", desc: "Executable script" },
    { tag: "&lt;style&gt;", code: "<style>\n  \n</style>", desc: "Embedded CSS" },
  ]},
  { category: "Headings", items: [
    { tag: "&lt;h1&gt;", code: "<h1></h1>", desc: "Main heading" },
    { tag: "&lt;h2&gt;", code: "<h2></h2>", desc: "Section heading" },
    { tag: "&lt;h3&gt;", code: "<h3></h3>", desc: "Sub-section heading" },
    { tag: "&lt;h4&gt;", code: "<h4></h4>", desc: "Level 4 heading" },
    { tag: "&lt;h5&gt;", code: "<h5></h5>", desc: "Level 5 heading" },
    { tag: "&lt;h6&gt;", code: "<h6></h6>", desc: "Level 6 heading" },
  ]},
  { category: "Text", items: [
    { tag: "&lt;p&gt;", code: "<p></p>", desc: "Paragraph" },
    { tag: "&lt;span&gt;", code: "<span></span>", desc: "Inline container" },
    { tag: "&lt;strong&gt;", code: "<strong></strong>", desc: "Bold / important" },
    { tag: "&lt;em&gt;", code: "<em></em>", desc: "Italic / emphasis" },
    { tag: "&lt;u&gt;", code: "<u></u>", desc: "Underline" },
    { tag: "&lt;br&gt;", code: "<br>", desc: "Line break" },
    { tag: "&lt;hr&gt;", code: "<hr>", desc: "Horizontal rule" },
    { tag: "&lt;blockquote&gt;", code: "<blockquote>\n  \n</blockquote>", desc: "Block quotation" },
    { tag: "&lt;pre&gt;", code: "<pre></pre>", desc: "Preformatted text" },
    { tag: "&lt;code&gt;", code: "<code></code>", desc: "Inline code" },
  ]},
  { category: "Links & Media", items: [
    { tag: "&lt;a&gt;", code: '<a href="" target="_blank"></a>', desc: "Hyperlink" },
    { tag: "&lt;img&gt;", code: '<img src="" alt="" width="" height="">', desc: "Image" },
    { tag: "&lt;video&gt;", code: '<video src="" controls width=""></video>', desc: "Video player" },
    { tag: "&lt;iframe&gt;", code: '<iframe src="" width="100%" height="400" frameborder="0"></iframe>', desc: "Embedded frame" },
  ]},
  { category: "Lists", items: [
    { tag: "&lt;ul&gt;", code: "<ul>\n  <li></li>\n  <li></li>\n</ul>", desc: "Unordered list" },
    { tag: "&lt;ol&gt;", code: "<ol>\n  <li></li>\n  <li></li>\n</ol>", desc: "Ordered list" },
    { tag: "&lt;li&gt;", code: "<li></li>", desc: "List item" },
  ]},
  { category: "Tables", items: [
    { tag: "&lt;table&gt;", code: "<table>\n  <thead>\n    <tr><th></th><th></th></tr>\n  </thead>\n  <tbody>\n    <tr><td></td><td></td></tr>\n  </tbody>\n</table>", desc: "Data table" },
    { tag: "&lt;tr&gt;", code: "<tr><td></td></tr>", desc: "Table row" },
    { tag: "&lt;th&gt;", code: "<th></th>", desc: "Table header cell" },
    { tag: "&lt;td&gt;", code: "<td></td>", desc: "Table data cell" },
  ]},
  { category: "Forms", items: [
    { tag: "&lt;form&gt;", code: '<form action="" method="post">\n  \n</form>', desc: "Form container" },
    { tag: "&lt;input&gt;", code: '<input type="text" name="" placeholder="">', desc: "Input field" },
    { tag: "&lt;textarea&gt;", code: '<textarea name="" rows="4" cols="50"></textarea>', desc: "Multi-line input" },
    { tag: "&lt;button&gt;", code: '<button type="button"></button>', desc: "Clickable button" },
    { tag: "&lt;select&gt;", code: '<select name="">\n  <option value="">Option 1</option>\n  <option value="">Option 2</option>\n</select>', desc: "Dropdown select" },
  ]},
  { category: "Semantic", items: [
    { tag: "&lt;header&gt;", code: "<header>\n  \n</header>", desc: "Page/section header" },
    { tag: "&lt;nav&gt;", code: "<nav>\n  \n</nav>", desc: "Navigation section" },
    { tag: "&lt;main&gt;", code: "<main>\n  \n</main>", desc: "Main content" },
    { tag: "&lt;section&gt;", code: "<section>\n  \n</section>", desc: "Thematic section" },
    { tag: "&lt;article&gt;", code: "<article>\n  \n</article>", desc: "Self-contained content" },
    { tag: "&lt;footer&gt;", code: "<footer>\n  \n</footer>", desc: "Page/section footer" },
    { tag: "&lt;details&gt;", code: "<details>\n  <summary>Click to expand</summary>\n  \n</details>", desc: "Collapsible details" },
  ]},
  { category: "Layout", items: [
    { tag: "&lt;div&gt;", code: "<div>\n  \n</div>", desc: "Generic container" },
    { tag: "Flex container", code: '<div style="display:flex;gap:16px">\n  <div></div>\n  <div></div>\n</div>', desc: "Flexbox layout" },
    { tag: "Grid container", code: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">\n  <div></div>\n  <div></div>\n</div>', desc: "CSS Grid layout" },
  ]},
];

const cssVariables = [
  { category: "Colors", items: [
    { name: "color", example: "color: #333;", desc: "Text color" },
    { name: "background", example: "background: #f5f5f5;", desc: "Background color" },
    { name: "border-color", example: "border: 1px solid #ddd;", desc: "Border color" },
    { name: "opacity", example: "opacity: 0.8;", desc: "Transparency" },
  ]},
  { category: "Typography", items: [
    { name: "font-size", example: "font-size: 16px;", desc: "Text size" },
    { name: "font-weight", example: "font-weight: bold;", desc: "Text weight" },
    { name: "font-family", example: "font-family: Arial, sans-serif;", desc: "Font face" },
    { name: "line-height", example: "line-height: 1.6;", desc: "Line spacing" },
    { name: "text-align", example: "text-align: center;", desc: "Text alignment" },
    { name: "text-transform", example: "text-transform: uppercase;", desc: "Text case" },
  ]},
  { category: "Spacing", items: [
    { name: "margin", example: "margin: 16px;", desc: "Outer spacing" },
    { name: "padding", example: "padding: 16px;", desc: "Inner spacing" },
    { name: "gap", example: "gap: 12px;", desc: "Flex/grid gap" },
  ]},
  { category: "Layout", items: [
    { name: "display", example: "display: flex;", desc: "Display type" },
    { name: "position", example: "position: relative;", desc: "Positioning" },
    { name: "width", example: "width: 100%;", desc: "Element width" },
    { name: "max-width", example: "max-width: 600px;", desc: "Maximum width" },
    { name: "overflow", example: "overflow: hidden;", desc: "Overflow behavior" },
  ]},
  { category: "Effects", items: [
    { name: "border-radius", example: "border-radius: 8px;", desc: "Rounded corners" },
    { name: "box-shadow", example: "box-shadow: 0 2px 8px rgba(0,0,0,0.1);", desc: "Drop shadow" },
    { name: "transition", example: "transition: all 0.3s ease;", desc: "Animation transition" },
    { name: "transform", example: "transform: scale(1.05);", desc: "Transform element" },
  ]},
];

/* ══════════════════════════════════════════════════════════════════════════
   TOOLBAR BUTTON COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

function FmtBtn({ onClick, active, title, children, className: extraCls }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      title={title}
      className={`inline-flex items-center justify-center w-8 h-8 text-[13px] rounded-md transition-all duration-150 border-none cursor-pointer shrink-0 ${
        active
          ? "bg-[#FF6C37] text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${extraCls || ""}`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />;
}

/* ══════════════════════════════════════════════════════════════════════════
   HTML DOCUMENT HELPERS
   ══════════════════════════════════════════════════════════════════════════ */

/** Build a full <!DOCTYPE html> document from body HTML + optional CSS string */
function buildFullHtml(bodyHtml: string, css: string): string {
  const styleBlock = css.trim()
    ? css.trim()
    : `body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #1a1a2e; line-height: 1.6; }
    img { max-width: 100%; height: auto; }
    table { border-collapse: collapse; width: 100%; }`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
${styleBlock}
  </style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

/** Extract body content and <style> blocks from a full or partial HTML string */
function parseFullHtml(html: string): { body: string; css: string } {
  // Extract all <style> blocks from <head> or anywhere
  const styleMatches = html.match(/<style[\s\S]*?<\/style>/gi) || [];
  const css = styleMatches.join("\n");

  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return { body: bodyMatch[1].trim(), css };
  }

  // If no <body> tag, strip any <style> / <head> blocks and return remainder
  const stripped = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "")
    .trim();
  return { body: stripped, css };
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

export default function HTMLEditorPage() {
  const [mode, setMode] = useState<"preview" | "code" | "split">("split");
  const [htmlSource, setHtmlSource] = useState(templates.blank.html);
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState<"text" | "bg" | null>(null);
  const [customTextColor, setCustomTextColor] = useState("#000000");
  const [customBgColor, setCustomBgColor] = useState("#ffff00");
  const [showInsertTable, setShowInsertTable] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewMode, setPreviewMode] = useState<"normal" | "email">("normal");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showReference, setShowReference] = useState(false);
  const [refTab, setRefTab] = useState<"elements" | "css">("elements");
  const [refSearch, setRefSearch] = useState("");
  const [cssSource, setCssSource] = useState(""); // preserved <style> blocks

  const codeRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const updatingFromCode = useRef(false);
  const savedSelection = useRef<{ from: number; to: number } | null>(null);

  const notify = useCallback((msg: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  }, []);

  /* ─── Tiptap Editor ────────────────────────────────────────────────── */
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Subscript,
      Superscript,
      Placeholder.configure({ placeholder: "Start typing or choose a template\u2026" }),
    ],
    content: templates.blank.html,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      if (!updatingFromCode.current) {
        const bodyHtml = ed.getHTML();
        // Store only the body content; CSS is kept separately in cssSource
        setHtmlSource(bodyHtml);
      }
    },
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-[500px] px-8 py-6",
      },
    },
  });

  const syncCodeToVisual = useCallback((html: string) => {
    if (editor) {
      const { body, css } = parseFullHtml(html);
      if (css) setCssSource(css);
      setHtmlSource(body);
      updatingFromCode.current = true;
      editor.commands.setContent(body, { emitUpdate: false });
      updatingFromCode.current = false;
    }
  }, [editor]);

  const saveSelection = useCallback(() => {
    if (editor) {
      const { from, to } = editor.state.selection;
      savedSelection.current = { from, to };
    }
  }, [editor]);

  const restoreSelectionAndRun = useCallback((fn: () => void) => {
    if (!editor) return;
    if (savedSelection.current) {
      editor.commands.setTextSelection(savedSelection.current);
    }
    fn();
    setTimeout(() => editor.commands.focus(), 0);
  }, [editor]);

  const wordCount = editor
    ? { words: editor.state.doc.textContent.trim() ? editor.state.doc.textContent.trim().split(/\s+/).length : 0, chars: editor.state.doc.textContent.length }
    : { words: 0, chars: 0 };

  /* ─── File Operations ──────────────────────────────────────────────── */
  const handleSave = useCallback(() => {
    const full = buildFullHtml(htmlSource, cssSource);
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
    notify("Saved as document.html");
  }, [htmlSource, cssSource, notify]);

  const handleOpen = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,.htm";
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        const { body, css } = parseFullHtml(content);
        if (css) setCssSource(css);
        setHtmlSource(body);
        if (editor) {
          updatingFromCode.current = true;
          editor.commands.setContent(body, { emitUpdate: false });
          updatingFromCode.current = false;
        }
        notify("Opened " + file.name);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildFullHtml(htmlSource, cssSource));
    notify("HTML copied to clipboard");
  };

  const handleCopyEmailSafe = () => {
    const emailHtml = '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif"><tr><td style="padding:24px">\n' + htmlSource + "\n</td></tr></table>";
    navigator.clipboard.writeText(emailHtml);
    notify("Email-safe HTML copied");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(buildFullHtml(htmlSource, cssSource));
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleBeautify = useCallback(() => {
    try {
      // Beautify the full document
      const full = buildFullHtml(htmlSource, cssSource);
      const result = beautify.html(full, { indent_size: 2, wrap_line_length: 120 });
      const { body, css } = parseFullHtml(result);
      setHtmlSource(body);
      setCssSource(css);
      if (editor) {
        updatingFromCode.current = true;
        editor.commands.setContent(body, { emitUpdate: false });
        updatingFromCode.current = false;
      }
      notify("HTML beautified");
    } catch (err) {
      console.error("Beautify error:", err);
      notify("Beautify failed", "error");
    }
  }, [htmlSource, cssSource, editor, notify]);

  const insertSnippet = useCallback((code: string) => {
    if (mode === "code") {
      const ta = codeRef.current;
      if (ta) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal = htmlSource.slice(0, start) + code + htmlSource.slice(end);
        setHtmlSource(newVal);
        setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + code.length; }, 20);
      }
    } else if (editor) {
      editor.chain().focus().insertContent(code).run();
    }
    notify("Snippet inserted", "info");
  }, [mode, htmlSource, editor, notify]);

  const handleFindReplace = (replaceAll = false) => {
    if (!findText) return;
    const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const count = (htmlSource.match(new RegExp(escaped, "gi")) || []).length;
    if (count === 0) { notify("Not found", "info"); return; }
    const newHtml = replaceAll
      ? htmlSource.replace(new RegExp(escaped, "gi"), replaceText)
      : htmlSource.replace(new RegExp(escaped, "i"), replaceText);
    setHtmlSource(newHtml);
    syncCodeToVisual(newHtml);
    notify(replaceAll ? "Replaced " + count + " occurrences" : "Replaced 1 occurrence");
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "s") { e.preventDefault(); handleSave(); }
      if (mod && e.key === "f") { e.preventDefault(); setShowFindReplace((f) => !f); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSave]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if click is inside a dropdown popup
      if (target.closest('[data-dropdown-popup]')) return;
      setShowColorPicker(null);
      setShowInsertTable(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const deviceWidths: Record<string, string> = { desktop: "100%", tablet: "768px", mobile: "375px" };

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════════════ */
  return (
    <div className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-white" : "h-[calc(100vh-64px)]"}`}>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[200] flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium ${notification.type === "success" ? "bg-green-500 text-white" : notification.type === "error" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}>
          {notification.type === "success" && <CheckCircleIcon className="h-4 w-4" />}
          {notification.type === "error" && <XCircleIcon className="h-4 w-4" />}
          {notification.type === "info" && <InformationCircleIcon className="h-4 w-4" />}
          {notification.msg}
        </div>
      )}

      {/* Template Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={() => setShowTemplates(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Choose a Template</h3>
            <p className="text-sm text-gray-500 mb-4">Select a starting template for your document</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(templates).map(([key, t]) => (
                <button key={key} onClick={() => { setHtmlSource(t.html); syncCodeToVisual(t.html); setShowTemplates(false); notify('Loaded "' + t.name + '"'); }}
                  className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-[#FF6C37] hover:bg-orange-50 transition-all text-left">
                  <span className="text-2xl">{t.icon}</span>
                  <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowTemplates(false)} className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </div>
      )}

      {/* ═══ TOP TOOLBAR ════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          {/* Left: File actions */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setShowTemplates(true)} className="toolbar-btn" title="Templates"><DocumentPlusIcon className="h-4 w-4" /><span className="hidden sm:inline">New</span></button>
            <button onClick={handleOpen} className="toolbar-btn" title="Open File"><FolderOpenIcon className="h-4 w-4" /><span className="hidden sm:inline">Open</span></button>
            <button onClick={handleSave} className="toolbar-btn" title="Save HTML (⌘S)"><ArrowDownTrayIcon className="h-4 w-4" /><span className="hidden sm:inline">Save</span></button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button onClick={handleCopy} className="toolbar-btn" title="Copy HTML"><ClipboardDocumentIcon className="h-4 w-4" /><span className="hidden sm:inline">Copy</span></button>
            <button onClick={handleCopyEmailSafe} className="toolbar-btn" title="Copy Email-Safe HTML"><DocumentDuplicateIcon className="h-4 w-4" /><span className="hidden sm:inline">Email</span></button>
            <button onClick={handlePrint} className="toolbar-btn" title="Print"><PrinterIcon className="h-4 w-4" /><span className="hidden sm:inline">Print</span></button>
          </div>

          {/* Center: Mode switcher */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
            {([
              { key: "preview" as const, label: "Live Preview", icon: "👁️" },
              { key: "split" as const, label: "Split", icon: "⚡" },
              { key: "code" as const, label: "Code", icon: "</>" },
            ]).map((t) => (
              <button key={t.key} onClick={() => {
                let currentHtml = htmlSource;
                // When leaving visual modes, grab the latest from Tiptap
                if (editor && (mode === "preview" || mode === "split")) {
                  currentHtml = editor.getHTML();
                  setHtmlSource(currentHtml);
                }
                // When entering visual modes, push current HTML into Tiptap
                if (t.key === "preview" || t.key === "split") {
                  if (editor) {
                    updatingFromCode.current = true;
                    editor.commands.setContent(currentHtml, { emitUpdate: false });
                    updatingFromCode.current = false;
                  }
                }
                setMode(t.key);
              }} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                mode === t.key
                  ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}>
                <span className="mr-1">{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          {/* Right: View actions */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setShowReference(!showReference)} className={`toolbar-btn ${showReference ? "!bg-[#FF6C37] !text-white !shadow-sm" : ""}`} title="HTML & CSS Reference">
              <InformationCircleIcon className="h-4 w-4" /><span className="hidden sm:inline">Reference</span>
            </button>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="toolbar-btn" title="Toggle Fullscreen">
              {isFullscreen ? <ArrowsPointingInIcon className="h-4 w-4" /> : <ArrowsPointingOutIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ FORMATTING & UTILITIES TOOLBAR ═════════════════════════════════ */}
      <div className="bg-white border-b border-gray-200 px-4 py-1.5 flex flex-col">
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
            {(mode === "preview" || mode === "split") && editor && (
              <>
                {/* Device Switcher (Inside Toolbar) */}
                <div className="flex items-center bg-gray-100 rounded-md p-0.5 mr-2 shrink-0">
                  {(["desktop", "tablet", "mobile"] as const).map((d) => (
                    <button key={d} onClick={() => setPreviewDevice(d)} 
                      className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${previewDevice === d ? "bg-white text-[#FF6C37] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      title={`${d.charAt(0).toUpperCase() + d.slice(1)} View`}
                    >
                      {d === "desktop" ? <ComputerDesktopIcon className="h-4 w-4" /> : d === "tablet" ? <DeviceTabletIcon className="h-4 w-4" /> : <DevicePhoneMobileIcon className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 mr-2 shrink-0">
                  <button onClick={() => setPreviewMode(previewMode === "normal" ? "email" : "normal")} 
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border transition-colors ${previewMode === "email" ? "bg-[#FF6C37] border-[#FF6C37] text-white" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"}`}
                    title="Toggle Email Compatibility Mode"
                  >
                    {previewMode === "email" ? "Email Mode" : "Normal"}
                  </button>
                </div>
                <ToolbarDivider />

                {/* Undo / Redo */}
                <FmtBtn onClick={() => editor.chain().focus().undo().run()} title="Undo (⌘Z)"><ArrowUturnLeftIcon className="h-4 w-4" /></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().redo().run()} title="Redo (⌘⇧Z)"><ArrowUturnRightIcon className="h-4 w-4" /></FmtBtn>
                <ToolbarDivider />

                {/* Block Format */}
                <select 
                  onMouseDown={() => saveSelection()}
                  onChange={(e) => {
                    const v = e.target.value;
                    restoreSelectionAndRun(() => {
                      if (v === "p") editor.chain().focus().setParagraph().run();
                      else if (v.startsWith("h")) editor.chain().focus().setHeading({ level: parseInt(v[1]) as 1|2|3|4|5|6 }).run();
                      else if (v === "code") editor.chain().focus().toggleCodeBlock().run();
                      else if (v === "blockquote") editor.chain().focus().toggleBlockquote().run();
                    });
                  }} 
                  value={
                    editor.isActive("heading", { level: 1 }) ? "h1" :
                    editor.isActive("heading", { level: 2 }) ? "h2" :
                    editor.isActive("heading", { level: 3 }) ? "h3" :
                    editor.isActive("heading", { level: 4 }) ? "h4" :
                    editor.isActive("heading", { level: 5 }) ? "h5" :
                    editor.isActive("heading", { level: 6 }) ? "h6" :
                    editor.isActive("codeBlock") ? "code" :
                    editor.isActive("blockquote") ? "blockquote" :
                    "p"
                  }
                  className="h-8 px-2 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37] cursor-pointer hover:border-gray-300 transition-colors shrink-0" 
                  title="Block Format"
                >
                  <option value="p">¶ Paragraph</option>
                  <option value="h1">H1 — Heading 1</option>
                  <option value="h2">H2 — Heading 2</option>
                  <option value="h3">H3 — Heading 3</option>
                  <option value="h4">H4 — Heading 4</option>
                  <option value="h5">H5 — Heading 5</option>
                  <option value="h6">H6 — Heading 6</option>
                  <option value="code">{"{ }"} Code Block</option>
                  <option value="blockquote">❝ Blockquote</option>
                </select>

                {/* Font Family */}
                <select 
                  onMouseDown={() => saveSelection()}
                  onChange={(e) => {
                    const v = e.target.value;
                    restoreSelectionAndRun(() => {
                      if (v) editor.chain().focus().setFontFamily(v).run();
                      else editor.chain().focus().unsetFontFamily().run();
                    });
                  }} 
                  value={editor.getAttributes("textStyle").fontFamily || ""}
                  className="h-8 px-2 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37] cursor-pointer hover:border-gray-300 transition-colors shrink-0" 
                  title="Font Family"
                >
                  <option value="">System Default</option>
                  <option value="Arial, Helvetica, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Times New Roman, Times, serif">Times New Roman</option>
                  <option value="Courier New, Courier, monospace">Courier New</option>
                  <option value="Verdana, Geneva, sans-serif">Verdana</option>
                  <option value="Impact, sans-serif">Impact</option>
                </select>
                <ToolbarDivider />

                {/* Inline Formatting */}
                <FmtBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (⌘B)"><strong className="text-sm">B</strong></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (⌘I)"><em className="text-sm">I</em></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (⌘U)"><span className="underline text-sm">U</span></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><span className="line-through text-sm">S</span></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code"><span className="text-[11px] font-mono bg-gray-100 px-1 rounded">{"</>"}</span></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript"><span className="text-[11px]">X<sub className="text-[9px]">2</sub></span></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript"><span className="text-[11px]">X<sup className="text-[9px]">2</sup></span></FmtBtn>
                <ToolbarDivider />

                {/* Colors */}
                <div className="relative shrink-0">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={(e) => { e.stopPropagation(); setShowColorPicker(showColorPicker === "text" ? null : "text"); setShowInsertTable(false); }}
                    className={`inline-flex flex-col items-center justify-center w-8 h-8 rounded-md transition-all duration-150 border-none cursor-pointer ${showColorPicker === "text" ? "bg-gray-200" : "hover:bg-gray-100"} text-gray-600`}
                    title="Text Color"
                  >
                    <span className="text-sm font-bold leading-none" style={{ color: editor?.getAttributes("textStyle").color || "inherit" }}>A</span>
                    <div className="w-5 h-1 rounded-full mt-0.5 border border-gray-300" style={{ backgroundColor: editor?.getAttributes("textStyle").color || "#000000" }} />
                  </button>
                  {showColorPicker === "text" && (
                    <div
                      data-dropdown-popup
                      className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-3 w-64"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-xs font-semibold text-gray-700 mb-2">Text Color</p>
                      {/* Custom color input row */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="relative w-8 h-8 rounded-md border border-gray-200 overflow-hidden shrink-0 cursor-pointer">
                          <div className="absolute inset-0 rounded-md" style={{ backgroundColor: customTextColor }} />
                          <input
                            type="color"
                            value={customTextColor}
                            onChange={(e) => setCustomTextColor(e.target.value)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            title="Pick custom color"
                          />
                        </div>
                        <input
                          type="text"
                          value={customTextColor}
                          onChange={(e) => {
                            const v = e.target.value;
                            setCustomTextColor(v);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              editor.chain().focus().setColor(customTextColor).run();
                              setShowColorPicker(null);
                            }
                          }}
                          placeholder="#000000"
                          className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37] font-mono"
                        />
                        <button
                          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          onClick={() => { editor.chain().focus().setColor(customTextColor).run(); setShowColorPicker(null); }}
                          className="px-2 py-1.5 text-[10px] font-bold bg-[#FF6C37] text-white rounded-md hover:bg-[#e5612f] transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {/* Preset swatches */}
                      <div className="grid grid-cols-10 gap-1">
                        {colorPresets.map((c) => (
                          <button
                            key={c}
                            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onClick={() => { setCustomTextColor(c); editor.chain().focus().setColor(c).run(); setShowColorPicker(null); }}
                            className="w-5 h-5 rounded-sm border border-gray-200 hover:scale-125 hover:shadow-md transition-all duration-100 hover:z-10 relative"
                            style={{ background: c }}
                            title={c}
                          />
                        ))}
                      </div>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onClick={() => { editor.chain().focus().unsetColor().run(); setShowColorPicker(null); }}
                        className="mt-2 w-full text-xs text-gray-400 hover:text-[#FF6C37] py-1 transition-colors border-t border-gray-100"
                      >
                        ✕ Remove color
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative shrink-0">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={(e) => { e.stopPropagation(); setShowColorPicker(showColorPicker === "bg" ? null : "bg"); setShowInsertTable(false); }}
                    className={`inline-flex flex-col items-center justify-center w-8 h-8 rounded-md transition-all duration-150 border-none cursor-pointer ${showColorPicker === "bg" ? "bg-gray-200" : "hover:bg-gray-100"} text-gray-600`}
                    title="Highlight Color"
                  >
                    <PaintBrushIcon className="h-3.5 w-3.5" />
                    <div className="w-5 h-1 rounded-full mt-0.5 border border-gray-300" style={{ backgroundColor: editor?.getAttributes("highlight").color || "transparent" }} />
                  </button>
                  {showColorPicker === "bg" && (
                    <div
                      data-dropdown-popup
                      className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-3 w-64"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-xs font-semibold text-gray-700 mb-2">Highlight Color</p>
                      {/* Custom color input row */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="relative w-8 h-8 rounded-md border border-gray-200 overflow-hidden shrink-0 cursor-pointer">
                          <div className="absolute inset-0 rounded-md" style={{ backgroundColor: customBgColor }} />
                          <input
                            type="color"
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            title="Pick custom color"
                          />
                        </div>
                        <input
                          type="text"
                          value={customBgColor}
                          onChange={(e) => {
                            const v = e.target.value;
                            setCustomBgColor(v);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              editor.chain().focus().setHighlight({ color: customBgColor }).run();
                              setShowColorPicker(null);
                            }
                          }}
                          placeholder="#ffff00"
                          className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37] font-mono"
                        />
                        <button
                          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          onClick={() => { editor.chain().focus().setHighlight({ color: customBgColor }).run(); setShowColorPicker(null); }}
                          className="px-2 py-1.5 text-[10px] font-bold bg-[#FF6C37] text-white rounded-md hover:bg-[#e5612f] transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {/* Preset swatches */}
                      <div className="grid grid-cols-10 gap-1">
                        {colorPresets.map((c) => (
                          <button
                            key={c}
                            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onClick={() => { setCustomBgColor(c); editor.chain().focus().setHighlight({ color: c }).run(); setShowColorPicker(null); }}
                            className="w-5 h-5 rounded-sm border border-gray-200 hover:scale-125 hover:shadow-md transition-all duration-100 hover:z-10 relative"
                            style={{ background: c }}
                            title={c}
                          />
                        ))}
                      </div>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onClick={() => { editor.chain().focus().unsetHighlight().run(); setShowColorPicker(null); }}
                        className="mt-2 w-full text-xs text-gray-400 hover:text-[#FF6C37] py-1 transition-colors border-t border-gray-100"
                      >
                        ✕ Remove highlight
                      </button>
                    </div>
                  )}
                </div>

                <FmtBtn onClick={() => editor.chain().focus().unsetAllMarks().run()} title="Clear Formatting">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13L13 3M3 3l10 10"/></svg>
                </FmtBtn>
                <ToolbarDivider />

                {/* Alignment */}
                <FmtBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.5"/><rect x="1" y="6" width="10" height="1.5" rx="0.5"/><rect x="1" y="10" width="14" height="1.5" rx="0.5"/><rect x="1" y="14" width="8" height="1.5" rx="0.5"/></svg>
                </FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.5"/><rect x="3" y="6" width="10" height="1.5" rx="0.5"/><rect x="1" y="10" width="14" height="1.5" rx="0.5"/><rect x="4" y="14" width="8" height="1.5" rx="0.5"/></svg>
                </FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.5"/><rect x="5" y="6" width="10" height="1.5" rx="0.5"/><rect x="1" y="10" width="14" height="1.5" rx="0.5"/><rect x="7" y="14" width="8" height="1.5" rx="0.5"/></svg>
                </FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="1.5" rx="0.5"/><rect x="1" y="6" width="14" height="1.5" rx="0.5"/><rect x="1" y="10" width="14" height="1.5" rx="0.5"/><rect x="1" y="14" width="14" height="1.5" rx="0.5"/></svg>
                </FmtBtn>
                <ToolbarDivider />

                {/* Lists */}
                <FmtBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><ListBulletIcon className="h-4 w-4" /></FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><text x="1" y="5" fontSize="5" fontWeight="bold">1.</text><rect x="6" y="2" width="9" height="1.5" rx="0.5"/><text x="1" y="10" fontSize="5" fontWeight="bold">2.</text><rect x="6" y="7" width="9" height="1.5" rx="0.5"/><text x="1" y="15" fontSize="5" fontWeight="bold">3.</text><rect x="6" y="12" width="9" height="1.5" rx="0.5"/></svg>
                </FmtBtn>
                <ToolbarDivider />

                {/* Insert: Link, Image, Table, HR, Code */}
                <FmtBtn onClick={() => { 
                  if (editor.isActive("link")) {
                    editor.chain().focus().unsetLink().run();
                  } else {
                    const url = prompt("Enter URL:", "https://"); 
                    if (url && url !== "https://") {
                      editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
                    } else {
                      editor.commands.focus();
                    }
                  }
                }} active={editor.isActive("link")} title={editor.isActive("link") ? "Remove Link" : "Insert Link"}><LinkIcon className="h-4 w-4" /></FmtBtn>
                <FmtBtn onClick={() => { 
                  const url = prompt("Enter image URL:", "https://"); 
                  if (url && url !== "https://") {
                    editor.chain().focus().setImage({ src: url }).run();
                  } else {
                    editor.commands.focus();
                  }
                }} title="Insert Image"><PhotoIcon className="h-4 w-4" /></FmtBtn>

                {/* Table Insert */}
                <div className="relative shrink-0">
                  <button onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onClick={(e) => { e.stopPropagation(); setShowInsertTable(!showInsertTable); setShowColorPicker(null); }}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-all duration-150 border-none cursor-pointer ${showInsertTable ? "bg-gray-200" : "hover:bg-gray-100"} text-gray-600`} title="Insert Table">
                    <TableCellsIcon className="h-4 w-4" />
                  </button>
                  {showInsertTable && (
                    <div data-dropdown-popup className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-3 w-56" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                      <p className="text-xs font-semibold text-gray-700 mb-2.5">Insert Table</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1 block">Rows</label>
                          <input type="number" min={1} max={20} value={tableRows} onChange={(e) => setTableRows(+e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37]" />
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1 block">Cols</label>
                          <input type="number" min={1} max={10} value={tableCols} onChange={(e) => setTableCols(+e.target.value)} className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37]" />
                        </div>
                      </div>
                      <button onClick={() => { editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run(); setShowInsertTable(false); }}
                        className="w-full py-2 text-xs font-semibold bg-[#FF6C37] text-white rounded-lg hover:bg-[#e5612f] transition-colors shadow-sm">
                        Insert Table
                      </button>
                    </div>
                  )}
                </div>

                {editor.isActive("table") && (
                  <div className="flex items-center gap-0.5 ml-1 bg-gray-50 px-1 rounded-md border border-gray-200 shrink-0">
                    <FmtBtn onClick={() => editor.chain().focus().addColumnBefore().run()} title="Add Column Before"><span className="text-[10px]">C+←</span></FmtBtn>
                    <FmtBtn onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column After"><span className="text-[10px]">C+→</span></FmtBtn>
                    <FmtBtn onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete Column"><span className="text-[10px] text-red-500">C−</span></FmtBtn>
                    <div className="w-px h-4 bg-gray-300 mx-0.5" />
                    <FmtBtn onClick={() => editor.chain().focus().addRowBefore().run()} title="Add Row Above"><span className="text-[10px]">R+↑</span></FmtBtn>
                    <FmtBtn onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row Below"><span className="text-[10px]">R+↓</span></FmtBtn>
                    <FmtBtn onClick={() => editor.chain().focus().deleteRow().run()} title="Delete Row"><span className="text-[10px] text-red-500">R−</span></FmtBtn>
                    <div className="w-px h-4 bg-gray-300 mx-0.5" />
                    <FmtBtn onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table"><TrashIcon className="h-3 w-3 text-red-500" /></FmtBtn>
                  </div>
                )}

                <FmtBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Line">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="7" width="14" height="2" rx="1"/></svg>
                </FmtBtn>
                <FmtBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block"><CodeBracketIcon className="h-4 w-4" /></FmtBtn>
                <ToolbarDivider />
              </>
            )}

            {/* Always visible Utilities */}
            <FmtBtn onClick={() => setShowFindReplace(!showFindReplace)} active={showFindReplace} title="Find & Replace (⌘F)">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </FmtBtn>
            <FmtBtn onClick={handleBeautify} title="Beautify HTML">
              <SparklesIcon className="h-4 w-4" />
            </FmtBtn>
          </div>

          {/* Find & Replace Bar */}
          {showFindReplace && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 shrink-0" />
              <input value={findText} onChange={(e) => setFindText(e.target.value)} placeholder="Find…" className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37]" autoFocus />
              <input value={replaceText} onChange={(e) => setReplaceText(e.target.value)} placeholder="Replace…" className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-[#FF6C37]/30 focus:border-[#FF6C37]" />
              <button onClick={() => handleFindReplace(false)} className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">Replace</button>
              <button onClick={() => handleFindReplace(true)} className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">Replace All</button>
              <button onClick={() => setShowFindReplace(false)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <XCircleIcon className="h-4 w-4" />
              </button>
            </div>
          )}
      </div>

      {/* ═══ EDITOR AREA ════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden">
        {/* Live Preview Editor */}
        {(mode === "preview" || mode === "split") && (
          <div className={`flex flex-col ${mode === "split" ? "w-1/2 border-r border-gray-200" : "flex-1"} bg-gray-100`}>
            <div className="flex-1 overflow-auto p-4 md:p-10 flex justify-center items-start">
              <div 
                className={`bg-white shadow-xl transition-all duration-300 min-h-[100%] border border-gray-200 ${previewMode === "email" ? "ring-4 ring-blue-100" : ""}`} 
                style={{ 
                  width: previewMode === "email" ? "600px" : deviceWidths[previewDevice], 
                  maxWidth: "100%",
                }}
              >
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        )}

        {/* Code Editor */}
        {(mode === "code" || mode === "split") && (
          <div className={`flex flex-col ${mode === "split" ? "w-1/2" : "flex-1"} bg-[#1e1e2e]`}>
            <div className="flex-1 overflow-hidden">
              <textarea
                ref={codeRef}
                value={buildFullHtml(htmlSource, cssSource)}
                onChange={(e) => {
                  const val = e.target.value;
                  const { body, css } = parseFullHtml(val);
                  setHtmlSource(body);
                  setCssSource(css);
                  if (mode === "split" && editor) {
                    updatingFromCode.current = true;
                    editor.commands.setContent(body, { emitUpdate: false });
                    updatingFromCode.current = false;
                  }
                }}
                spellCheck={false}
                className="w-full h-full bg-[#1e1e2e] text-[#cdd6f4] caret-[#FF6C37] resize-none outline-none p-4 selection:bg-[#FF6C37]/30"
                style={{ fontSize: "13px", lineHeight: "1.6", fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace", tabSize: 2 }}
              />
            </div>
          </div>
        )}

        {/* Reference Panel */}
        {showReference && (
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-hidden shrink-0">
            <div className="px-3 py-2.5 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-900">{"\uD83D\uDCD6"} Reference</span>
                <button onClick={() => setShowReference(false)} className="text-gray-400 hover:text-gray-600 text-xs">{"\u2715"}</button>
              </div>
              <div className="flex gap-1 mb-2">
                {(["elements", "css"] as const).map((t) => (
                  <button key={t} onClick={() => setRefTab(t)} className={`flex-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${refTab === t ? "bg-[#FF6C37] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {t === "elements" ? "\uD83C\uDFF7\uFE0F HTML Elements" : "\uD83C\uDFA8 CSS Properties"}
                  </button>
                ))}
              </div>
              <input value={refSearch} onChange={(e) => setRefSearch(e.target.value)} placeholder={refTab === "elements" ? "Search elements\u2026" : "Search properties\u2026"} className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6C37] bg-white" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {refTab === "elements" ? (
                htmlReference.map((group) => {
                  const filtered = group.items.filter((item) => refSearch === "" || item.tag.toLowerCase().includes(refSearch.toLowerCase()) || item.desc.toLowerCase().includes(refSearch.toLowerCase()));
                  if (filtered.length === 0) return null;
                  return (
                    <div key={group.category}>
                      <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{group.category}</div>
                      {filtered.map((item, i) => (
                        <button key={i} onClick={() => insertSnippet(item.code)} className="w-full text-left px-3 py-2 border-b border-gray-50 hover:bg-orange-50 transition-colors group/ref">
                          <div className="flex items-center justify-between">
                            <code className="text-xs font-semibold text-[#FF6C37]" dangerouslySetInnerHTML={{ __html: item.tag }} />
                            <span className="text-[10px] text-gray-400 opacity-0 group-hover/ref:opacity-100 transition-opacity">click to insert</span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  );
                })
              ) : (
                cssVariables.map((group) => {
                  const filtered = group.items.filter((item) => refSearch === "" || item.name.toLowerCase().includes(refSearch.toLowerCase()) || item.desc.toLowerCase().includes(refSearch.toLowerCase()));
                  if (filtered.length === 0) return null;
                  return (
                    <div key={group.category}>
                      <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{group.category}</div>
                      {filtered.map((item, i) => (
                        <button key={i} onClick={() => { navigator.clipboard.writeText(item.example); notify("Copied: " + item.example, "info"); }} className="w-full text-left px-3 py-2 border-b border-gray-50 hover:bg-orange-50 transition-colors group/ref">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#1e1e2e]">{item.name}</span>
                            <span className="text-[10px] text-gray-400 opacity-0 group-hover/ref:opacity-100 transition-opacity">click to copy</span>
                          </div>
                          <code className="text-[11px] text-[#FF6C37] block mt-0.5">{item.example}</code>
                          <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══ STATUS BAR ═════════════════════════════════════════════════════ */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-1.5 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>{wordCount.words} words</span>
          <span>{wordCount.chars} characters</span>
          <span>{new Blob([htmlSource]).size < 1024 ? new Blob([htmlSource]).size + " B" : (new Blob([htmlSource]).size / 1024).toFixed(1) + " KB"}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="capitalize">{mode} mode</span>
          <span className="text-[#FF6C37] font-medium">Tiptap Editor</span>
        </div>
      </div>

      {/* ═══ GLOBAL STYLES ══════════════════════════════════════════════════ */}
      <style jsx global>{`
        .toolbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 500;
          color: #4b5563;
          background: transparent;
          border-radius: 6px;
          transition: all 0.15s ease;
          border: 1px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          line-height: 1;
        }
        .toolbar-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }
        .toolbar-btn:active {
          background: #e5e7eb;
          transform: scale(0.97);
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .tiptap-editor {
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.7;
          color: #1a1a2e;
          font-size: 15px;
        }
        .tiptap-editor:focus { outline: none; }
        .tiptap-editor > *:first-child { margin-top: 0; }
        .tiptap-editor h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; color: #111; }
        .tiptap-editor h2 { font-size: 1.5em; font-weight: 700; margin: 0.75em 0; color: #111; }
        .tiptap-editor h3 { font-size: 1.25em; font-weight: 600; margin: 0.75em 0; color: #111; }
        .tiptap-editor h4 { font-size: 1.1em; font-weight: 600; margin: 0.75em 0; color: #333; }
        .tiptap-editor h5 { font-size: 1em; font-weight: 600; margin: 0.75em 0; color: #333; }
        .tiptap-editor h6 { font-size: 0.9em; font-weight: 600; margin: 0.75em 0; color: #555; }
        .tiptap-editor p { margin: 0.5em 0; }
        .tiptap-editor ul, .tiptap-editor ol { padding-left: 24px; margin: 0.5em 0; }
        .tiptap-editor li { margin: 0.25em 0; }
        .tiptap-editor blockquote {
          border-left: 4px solid #ff6c37;
          padding: 12px 20px;
          margin: 16px 0;
          background: #fff7f3;
          color: #555;
          font-style: italic;
        }
        .tiptap-editor pre {
          background: #1e1e2e;
          color: #cdd6f4;
          padding: 16px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          overflow-x: auto;
          margin: 16px 0;
        }
        .tiptap-editor code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9em;
        }
        .tiptap-editor pre code { background: none; padding: 0; color: inherit; }
        .tiptap-editor table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        .tiptap-editor th, .tiptap-editor td {
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          text-align: left;
          position: relative;
        }
        .tiptap-editor th { background: #f3f4f6; font-weight: 600; }
        .tiptap-editor .tableWrapper { overflow-x: auto; margin: 16px 0; }
        .tiptap-editor .selectedCell { background: rgba(255, 108, 55, 0.1); }
        .tiptap-editor hr { border: none; border-top: 2px solid #e5e7eb; margin: 24px 0; }
        .tiptap-editor img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
        .tiptap-editor a { color: #ff6c37; text-decoration: underline; }
        .tiptap-editor *::selection { background: rgba(255, 108, 55, 0.2); }
        .tiptap-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .tiptap-editor mark { background: inherit; color: inherit; }
        .tiptap-editor .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background: #ff6c37;
          pointer-events: none;
        }
        .tiptap-editor .resize-cursor { cursor: col-resize; }
      `}</style>
    </div>
  );
}
