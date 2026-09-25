import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ExternalLink } from "lucide-react";
import { formatTerm } from "../mock/mock";

export const BankAvatar = ({ bank, color, size = "w-10 h-10" }) => (
  <span
    className={`flex items-center justify-center ${size} rounded-full text-white font-bold text-sm shrink-0`}
    style={{ backgroundColor: color }}
  >
    {bank.charAt(0)}
  </span>
);

export const fmtDeposit = (v) => (v === 0 ? "None" : `$${v.toLocaleString()}`);

const OpenAccountButton = ({ rate, size = "sm" }) => (
  <Button
    asChild
    size={size}
    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors duration-200"
  >
    <a href={rate.url || "#"} target="_blank" rel="noopener noreferrer sponsored">
      Open Account
      <ExternalLink className="w-3.5 h-3.5 ml-1" />
    </a>
  </Button>
);

const RateTable = ({ rates = [], loading = false, showBest = true, onView }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Bank</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">APY</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Term</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Min. Deposit</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Open Account</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, i) => (
              <tr
                key={rate.id}
                className={`hover:bg-emerald-50/40 transition-colors duration-150 ${
                  i !== rates.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <BankAvatar bank={rate.bank} color={rate.color} />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#16233d]">{rate.bank}</span>
                      {showBest && rate.best && (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-xs">
                          Best Rate
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-emerald-600">{rate.apy.toFixed(2)}%</span>
                  <span className="text-xs text-slate-400 ml-1">APY</span>
                </td>
                <td className="px-6 py-4 text-slate-600">{formatTerm(rate.term_months)}</td>
                <td className="px-6 py-4 text-slate-600">{fmtDeposit(rate.min_deposit)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(rate)}
                        className="border-slate-300 text-[#16233d] hover:bg-[#16233d] hover:text-white transition-colors duration-200"
                      >
                        Details
                      </Button>
                    )}
                    <OpenAccountButton rate={rate} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {rates.map((rate) => (
          <div key={rate.id} className="rounded-xl border border-slate-200 p-5 shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BankAvatar bank={rate.bank} color={rate.color} />
                <div>
                  <p className="font-semibold text-[#16233d] text-sm">{rate.bank}</p>
                  {showBest && rate.best && (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 text-[10px] mt-1">
                      Best
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-600">{rate.apy.toFixed(2)}%</p>
                <p className="text-[10px] text-slate-400 uppercase">APY</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-slate-400">Term</p>
                <p className="text-slate-700 font-medium">{formatTerm(rate.term_months)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Min. Deposit</p>
                <p className="text-slate-700 font-medium">{fmtDeposit(rate.min_deposit)}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {onView && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(rate)}
                  className="flex-1 border-slate-300 text-[#16233d] hover:bg-[#16233d] hover:text-white transition-colors duration-200"
                >
                  Details
                </Button>
              )}
              <div className="flex-1 [&>*]:w-full">
                <OpenAccountButton rate={rate} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RateTable;
