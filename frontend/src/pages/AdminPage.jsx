import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Lock, Users, BellRing, LogOut, RefreshCw, Mail, Phone } from "lucide-react";
import { API } from "../App";

const AdminPage = () => {
  const [key, setKey] = useState(sessionStorage.getItem("cavicord_admin_key") || "");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (adminKey) => {
    setLoading(true);
    setError("");
    try {
      const headers = { "X-Admin-Key": adminKey };
      const [l, s] = await Promise.all([
        axios.get(`${API}/admin/leads`, { headers }),
        axios.get(`${API}/admin/subscribers`, { headers }),
      ]);
      setLeads(l.data.leads || []);
      setSubs(s.data.subscribers || []);
      sessionStorage.setItem("cavicord_admin_key", adminKey);
      setKey(adminKey);
    } catch (e) {
      if (e.response?.status === 401) {
        setError("Invalid admin key. Please try again.");
        sessionStorage.removeItem("cavicord_admin_key");
        setKey("");
      } else {
        setError("Failed to load data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (key) fetchData(key);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    sessionStorage.removeItem("cavicord_admin_key");
    setKey("");
    setLeads([]);
    setSubs([]);
  };

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "";

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Admin Dashboard | Cavicord" description="Private admin dashboard." path="/admin" />
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {!key ? (
            <div className="max-w-sm mx-auto mt-10">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </span>
                <h1 className="mt-4 font-serif text-2xl font-bold text-[#16233d]">Admin Access</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Enter your admin key to view leads and subscribers.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) fetchData(input.trim());
                  }}
                  className="mt-6 space-y-3 text-left"
                >
                  <Label htmlFor="adminkey" className="text-slate-700">Admin Key</Label>
                  <Input
                    id="adminkey"
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter admin key"
                    className="h-11"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-[#16233d] hover:bg-[#1e2f52] text-white font-semibold"
                  >
                    {loading ? "Checking…" : "Unlock Dashboard"}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-[#16233d]">Admin Dashboard</h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Form submissions are also emailed to you automatically.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchData(key)}
                    disabled={loading}
                    className="border-slate-300 text-[#16233d]"
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="border-slate-300 text-slate-600"
                  >
                    <LogOut className="w-4 h-4 mr-1" /> Lock
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="leads" className="mt-8">
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="leads" className="data-[state=active]:bg-white">
                    <Users className="w-4 h-4 mr-1.5" /> Leads ({leads.length})
                  </TabsTrigger>
                  <TabsTrigger value="subscribers" className="data-[state=active]:bg-white">
                    <BellRing className="w-4 h-4 mr-1.5" /> Subscribers ({subs.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="leads" className="mt-6">
                  {loading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : leads.length === 0 ? (
                    <p className="text-slate-500 text-sm bg-white rounded-xl border border-slate-200 p-8 text-center">
                      No leads yet. When someone fills the "Get Personalized Rates" form, it appears here.
                    </p>
                  ) : (
                    <div className="grid gap-3">
                      {leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-[#16233d]">
                                {lead.first_name} {lead.last_name}
                              </p>
                              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                                <span className="inline-flex items-center gap-1">
                                  <Mail className="w-3.5 h-3.5" /> {lead.email}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5" /> {lead.phone}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-slate-400 shrink-0">{fmtDate(lead.created_at)}</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                              {lead.investment_amount}
                            </Badge>
                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-0">
                              {lead.term_months}-month CD
                            </Badge>
                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-0">
                              {lead.timeframe}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="subscribers" className="mt-6">
                  {loading ? (
                    <div className="space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-14 w-full rounded-xl" />
                      ))}
                    </div>
                  ) : subs.length === 0 ? (
                    <p className="text-slate-500 text-sm bg-white rounded-xl border border-slate-200 p-8 text-center">
                      No subscribers yet. Signups from the "Never Miss a Rate Change" section appear here.
                    </p>
                  ) : (
                    <div className="grid gap-3">
                      {subs.map((s) => (
                        <div
                          key={s.id}
                          className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <span className="font-medium text-[#16233d] text-sm inline-flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" /> {s.email}
                          </span>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                s.frequency === "instant"
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-100 border-0"
                              }
                            >
                              {s.frequency === "instant" ? "Instant Alerts" : "Weekly Top-10"}
                            </Badge>
                            <span className="text-xs text-slate-400">{fmtDate(s.created_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
