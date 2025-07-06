/* ========= LIGHT / DARK ========== */
const themeBtn=document.getElementById("themeToggle");
if(localStorage.getItem("zenTheme")==="light"){
  document.body.classList.add("light");themeBtn.textContent="☀️";
}
themeBtn.onclick=()=>{
  const light=document.body.classList.toggle("light");
  themeBtn.textContent=light?"☀️":"🌙";
  localStorage.setItem("zenTheme",light?"light":"dark");
};

/* ========= SIDEBAR TOGGLE ========= */
const side=document.getElementById("sidebar");
document.getElementById("ham").onclick=()=>{
  side.classList.toggle("closed");side.classList.toggle("open");
  document.body.classList.toggle("sidebar-closed");
};

/* ========= PAGES NAV ============== */
const pages={home:homeSection,func:funcSection,about:aboutSection};
function show(k){Object.values(pages).forEach(p=>p.classList.add("hidden"));pages[k].classList.remove("hidden");}

document.querySelectorAll("[data-page]").forEach(link=>{
  link.onclick=e=>{
    e.preventDefault();
    document.querySelectorAll("[data-page]").forEach(l=>l.classList.remove("active"));
    link.classList.add("active");
    show(link.dataset.page); if(link.dataset.page==="func") renderList();
    side.classList.add("closed");document.body.classList.add("sidebar-closed");
  };
});

/* ========= BUG LIST CARDS ========= */
let rendered=false;
function renderList(){
  if(rendered) return;
  const wrap=document.getElementById("cardWrap");
  bugData.forEach((b,i)=>{
    wrap.insertAdjacentHTML("beforeend",`
      <div class="card">
        <h3>${b.title}</h3>
        <p>Crash func script #${i+1}</p>
        <div style="display:flex;align-items:center;gap:.6rem">
          <span class="badge-get">GET</span>
          <span class="ready">Ready</span>
        </div>
        <button class="card-btn" onclick="openModal(${i})" style="display:none"></button>
      </div>`);
    wrap.lastElementChild.onclick=()=>openModal(i);
  });
  rendered=true; lucide.createIcons();
}

/* ========= MODAL ========= */
const modal=document.getElementById("modal");
function openModal(i){
  document.getElementById("modalTitle").textContent=bugData[i].title;
  document.getElementById("endpointText").textContent=`func://${bugData[i].title.toLowerCase().replace(/\s+/g,'_')}`;
  document.getElementById("funcArea").value=atob(bugData[i].funcB64);
  modal.classList.remove("hidden"); lucide.createIcons();
}
function closeModal(){modal.classList.add("hidden");}
function copyEndpoint(){
  navigator.clipboard.writeText(document.getElementById("endpointText").textContent)
    .then(()=>toast("✅ endpoint copied"));
}
function copyFunc(){
  navigator.clipboard.writeText(document.getElementById("funcArea").value)
    .then(()=>toast("✅ func copied"));
}

/* ========= SEARCH ========= */
document.getElementById("search").oninput=e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    const t=c.querySelector("h3").textContent.toLowerCase();
    c.style.display=t.includes(q)?"flex":"none";
  });
};

/* ========= TOAST ========== */
function toast(msg){
  const box=document.getElementById("toastContainer");
  const d=document.createElement("div");d.className="toast";d.textContent=msg;box.appendChild(d);
  setTimeout(()=>{d.style.opacity=0;setTimeout(()=>d.remove(),450)},2500);
}

/* ========= INIT ========== */
show("home"); lucide.createIcons();