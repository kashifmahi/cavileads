import React from "react";

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
