import React from "react";
import { Link } from "react-router-dom";

// Renders section text with inline markup:
//   [anchor](/path)          internal link (router <Link>)
//   [anchor](https://...)    external source link (new tab)
//   **term**                 bold, used for one-line definitions
const TOKEN_RE = /\[([^\]]+)\]\(((?:\/|https:\/\/)[^)\s]*)\)|\*\*([^*]+)\*\*/g;
const LINK_RE = /\[([^\]]+)\]\(((?:\/|https:\/\/)[^)\s]*)\)/g;
const linkClass =
  "font-medium text-emerald-800 underline underline-offset-2 decoration-emerald-300 hover:decoration-emerald-700";

export const RichText = ({ text }) => {
  if (!text || typeof text !== "string" || !(text.includes("](") || text.includes("**"))) return text || null;
  const out = [];
  let last = 0;
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[3] !== undefined) {
      out.push(<strong key={m.index} className="font-semibold text-[#16233d]">{m[3]}</strong>);
    } else if (m[2].startsWith("/")) {
      out.push(<Link key={m.index} to={m[2]} className={linkClass}>{m[1]}</Link>);
    } else {
      out.push(
        <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {m[1]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

// Plain-text version for meta tags and JSON-LD.
export const stripLinks = (text) =>
  typeof text === "string" ? text.replace(LINK_RE, "$1").replace(/\*\*([^*]+)\*\*/g, "$1") : text;

// Optional extras for article/guide sections: a comparison table and a sources list.
// A section may carry `table: { caption?, columns: [...], rows: [[...], ...] }`.

export const SectionTable = ({ table }) => {
  if (!table || !table.columns || !table.rows) return null;
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200" data-testid="section-table">
      <table className="w-full text-sm text-left">
        {table.caption && (
          <caption className="caption-bottom px-4 py-2 text-xs text-slate-500 text-left">{table.caption}</caption>
        )}
        <thead className="bg-slate-50 text-[#16233d]">
          <tr>
            {table.columns.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-100 align-top">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-3 font-medium text-[#16233d]">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-3 text-slate-600">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SourcesList = ({ sources }) => {
  if (!sources || !sources.length) return null;
  return (
    <section className="mt-12" data-testid="content-sources">
      <h2 className="font-serif text-xl font-bold text-[#16233d]">Sources</h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 underline underline-offset-2 hover:text-emerald-600"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
