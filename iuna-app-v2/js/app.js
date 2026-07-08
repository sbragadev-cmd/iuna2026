(function(){
  const cfg = window.IUNA_CONFIG || {};
  const MS_DAY = 86400000;
  function todayBR(){ return new Date(new Date().toLocaleString('en-US',{timeZone:'America/Sao_Paulo'})); }
  function gestation(){
    const today = todayBR(); today.setHours(0,0,0,0);
    const base = new Date(`${cfg.referenceDate || '2026-07-07'}T12:00:00-03:00`);
    const diff = Math.floor((today - base)/MS_DAY);
    const total = (cfg.referenceWeeks || 20) * 7 + diff;
    return { weeks: Math.floor(total/7), days: ((total%7)+7)%7, totalDays: total };
  }
  function dueDays(){
    const today = todayBR(); today.setHours(0,0,0,0);
    const due = new Date(`${cfg.dueDate || '2026-11-24'}T12:00:00-03:00`);
    return Math.max(0, Math.ceil((due-today)/MS_DAY));
  }
  function setText(sel, value){ document.querySelectorAll(sel).forEach(el=>el.textContent=value); }
  function initBase(){
    const g = gestation();
    const label = `${g.weeks} semanas${g.days ? ` e ${g.days} dias` : ''}`;
    setText('[data-gestation-label]', label);
    setText('[data-due-date]', new Date(`${cfg.dueDate || '2026-11-24'}T12:00:00-03:00`).toLocaleDateString('pt-BR'));
    setText('[data-days-left]', `${dueDays()} dias`);
    setText('[data-mom-name]', cfg.momName || 'Mamãe');
    setText('[data-dad-name]', cfg.dadName || 'Papai');
    const msg = cfg.weeklyMessages?.[g.weeks] || 'A Iúna está crescendo e transformando cada dia em uma lembrança especial.';
    setText('[data-week-message]', msg);
    document.querySelectorAll('[data-action="print"]').forEach(btn=>btn.addEventListener('click',()=>window.print()));
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.querySelector('.sidebar');
    if(menuBtn && sidebar){ menuBtn.addEventListener('click',()=>sidebar.classList.toggle('is-open')); }
    if('serviceWorker' in navigator){ navigator.serviceWorker.register('/service-worker.js').catch(()=>{}); }
  }
  window.IUNA_APP = { gestation, dueDays, todayBR };
  document.addEventListener('DOMContentLoaded', initBase);
})();
