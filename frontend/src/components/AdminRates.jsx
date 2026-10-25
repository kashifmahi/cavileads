import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { CheckCircle2, AlertTriangle, RefreshCw, ExternalLink, Save } from "lucide-react";
import { formatTerm } from "../mock/mock";
import { bankLogoUrl } from "./RateTable";
import { API } from "../App";

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "never";

const daysOld = (d) => (d ? Math.floor((Date.now() - new Date(d).getTime()) / 86400000) : 999);

const StatusBadge = ({ rate }) => {
  const age = daysOld(rate.updated_at);
  if (rate.verify_status === "confirmed" && age <= 1)
    return <Badge className="bg-emerald-100 text-emerald-700 border-0">Verified today</Badge>;
  if (age <= 7) return <Badge className="bg-slate-100 text-slate-600 border-0">{age}d old</Badge>;
  return (
    <Badge className="bg-amber-100 text-amber-800 border-0 inline-flex items-center gap-1">
      <AlertTriangle className="w-3 h-3" /> {age}d old — check
    </Badge>
  );
};

const AdminRates = ({ adminKey }) => {
  const [rates, setRates] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const headers = { "X-Admin-Key": adminKey };

  const load = useCallback(async () => {
    const res = await axios.get(`${API}/admin/rates`, { headers });
    setRates(res.data.rates || []);
    setDrafts({});
  }, [adminKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    load().catch(() => setMsg("Could not load rates."));
  }, [load]);

  const setDraft = (id, field, value) =>
    setDrafts((d) => ({ ...d, [id]: { ...(d[id] || {}), [field]: value } }));

  const save = async (rate) => {
    const d = drafts[rate.id];
    if (!d) return;
    const payload = {};
    if (d.apy !== undefined && d.apy !== "") payload.apy = parseFloat(d.apy);
    if (d.min_deposit !== undefined && d.min_deposit !== "") payload.min_deposit = parseInt(d.min_deposit, 10);
    if (d.penalty !== undefined) payload.penalty = d.penalty;
    if (Object.keys(payload).length === 0) {
      setMsg("Nothing to save — enter a value first.");
      return;
    }
    setBusy(true);
    try {
      const res = await axios.patch(`${API}/admin/rates/${rate.id}`, payload, { headers });
      setRates((rs) => rs.map((r) => (r.id === rate.id ? res.data : r)));
      setDrafts((ds) => {
        const n = { ...ds };
        delete n[rate.id];
        return n;
      });
      setMsg(`Saved ${rate.bank} ${formatTerm(rate.term_months)}. Rebuild runs at 6:15 AM, or run the daily refresh now.`);
    } catch (e) {
      setMsg(e.response?.data?.detail || "Save failed.");
    } finally {
      setBusy(false);
    }
  };

  const verifyAll = async () => {
    if (!window.confirm("Mark every listed rate as verified today? Only do this after checking the banks.")) return;
    setBusy(true);
    try {
      await axios.post(`${API}/admin/rates/verify-all`, {}, { headers });
      await load();
      setMsg("All rates marked verified today.");
    } catch {
      setMsg("Verify failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const runCheck = async () => {
    setBusy(true);
    setMsg("Checking every bank page — this takes about a minute…");
    try {
      const res = await axios.post(`${API}/admin/rates/verify-run`, {}, { headers, timeout: 180000 });
      await load();
      const r = res.data;
      setMsg(
        `Confirmed ${r.confirmed.length}, could not confirm ${r.unconfirmed.length}, errors ${r.errored.length}. ` +
          `Unconfirmed rows are flagged below — open the bank page, check the APY, and save.`
      );
    } catch {
      setMsg("Check failed.");
    } finally {
      setBusy(false);
    }
  };

  const stale = rates.filter((r) => daysOld(r.updated_at) > 7).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-600">
            {rates.length} listed rates · {stale > 0 ? <span className="text-amber-700 font-medium">{stale} older than 7 days</span> : "all fresh"}
          </p>
          {msg && <p className="mt-1 text-sm text-[#16233d]" data-testid="admin-rates-message">{msg}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={runCheck} disabled={busy} data-testid="admin-rates-check-now">
            <RefreshCw className={`w-4 h-4 mr-1.5 ${busy ? "animate-spin" : ""}`} /> Check bank pages now
          </Button>
          <Button size="sm" onClick={verifyAll} disabled={busy} data-testid="admin-rates-verify-all" className="bg-emerald-600 hover:bg-emerald-500 text-white">
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Mark all verified today
          </Button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Bank</th>
              <th className="px-4 py-3">Term</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">APY %</th>
              <th className="px-4 py-3">Min $</th>
              <th className="px-4 py-3">Penalty</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rates.map((r) => {
              const d = drafts[r.id] || {};
              const dirty = Object.keys(d).length > 0;
              return (
                <tr key={r.id} className={r.verify_status === "unconfirmed" || r.verify_status === "error" ? "bg-amber-50/50" : ""}>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      {bankLogoUrl(r.url) && (
                        <img src={bankLogoUrl(r.url, 32)} alt="" width={16} height={16} className="w-4 h-4" />
                      )}
                      {r.bank}
                      {r.url && (
                        <a href={r.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-600" title="Open bank page">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">{formatTerm(r.term_months)}</td>
                  <td className="px-4 py-2.5 text-slate-500">{r.rate_type}</td>
                  <td className="px-4 py-2.5">
                    <Input
                      type="number"
                      step="0.01"
                      data-testid={`rate-apy-input-${r.id}`}
                      className="h-8 w-20"
                      value={d.apy ?? r.apy}
                      onChange={(e) => setDraft(r.id, "apy", e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <Input
                      type="number"
                      step="100"
                      data-testid={`rate-min-input-${r.id}`}
                      className="h-8 w-24"
                      value={d.min_deposit ?? r.min_deposit}
                      onChange={(e) => setDraft(r.id, "min_deposit", e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <Input
                      data-testid={`rate-penalty-input-${r.id}`}
                      className="h-8 w-44"
                      value={d.penalty ?? r.penalty}
                      onChange={(e) => setDraft(r.id, "penalty", e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <StatusBadge rate={r} />
                    <div className="text-[11px] text-slate-400 mt-0.5">upd. {fmt(r.updated_at)}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <Button size="sm" variant={dirty ? "default" : "outline"} disabled={!dirty || busy} onClick={() => save(r)} data-testid={`rate-save-${r.id}`}>
                      <Save className="w-3.5 h-3.5 mr-1" /> Save
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRates;
