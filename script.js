/* ===== THEME TOGGLE ===== */
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("zenTheme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☀️";
}
themeBtn.onclick = () => {
  const light = document.body.classList.toggle("light");
  themeBtn.textContent = light ? "☀️" : "🌙";
  localStorage.setItem("zenTheme", light ? "light" : "dark");
};

/* ===== SIDEBAR ===== */
const sidebar = document.getElementById("sidebar");
document.getElementById("ham").onclick = () => {
  sidebar.classList.toggle("closed");
  sidebar.classList.toggle("open");
  document.body.classList.toggle("sidebar-closed");
};

/* ===== NAVIGATION ===== */
const pages = {
  home : document.getElementById("homeSection"),
  func : document.getElementById("funcSection"),
  about: document.getElementById("aboutSection")
};
function showPage(key){
  Object.values(pages).forEach(p=>p.classList.add("hidden"));
  pages[key].classList.remove("hidden");
  if(key==="func") renderBugs();
  lucide.createIcons();            // redraw icons after load
}
document.querySelectorAll(".sidebar a").forEach(a=>{
  a.onclick = e=>{
    e.preventDefault();
    document.querySelectorAll(".sidebar a").forEach(l=>l.classList.remove("active"));
    a.classList.add("active");
    showPage(a.dataset.page);
    sidebar.classList.add("closed");document.body.classList.add("sidebar-closed");
  };
});

/* ===== BUG LIST ===== */
function renderBugs(){
  if(window.__bugDone) return;
  const wrap = document.getElementById("bugList");
  (window.bugData||[]).forEach((b,i)=>{
    const div = document.createElement("div");
    div.className="bug";
    div.innerHTML=`<span>${b.title}</span>
      <button onclick="copyBug(${i})">Copy</button>`;
    wrap.appendChild(div);
  });
  window.__bugDone=true;
}
window.copyBug = i=>{
  const txt = atob(bugData[i].funcB64);
  navigator.clipboard.writeText(txt)
    .then(()=>toast("✅ Copied"))
    .catch(()=>toast("❌ gagal",true));
};

/* ===== TOAST ===== */
function toast(msg,err=false){
  const box = document.getElementById("toastContainer");
  const d   = document.createElement("div");
  d.className="toast"; if(err)d.style.borderLeftColor="red";
  d.textContent=msg; box.appendChild(d);
  setTimeout(()=>{d.style.opacity=0;setTimeout(()=>d.remove(),450)},2600);
}

/* ===== INIT ===== */
showPage("home");
lucide.createIcons();