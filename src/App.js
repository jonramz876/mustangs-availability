import { useState, useEffect } from "react";

const LOGO_B64 = "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";

const TOURNAMENTS_DEFAULT = [
  { id: "t1", label: "Tournament #1", dates: "May 29 – 30", dateRange: ["2026-05-29", "2026-05-30"] },
  { id: "t2", label: "Tournament #2", dates: "June 26 – 28", dateRange: ["2026-06-26", "2026-06-28"] },
  { id: "t3", label: "Tournament #3", dates: "July 17 – 19", dateRange: ["2026-07-17", "2026-07-19"] },
];

const GAMES_DEFAULT = [
  { id: 10364, date: "2026-05-14", day: "Thu", time: "7:30 PM", opponent: "FC Dynamo ROC B2016", location: "Home" },
  { id: 10369, date: "2026-05-21", day: "Thu", time: "7:30 PM", opponent: "Fairport Flash", location: "Away" },
  { id: 10371, date: "2026-05-28", day: "Thu", time: "7:30 PM", opponent: "Greece United F.C.-Palmgreen", location: "Away" },
  { id: 10373, date: "2026-06-05", day: "Fri", time: "7:30 PM", opponent: "Livonia United", location: "Home" },
  { id: 10383, date: "2026-06-16", day: "Tue", time: "7:30 PM", opponent: "Victor Blue Devils - Norman", location: "Home" },
  { id: 10379, date: "2026-06-18", day: "Thu", time: "7:30 PM", opponent: "Penfield Fusion Blue Wilson", location: "Away" },
  { id: 10385, date: "2026-06-25", day: "Thu", time: "7:30 PM", opponent: "FC Dynamo ROC B2016", location: "Away" },
  { id: 10390, date: "2026-06-30", day: "Tue", time: "7:30 PM", opponent: "Fairport Flash", location: "Home" },
  { id: 10392, date: "2026-07-02", day: "Thu", time: "7:30 PM", opponent: "Greece United F.C.-Palmgreen", location: "Home" },
  { id: 10394, date: "2026-07-14", day: "Tue", time: "7:30 PM", opponent: "Livonia United", location: "Away" },
  { id: 10400, date: "2026-07-23", day: "Thu", time: "7:30 PM", opponent: "Penfield Fusion Blue Wilson", location: "Home" },
  { id: 10404, date: "2026-07-30", day: "Thu", time: "7:30 PM", opponent: "Victor Blue Devils - Norman", location: "Away" },
];

const ROSTER_DEFAULT = [
  "Ethan Hale","Finnegan Close","Freddy Rainaldi","Gage Simmons",
  "Jack Ramsey","James Krenzer","Julian Begley","Keegan Rozo",
  "Mack Ruster","Nolan Qi","Parker Earl","Remington Reid",
  "Tahir Sudemirci","Theo Brown"
];

const MIN_PLAYERS = 9;
const UNSURE_RISK = 2;
const SUPABASE_URL = "https://zzofcmmfehjakzpwgdzi.supabase.co";
const SUPABASE_KEY = "sb_publishable_doFuAoa10gp2umsbxH8eaQ_p4dc8aQ2";

async function dbGet(key) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/kv?key=eq.${key}&select=value`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  const rows = await res.json();
  return rows.length ? JSON.parse(rows[0].value) : null;
}

async function dbSet(key, value) {
  await fetch(`${SUPABASE_URL}/rest/v1/kv`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ key, value: JSON.stringify(value) }),
  });
}

const fmt = (d) => { const dt = new Date(d+"T12:00:00"); return dt.toLocaleDateString("en-US",{month:"short",day:"numeric"}); };
const fmtFull = (d) => { const dt = new Date(d+"T12:00:00"); return dt.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}); };

// Pittsford Mustangs colors
// Royal Blue: #1a56a0 / #1e4d96
// Gold/Yellow: #f5c518 / #e8b800
// Dark Blue: #0f3468
// White: #ffffff

export default function App() {
  const [tab, setTab] = useState("parent");
  const [responses, setResponses] = useState({});
  const [games, setGames] = useState(GAMES_DEFAULT);
  const [roster, setRoster] = useState(ROSTER_DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const [tournaments] = useState(TOURNAMENTS_DEFAULT);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [availability, setAvailability] = useState({});
  const [reasons, setReasons] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [comments, setComments] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingRoster, setEditingRoster] = useState(false);
  const [editingGames, setEditingGames] = useState(false);
  const [draftRoster, setDraftRoster] = useState([]);
  const [draftGames, setDraftGames] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [r, g, ro] = await Promise.all([
          dbGet("mustangs_responses"),
          dbGet("mustangs_games"),
          dbGet("mustangs_roster"),
        ]);
        if (r) setResponses(r);
        if (g) setGames(g);
        if (ro) setRoster(ro);
      } catch (e) {
        console.error("DB load error:", e);
      }
      setLoaded(true);
    })();
  }, []);

  const saveR = async (u) => { setResponses(u); await dbSet("mustangs_responses", u); };

  const selectPlayer = (name) => {
    setSelectedPlayer(name); setSubmitted(false); setEditing(false);
    if (responses[name]) { setAvailability(responses[name].availability||{}); setReasons(responses[name].reasons||{}); setComments(responses[name].comments||""); }
    else { setAvailability({}); setReasons({}); setComments(""); }
  };

  const submit = async () => {
    const allItems = [...games, ...tournaments];
    if (!allItems.every(g => availability[g.id])) { alert("Please answer all games and tournament dates first."); return; }
    await saveR({ ...responses, [selectedPlayer]: { availability, reasons, comments, updatedAt: new Date().toISOString() } });
    setSubmitted(true); setEditing(false);
  };

  const getStats = (id) => {
    let yes=0,no=0,maybe=0,none=0;
    roster.forEach(p => { const a=responses[p]?.availability?.[id]; if(a==="yes")yes++; else if(a==="no")no++; else if(a==="maybe")maybe++; else none++; });
    return {yes,no,maybe,none};
  };
  const atRisk = (s) => s.yes < MIN_PLAYERS || s.maybe >= UNSURE_RISK;
  const responded = roster.filter(p=>responses[p]).length;
  const pending = roster.filter(p=>!responses[p]);
  const atRiskCount = games.filter(g=>atRisk(getStats(g.id))).length;

  // Mustangs brand colors
  const BLUE = "#1a56a0";
  const DARK_BLUE = "#0f3468";
  const GOLD = "#e8b800";
  const GOLD_LIGHT = "#f5c518";
  const GOLD_DIM = "#c9a000";
  const WHITE = "#ffffff";
  const OFF_WHITE = "#f0f4f8";
  const LIGHT_BLUE = "#dbe8f8";
  const TEXT_DARK = "#0d1e3a";
  const TEXT_MID = "#3a5278";

  const c = {
    app: { minHeight:"100vh", background: OFF_WHITE, color: TEXT_DARK, fontFamily:"'Georgia', serif" },

    hdr: {
      background: `linear-gradient(135deg, ${DARK_BLUE} 0%, ${BLUE} 60%, ${DARK_BLUE} 100%)`,
      padding:"0",
      borderBottom:`4px solid ${GOLD}`,
      overflow:"hidden",
      position:"relative",
    },
    hdrInner: {
      display:"flex", alignItems:"center", gap:"16px",
      padding:"16px 24px",
      position:"relative", zIndex:1,
    },
    hdrStripes: {
      position:"absolute", top:0, right:0, width:"200px", height:"100%",
      background:`repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`,
      pointerEvents:"none",
    },

    teamName: { fontSize:"1.25rem", fontWeight:"900", color:WHITE, letterSpacing:"0.5px", margin:0, lineHeight:1.2 },
    teamSub: { fontSize:"0.75rem", color:GOLD_LIGHT, fontFamily:"monospace", marginTop:"3px", letterSpacing:"0.5px" },

    tabs: {
      display:"flex",
      background: DARK_BLUE,
      borderBottom: `3px solid ${GOLD}`,
    },
    tab: (a) => ({
      padding:"13px 26px", border:"none",
      background: a ? BLUE : "transparent",
      color: a ? GOLD_LIGHT : "rgba(255,255,255,0.6)",
      fontWeight: a ? "700" : "400",
      cursor:"pointer", fontSize:"0.88rem",
      borderBottom: a ? `3px solid ${GOLD}` : "3px solid transparent",
      marginBottom:"-3px",
      transition:"all 0.15s",
      fontFamily:"'Georgia', serif",
      letterSpacing:"0.3px",
    }),

    wrap: { maxWidth:"820px", margin:"0 auto", padding:"24px 16px" },

    card: (extra={}) => ({
      background: WHITE,
      border:`1px solid #c8d8ec`,
      borderRadius:"10px",
      padding:"22px",
      marginBottom:"14px",
      boxShadow:"0 2px 8px rgba(15,52,104,0.08)",
      ...extra
    }),

    lbl: { display:"block", fontSize:"0.68rem", fontFamily:"monospace", color:BLUE, textTransform:"uppercase", letterSpacing:"1.8px", marginBottom:"7px", fontWeight:"700" },

    sel: {
      width:"100%", padding:"11px 14px",
      background: OFF_WHITE, border:`2px solid ${LIGHT_BLUE}`,
      borderRadius:"7px", color:TEXT_DARK, fontSize:"0.95rem",
      fontFamily:"'Georgia', serif", cursor:"pointer",
      outline:"none",
    },

    gc: (risk) => ({
      padding:"14px", borderRadius:"9px", marginBottom:"10px",
      border:`1px solid ${risk ? "#fca5a5" : "#c8d8ec"}`,
      background: risk ? "#fff5f5" : OFF_WHITE,
    }),

    avbtn: (s, active) => {
      const map = {
        yes: [active ? "#1a7a3c" : WHITE, active ? "#1a7a3c" : "#c8d8ec", active ? WHITE : TEXT_MID],
        maybe: [active ? "#b45309" : WHITE, active ? "#b45309" : "#c8d8ec", active ? WHITE : TEXT_MID],
        no: [active ? "#b91c1c" : WHITE, active ? "#b91c1c" : "#c8d8ec", active ? WHITE : TEXT_MID],
      };
      const [bg,bd,txt] = map[s];
      return {
        padding:"8px 16px", borderRadius:"6px",
        border:`2px solid ${bd}`,
        background: bg, color: txt,
        fontWeight: active ? "700" : "500",
        cursor:"pointer", fontSize:"0.83rem",
        transition:"all 0.12s", fontFamily:"monospace",
      };
    },

    inp: {
      padding:"8px 11px",
      background: WHITE, border:`1px solid #c8d8ec`,
      borderRadius:"6px", color:TEXT_DARK,
      fontSize:"0.83rem", fontFamily:"monospace",
      width:"100%", boxSizing:"border-box", outline:"none",
    },

    pill: (color, bg) => ({
      padding:"3px 10px", borderRadius:"20px", fontSize:"0.73rem",
      fontFamily:"monospace",
      background: bg || `${color}18`,
      color: color,
      border:`1px solid ${color}55`,
      fontWeight:"600",
    }),

    riskTag: (risk) => ({
      display:"inline-block", padding:"2px 9px", borderRadius:"12px",
      fontSize:"0.68rem", fontFamily:"monospace", fontWeight:"700",
      background: risk ? "#fee2e2" : "#dcfce7",
      color: risk ? "#b91c1c" : "#166534",
      border:`1px solid ${risk ? "#fca5a5" : "#86efac"}`,
      marginLeft:"8px",
    }),

    subbtn: {
      width:"100%", padding:"14px",
      background:`linear-gradient(135deg, ${BLUE}, ${DARK_BLUE})`,
      border:`2px solid ${GOLD}`,
      borderRadius:"9px", color:WHITE,
      fontSize:"1rem", fontWeight:"700",
      cursor:"pointer", fontFamily:"'Georgia', serif",
      marginTop:"6px",
      boxShadow:"0 4px 12px rgba(26,86,160,0.3)",
      transition:"all 0.15s",
    },

    smb: {
      padding:"6px 13px", borderRadius:"6px",
      border:`1px solid ${BLUE}`,
      background:"transparent", color:BLUE,
      cursor:"pointer", fontSize:"0.78rem",
      fontFamily:"monospace", fontWeight:"600",
    },
    db: {
      padding:"6px 13px", borderRadius:"6px",
      border:"1px solid #dc2626",
      background:"transparent", color:"#dc2626",
      cursor:"pointer", fontSize:"0.78rem",
      fontFamily:"monospace",
    },

    statCard: (col) => ({
      flex:"1", minWidth:"100px",
      background: WHITE,
      border:`1px solid #c8d8ec`,
      borderRadius:"10px", padding:"14px",
      textAlign:"center",
      boxShadow:"0 2px 8px rgba(15,52,104,0.08)",
      borderTop:`3px solid ${col}`,
    }),
  };

  if (!loaded) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:DARK_BLUE,color:GOLD_LIGHT,fontFamily:"monospace",gap:"12px"}}>
      <img src={`data:image/png;base64,${LOGO_B64}`} style={{width:40,height:40,borderRadius:"50%"}} />
      Loading...
    </div>
  );

  return (
    <div style={c.app}>
      {/* HEADER */}
      <div style={c.hdr}>
        <div style={c.hdrStripes} />
        <div style={c.hdrInner}>
          <img
            src={`data:image/png;base64,${LOGO_B64}`}
            style={{width:64,height:64,borderRadius:"50%",border:`3px solid ${GOLD}`,flexShrink:0,boxShadow:"0 2px 12px rgba(0,0,0,0.4)"}}
          />
          <div style={{flex:1}}>
            <div style={c.teamName}>Pittsford Mustangs Boys 2016 Gold</div>
            <div style={c.teamSub}>Summer 2026 Availability Tracker · {games.length} Games · {roster.length} Players</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:"2rem",fontWeight:"900",color:GOLD_LIGHT,fontFamily:"monospace",lineHeight:1}}>{responded}/{roster.length}</div>
            <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.6)",fontFamily:"monospace"}}>responded</div>
          </div>
        </div>
        {/* Gold bar accent */}
        <div style={{height:"4px",background:`linear-gradient(90deg, ${GOLD_DIM}, ${GOLD_LIGHT}, ${GOLD_DIM})`}} />
      </div>

      {/* TABS */}
      <div style={c.tabs}>
        <button style={c.tab(tab==="parent")} onClick={()=>setTab("parent")}>📋 Parent Form</button>
        <button style={c.tab(tab==="schedule")} onClick={()=>setTab("schedule")}>📅 Schedule</button>
        <button style={c.tab(tab==="setup")} onClick={()=>setTab("setup")}>⚙️ Setup</button>
      </div>

      {/* PARENT FORM */}
      {tab==="parent" && (
        <div style={c.wrap}>
          <div style={c.card({borderTop:`3px solid ${BLUE}`})}>
            <span style={c.lbl}>Select Your Player</span>
            <select style={c.sel} value={selectedPlayer} onChange={e=>selectPlayer(e.target.value)}>
              <option value="">— Choose your child's name —</option>
              {roster.map(p=><option key={p} value={p}>{p}{responses[p]?" ✓":""}</option>)}
            </select>
          </div>

          {selectedPlayer && !submitted && responses[selectedPlayer] && !editing && (
            <div style={c.card({borderTop:`3px solid #16a34a`, background:"#f0fdf4"})}>
              <div style={{color:"#166534",fontWeight:"700",marginBottom:"8px"}}>✅ {selectedPlayer}'s availability is saved.</div>
              <button style={c.smb} onClick={()=>setEditing(true)}>Update Responses</button>
            </div>
          )}

          {selectedPlayer && !submitted && (!responses[selectedPlayer]||editing) && (
            <>
              <div style={c.card()}>
                <div style={{fontSize:"0.82rem",color:TEXT_MID,marginBottom:"16px",lineHeight:"1.5"}}>
                  Mark each game for <strong style={{color:DARK_BLUE}}>{selectedPlayer.split(" ")[0]}</strong>. Add an optional note if they can't make it.
                </div>
                {/* TOURNAMENT SECTION */}
                <div style={{fontSize:"0.68rem",color:GOLD_DIM,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:"700",marginBottom:"10px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{flex:1,height:"1px",background:"#e8d080"}}></span>
                  🏆 Possible Tournaments
                  <span style={{flex:1,height:"1px",background:"#e8d080"}}></span>
                </div>
                {tournaments.map(t=>(
                  <div key={t.id} style={{...c.gc(false), background:"#fffdf0", border:"1px solid #e8d080"}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",alignItems:"center"}}>
                      <div>
                        <div style={{fontWeight:"700",color:TEXT_DARK,fontSize:"0.97rem"}}>{t.label}</div>
                        <div style={{fontSize:"0.76rem",color:TEXT_MID,fontFamily:"monospace",marginTop:"2px"}}>📅 {t.dates} · Possible tournament weekend</div>
                      </div>
                      <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
                        {["yes","maybe","no"].map(s=>(
                          <button key={s} style={c.avbtn(s,availability[t.id]===s)}
                            onClick={()=>setAvailability(a=>({...a,[t.id]:s}))}>
                            {s==="yes"?"✅ Available":s==="maybe"?"🤔 Maybe":"❌ Not Available"}
                          </button>
                        ))}
                      </div>
                    </div>
                    {availability[t.id]&&availability[t.id]!=="yes"&&(
                      <input style={{...c.inp,marginTop:"10px"}} placeholder="Optional reason"
                        value={reasons[t.id]||""} onChange={e=>setReasons(r=>({...r,[t.id]:e.target.value}))} />
                    )}
                  </div>
                ))}

                {/* RYDSL GAMES SECTION */}
                <div style={{fontSize:"0.68rem",color:TEXT_MID,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:"700",margin:"16px 0 10px",display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{flex:1,height:"1px",background:"#c8d8ec"}}></span>
                  ⚽ RYDSL Games
                  <span style={{flex:1,height:"1px",background:"#c8d8ec"}}></span>
                </div>
                {games.map(g=>(
                  <div key={g.id} style={c.gc(false)}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",alignItems:"flex-start"}}>
                      <div>
                        <div style={{fontWeight:"700",color:TEXT_DARK,fontSize:"0.97rem"}}>{g.day}, {fmt(g.date)}</div>
                        <div style={{fontSize:"0.76rem",color:TEXT_MID,fontFamily:"monospace",marginTop:"2px"}}>
                          {g.time} ·{" "}
                          <span style={{
                            padding:"1px 7px", borderRadius:"4px", fontSize:"0.7rem",
                            background: g.location==="Home" ? "#dbeafe" : "#fef9c3",
                            color: g.location==="Home" ? BLUE : "#92400e",
                            fontWeight:"700",
                          }}>{g.location}</span>
                          {" "}vs {g.opponent}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
                        {["yes","maybe","no"].map(s=>(
                          <button key={s} style={c.avbtn(s,availability[g.id]===s)}
                            onClick={()=>setAvailability(a=>({...a,[g.id]:s}))}>
                            {s==="yes"?"✅ Yes":s==="maybe"?"🤔 Maybe":"❌ Can't Go"}
                          </button>
                        ))}
                      </div>
                    </div>
                    {availability[g.id]&&availability[g.id]!=="yes"&&(
                      <input style={{...c.inp,marginTop:"10px"}} placeholder="Optional reason (vacation, tournament, etc.)"
                        value={reasons[g.id]||""} onChange={e=>setReasons(r=>({...r,[g.id]:e.target.value}))} />
                    )}
                  </div>
                ))}

                {/* COMMENTS BOX */}
                <div style={{marginTop:"16px"}}>
                  <div style={{fontSize:"0.68rem",color:TEXT_MID,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:"700",marginBottom:"8px"}}>💬 Additional Comments (optional)</div>
                  <textarea
                    style={{...c.inp, minHeight:"80px", resize:"vertical", lineHeight:"1.5"}}
                    placeholder="Anything else the coach should know? Scheduling conflicts, injuries, travel plans..."
                    value={comments}
                    onChange={e=>setComments(e.target.value)}
                  />
                </div>
              </div>
              <button style={c.subbtn} onClick={submit}>
                Submit Availability for {selectedPlayer.split(" ")[0]}
              </button>
            </>
          )}

          {submitted && (
            <div style={c.card({borderTop:`3px solid #16a34a`, background:"#f0fdf4", textAlign:"center"})}>
              <div style={{fontSize:"2.5rem",marginBottom:"8px"}}>✅</div>
              <div style={{fontWeight:"700",color:"#166534",fontSize:"1.15rem"}}>Submitted — thanks!</div>
              <div style={{color:"#4ade80" ,fontFamily:"monospace",fontSize:"0.8rem",marginTop:"6px",color:"#166534"}}>
                Coach will review responses before the schedule is finalized.
              </div>
              <button style={{...c.smb,marginTop:"14px"}} onClick={()=>{setSelectedPlayer("");setSubmitted(false);}}>
                Submit for Another Player
              </button>
            </div>
          )}

          {pending.length>0&&!selectedPlayer&&(
            <div style={c.card({borderTop:"3px solid #d97706", background:"#fffbeb"})}>
              <div style={{color:"#92400e",fontFamily:"monospace",fontSize:"0.8rem",marginBottom:"8px",fontWeight:"700"}}>
                ⏳ Still waiting on {pending.length} player{pending.length!==1?"s":""}:
              </div>
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                {pending.map(p=><span key={p} style={c.pill("#92400e","#fef3c7")}>{p}</span>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* COACH DASHBOARD */}
      {tab==="schedule" && (
        <div style={c.wrap}>
          <div style={{display:"flex",gap:"10px",marginBottom:"20px",flexWrap:"wrap"}}>
            {[
              {l:"Responded",v:`${responded}/${roster.length}`,col:BLUE},
              {l:"Pending",v:pending.length,col:"#d97706"},
              {l:"At-Risk Games",v:atRiskCount,col:atRiskCount>0?"#dc2626":"#16a34a"},
            ].map(s=>(
              <div key={s.l} style={c.statCard(s.col)}>
                <div style={{fontSize:"1.9rem",fontWeight:"900",color:s.col,fontFamily:"monospace"}}>{s.v}</div>
                <div style={{fontSize:"0.68rem",color:TEXT_MID,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1px"}}>{s.l}</div>
              </div>
            ))}
          </div>

          {games.map(game=>{
            const s=getStats(game.id); const risk=atRisk(s);
            return (
              <div key={game.id} style={c.card({borderTop:`3px solid ${risk?"#dc2626":BLUE}`, background: risk?"#fff5f5":WHITE})}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
                  <div>
                    <span style={{fontWeight:"700",color:TEXT_DARK,fontSize:"1rem"}}>{game.day}, {fmt(game.date)}</span>
                    <span style={c.riskTag(risk)}>{risk?"⚠️ AT RISK":"✅ OK"}</span>
                    <div style={{fontSize:"0.76rem",color:TEXT_MID,fontFamily:"monospace",marginTop:"3px"}}>
                      {game.time} ·{" "}
                      <span style={{padding:"1px 7px",borderRadius:"4px",fontSize:"0.7rem",
                        background:game.location==="Home"?"#dbeafe":"#fef9c3",
                        color:game.location==="Home"?BLUE:"#92400e",fontWeight:"700"}}>
                        {game.location}
                      </span>
                      {" "}vs {game.opponent}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:"7px",flexWrap:"wrap",alignItems:"center"}}>
                    <span style={c.pill("#16a34a")}>✅ {s.yes}</span>
                    <span style={c.pill("#d97706")}>🤔 {s.maybe}</span>
                    <span style={c.pill("#dc2626")}>❌ {s.no}</span>
                    {s.none>0&&<span style={c.pill("#6b7280")}>⏳ {s.none}</span>}
                  </div>
                </div>

                <div style={{display:"flex",gap:"5px",flexWrap:"wrap",marginTop:"12px"}}>
                  {roster.map(p=>{
                    const a=responses[p]?.availability?.[game.id];
                    const reason=responses[p]?.reasons?.[game.id];
                    const col=a==="yes"?"#16a34a":a==="no"?"#dc2626":a==="maybe"?"#d97706":"#9ca3af";
                    const bg=a==="yes"?"#dcfce7":a==="no"?"#fee2e2":a==="maybe"?"#fef3c7":"#f3f4f6";
                    return (
                      <div key={p} title={reason?`${p}: ${reason}`:p}
                        style={{padding:"3px 9px",borderRadius:"20px",fontSize:"0.74rem",fontFamily:"monospace",
                          background:bg,color:col,border:`1px solid ${col}55`,
                          cursor:reason?"help":"default",fontWeight:"600"}}>
                        {p.split(" ")[0]}{reason?" 💬":""}
                      </div>
                    );
                  })}
                </div>

                {roster.some(p=>responses[p]?.reasons?.[game.id])&&(
                  <div style={{marginTop:"10px",padding:"9px 12px",background:OFF_WHITE,borderRadius:"7px",fontSize:"0.78rem",fontFamily:"monospace",border:`1px solid #c8d8ec`}}>
                    {roster.filter(p=>responses[p]?.reasons?.[game.id]).map(p=>(
                      <div key={p} style={{color:TEXT_MID,marginBottom:"2px"}}>
                        <span style={{color:TEXT_DARK,fontWeight:"700"}}>{p}:</span> {responses[p].reasons[game.id]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div style={c.card()}>
            <div style={{fontSize:"0.68rem",color:TEXT_MID,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"9px",fontWeight:"700"}}>No Response Yet</div>
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
              {pending.length===0
                ?<span style={{color:"#16a34a",fontFamily:"monospace",fontSize:"0.85rem",fontWeight:"700"}}>🎉 All {roster.length} players have responded!</span>
                :pending.map(p=><span key={p} style={c.pill("#6b7280","#f3f4f6")}>{p}</span>)
              }
            </div>
          </div>

          {/* TOURNAMENT AVAILABILITY in dashboard */}
          <div style={c.card({borderTop:`3px solid ${GOLD}`})}>
            <div style={{fontSize:"0.68rem",color:GOLD_DIM,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"12px",fontWeight:"700"}}>🏆 Tournament Availability</div>
            {TOURNAMENTS_DEFAULT.map(t=>{
              let yes=0,no=0,maybe=0,none=0;
              roster.forEach(p=>{ const a=responses[p]?.availability?.[t.id]; if(a==="yes")yes++; else if(a==="no")no++; else if(a==="maybe")maybe++; else none++; });
              return (
                <div key={t.id} style={{padding:"10px 0",borderBottom:`1px solid #f0e88a`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px",alignItems:"center"}}>
                  <div>
                    <span style={{fontWeight:"700",color:TEXT_DARK}}>{t.label}</span>
                    <span style={{fontSize:"0.75rem",color:TEXT_MID,fontFamily:"monospace",marginLeft:"8px"}}>{t.dates}</span>
                  </div>
                  <div style={{display:"flex",gap:"7px"}}>
                    <span style={c.pill("#16a34a")}>✅ {yes}</span>
                    <span style={c.pill("#d97706")}>🤔 {maybe}</span>
                    <span style={c.pill("#dc2626")}>❌ {no}</span>
                    {none>0&&<span style={c.pill("#6b7280")}>⏳ {none}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* COMMENTS in dashboard */}
          {roster.some(p=>responses[p]?.comments) && (
            <div style={c.card({borderTop:`3px solid ${BLUE}`})}>
              <div style={{fontSize:"0.68rem",color:TEXT_MID,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"12px",fontWeight:"700"}}>💬 Parent Comments</div>
              {roster.filter(p=>responses[p]?.comments).map(p=>(
                <div key={p} style={{padding:"8px 0",borderBottom:`1px solid #e5ecf5`,fontSize:"0.82rem",fontFamily:"monospace"}}>
                  <span style={{color:TEXT_DARK,fontWeight:"700"}}>{p}:</span>{" "}
                  <span style={{color:TEXT_MID}}>{responses[p].comments}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SETUP */}
      {tab==="setup" && (
        <div style={c.wrap}>
          {/* Roster */}
          <div style={c.card({borderTop:`3px solid ${BLUE}`})}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
              <span style={c.lbl}>Roster ({roster.length} players)</span>
              {!editingRoster
                ?<button style={c.smb} onClick={()=>{setDraftRoster([...roster]);setEditingRoster(true);}}>Edit</button>
                :<div style={{display:"flex",gap:"8px"}}>
                  <button style={c.smb} onClick={async()=>{setRoster(draftRoster);await dbSet("mustangs_roster",draftRoster);setEditingRoster(false);}}>Save</button>
                  <button style={c.db} onClick={()=>setEditingRoster(false)}>Cancel</button>
                </div>
              }
            </div>
            {!editingRoster
              ?<div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                {roster.map(p=><span key={p} style={c.pill(BLUE, LIGHT_BLUE)}>{p}</span>)}
              </div>
              :<>
                {draftRoster.map((p,i)=>(
                  <div key={i} style={{display:"flex",gap:"7px",marginBottom:"7px"}}>
                    <input style={c.inp} value={p} onChange={e=>setDraftRoster(r=>{const n=[...r];n[i]=e.target.value;return n;})} />
                    <button style={c.db} onClick={()=>setDraftRoster(r=>r.filter((_,j)=>j!==i))}>✕</button>
                  </div>
                ))}
                <button style={{...c.smb,marginTop:"8px"}} onClick={()=>setDraftRoster(r=>[...r,"New Player"])}>+ Add Player</button>
              </>
            }
          </div>

          {/* Schedule */}
          <div style={c.card({borderTop:`3px solid ${GOLD}`})}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
              <span style={c.lbl}>Schedule ({games.length} games)</span>
              {!editingGames
                ?<button style={c.smb} onClick={()=>{setDraftGames(games.map(g=>({...g})));setEditingGames(true);}}>Edit</button>
                :<div style={{display:"flex",gap:"8px"}}>
                  <button style={c.smb} onClick={async()=>{setGames(draftGames);await dbSet("mustangs_games",draftGames);setEditingGames(false);}}>Save</button>
                  <button style={c.db} onClick={()=>setEditingGames(false)}>Cancel</button>
                </div>
              }
            </div>
            {games.map(g=>(
              <div key={g.id} style={{padding:"9px 0",borderBottom:`1px solid #e5ecf5`,fontFamily:"monospace",fontSize:"0.82rem",display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}}>
                <span style={{color:TEXT_DARK,fontWeight:"700",minWidth:"80px"}}>{g.day} {fmt(g.date)}</span>
                <span style={{color:TEXT_MID}}>{g.time}</span>
                <span style={{padding:"1px 8px",borderRadius:"4px",fontSize:"0.72rem",fontWeight:"700",
                  background:g.location==="Home"?"#dbeafe":"#fef9c3",
                  color:g.location==="Home"?BLUE:"#92400e"}}>
                  {g.location}
                </span>
                <span style={{color:TEXT_MID}}>vs {g.opponent}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div style={c.card({borderTop:`3px solid ${DARK_BLUE}`, background: DARK_BLUE})}>
            <div style={{fontSize:"0.68rem",color:GOLD_LIGHT,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"10px",fontWeight:"700"}}>📌 How to Share With Families</div>
            <div style={{fontFamily:"monospace",fontSize:"0.82rem",color:"rgba(255,255,255,0.85)",lineHeight:"1.9"}}>
              <div>1. Share the link to this Claude.ai conversation with all families</div>
              <div>2. Each parent opens <strong style={{color:GOLD_LIGHT}}>Parent Form</strong>, picks their child, marks each game</div>
              <div>3. You see live results in <strong style={{color:GOLD_LIGHT}}>Coach Dashboard</strong> as responses come in</div>
              <div>4. Parents can return anytime to update their answers</div>
            </div>
            <div style={{marginTop:"12px",padding:"10px 14px",background:"rgba(220,38,38,0.2)",borderRadius:"7px",border:"1px solid rgba(252,165,165,0.4)",color:"#fca5a5",fontSize:"0.78rem",fontFamily:"monospace"}}>
              ⚠️ Games flagged AT RISK = fewer than {MIN_PLAYERS} confirmed OR {UNSURE_RISK}+ marked "Maybe"
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
