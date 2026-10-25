import React from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { AUTHOR } from "../data/author";

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Visible author + dates. Google's quality raters look for exactly this on
// finance content; the matching Person schema is emitted by the page.
const AuthorByline = ({ datePublished, dateModified }) => (
  <div
    data-testid="author-byline"
    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16233d] text-white">
      <UserRound className="h-5 w-5" />
    </div>
    <div className="text-sm">
      <div className="font-semibold text-[#16233d]">
        Written by{" "}
        <Link to={AUTHOR.url} className="text-emerald-700 hover:underline">
          {AUTHOR.name}
        </Link>
        <span className="font-normal text-slate-500"> · {AUTHOR.jobTitle}</span>
      </div>
      <div className="mt-0.5 text-slate-500">
        Published {formatDate(datePublished)}
        {dateModified && dateModified !== datePublished && (
          <> · Updated {formatDate(dateModified)}</>
        )}
      </div>
    </div>
  </div>
);

export default AuthorByline;
