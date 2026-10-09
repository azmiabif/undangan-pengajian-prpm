// ================================================================
// EDIT INFORMASI ACARA PER DUA PEKAN DI BAGIAN EVENT DI BAWAH INI
// Setelah diedit, unggah kembali file ini ke GitHub.
// ================================================================
const EVENT = {
  recipient: "Rekan Pemuda Muhammadiyah Tembok Luwung",
  number: "1.2/001/1448",
  date: "2026-09-25", // format YYYY-MM-DD
  day: "Jum’at Malam Sabtu",
  time: "Pukul 20.00 WIB s/d Selesai",
  place: "Masjid Al Furqon – Komplek TPQ 'Aisyiyah",
  speaker: "Ustadz Akhmad Syifa Utama, S.E.",
  theme: "",
  maps: "https://www.google.com/maps/search/?api=1&query=Masjid+Al+Furqon+Tembok+Luwung"
};

const $ = id => document.getElementById(id);
const original = {...EVENT};
function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat("id-ID", {day:"numeric", month:"long", year:"numeric"}).format(d);
}
function formatWeekday(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat("id-ID", {weekday:"long", day:"numeric", month:"long", year:"numeric"}).format(d);
}
function setText(id, value) { $(id).textContent = value || ""; }
function render(data) {
  setText("recipientName", data.recipient || "Rekan Pemuda Muhammadiyah Tembok Luwung");
  setText("letterNumber", data.number);
  setText("dayName", data.day);
  setText("eventDate", formatDate(data.date));
  setText("eventTime", data.time);
  setText("eventPlace", data.place);
  setText("speaker", data.speaker);
  setText("eventTheme", data.theme);
  $("themeLine").hidden = !data.theme.trim();
  setText("detailDate", formatWeekday(data.date));
  setText("detailTime", data.time.replace(/^Pukul\s*/i,"").replace(" s/d Selesai"," – selesai"));
  setText("detailSpeaker", data.speaker);
  setText("detailTheme", data.theme || "Pengajian rutin dan silaturahim");
  setText("detailPlace", (data.place || "").split("–")[0].trim());
  $("mapsLink").href = safeUrl(data.maps) || original.maps;
  document.title = `Undangan Pengajian - ${data.recipient || "Pemuda Muhammadiyah"}`;
}
function safeUrl(value) {
  try { const u = new URL(value); return ["http:","https:"].includes(u.protocol) ? u.href : null; }
  catch { return null; }
}
function readForm() {
  return {
    recipient:$("inputRecipient").value.trim(), number:$("inputNumber").value.trim(),
    date:$("inputDate").value, day:$("inputDay").value.trim(), time:$("inputTime").value.trim(),
    place:$("inputPlace").value.trim(), speaker:$("inputSpeaker").value.trim(),
    theme:$("inputTheme").value.trim(), maps:$("inputMaps").value.trim()
  };
}
function fillForm(data) {
  $("inputRecipient").value=data.recipient; $("inputNumber").value=data.number;
  $("inputDate").value=data.date; $("inputDay").value=data.day; $("inputTime").value=data.time;
  $("inputPlace").value=data.place; $("inputSpeaker").value=data.speaker;
  $("inputTheme").value=data.theme; $("inputMaps").value=data.maps;
}
// Personalisasi penerima lewat link, contoh: ?untuk=Ahmad%20Fauzi
const params = new URLSearchParams(window.location.search);
const personalizedRecipient = params.get("untuk");
const initialEvent = personalizedRecipient ? {...EVENT, recipient: personalizedRecipient} : EVENT;
render(initialEvent); fillForm(initialEvent);
$("editToggle").addEventListener("click",()=>{$("editPanel").hidden=false;});
$("closeEdit").addEventListener("click",()=>{$("editPanel").hidden=true;});
$("applyBtn").addEventListener("click",()=>{const data=readForm();render(data);$("editPanel").hidden=true;});
$("resetBtn").addEventListener("click",()=>{fillForm(original);render(original);});
$("menuBtn").addEventListener("click",()=>$("navLinks").classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>$("navLinks").classList.remove("open")));
function inviteText() {
  const d=readForm();
  return `Assalamu’alaikum Warahmatullahi Wabarakatuh.\n\nUndangan Pengajian Rutin Pemuda Muhammadiyah Ranting Tembok Luwung\n\nKepada Yth. ${d.recipient}\nHari: ${d.day}\nTanggal: ${formatDate(d.date)}\nWaktu: ${d.time}\nTempat: ${d.place}\nMubaligh: ${d.speaker}${d.theme ? "\nTema: "+d.theme : ""}\n\nMohon kehadirannya. Jazakumullahu khairan.\nFastabiqul Khairat.`;
}
$("waBtn").addEventListener("click",()=>window.open("https://wa.me/?text="+encodeURIComponent(inviteText()+"\n\nBuka undangan lengkap: "+window.location.href),"_blank","noopener"));
$("shareBtn").addEventListener("click",async()=>{
  const data={title:"Undangan Pengajian Pemuda Muhammadiyah",text:inviteText(),url:window.location.href};
  if(navigator.share){try{await navigator.share(data);}catch(e){}}
  else if(navigator.clipboard){try{await navigator.clipboard.writeText(window.location.href);alert("Link undangan disalin. Silakan tempel di WhatsApp.");}catch(e){prompt("Salin link undangan ini:",window.location.href);}}
  else prompt("Salin link undangan ini:",window.location.href);
});
$("calendarBtn").addEventListener("click",()=>{
  const d=readForm();
  if(!d.date){alert("Isi tanggal acara terlebih dahulu.");return;}
  const start=d.date.replaceAll("-","")+"T130000";
  const end=d.date.replaceAll("-","")+"T150000";
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//PRPM Tembok Luwung//Undangan//ID","BEGIN:VEVENT","UID:"+Date.now()+"@prpm-tembokluwung","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),"DTSTART:"+start,"DTEND:"+end,"SUMMARY:"+("Pengajian Pemuda Muhammadiyah Tembok Luwung"),"LOCATION:"+d.place.replaceAll(",","\\,"),"DESCRIPTION:"+inviteText().replace(/\n/g,"\\n"),"END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="pengajian-pemuda-muhammadiyah.ics";a.click();URL.revokeObjectURL(url);
});
