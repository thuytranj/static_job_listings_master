(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();document.getElementById("background");const g=document.getElementById("job-listings"),f=document.getElementById("filter-container"),h=document.getElementById("filter-tags-container");let s=[];async function F(){try{const t=await fetch("data.json");if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){console.error("Error fetching job list:",t)}}const m=await F();console.log(m);function b(t){const{company:n,logo:c,new:d,featured:e,position:o,role:i,level:y,postedAt:w,contract:L,location:E,languages:j,tools:C}=t,l=document.createElement("div");l.classList.add("flex","p-6","items-center","gap-4","w-full","bg-white","rounded-[5px]","shadow-lg","border-l-4","max-sm:flex-col","max-sm:items-start"),l.style.borderLeftColor=e?"var(--color-green-400)":"transparent",l.innerHTML=`
      <img src="${c}" alt="avartar" class="w-15 h-15 rounded-full"> 

      <div class="flex flex-col gap-1.5">
        <div class="flex gap-3 items-center" id="job-info">
          <p class="text-[var(--color-green-400)] font-bold">${n}</p>
        </div>

        <p class="font-bold cursor-pointer hover:text-[var(--color-green-400)]">${o}</p>

        <div class="flex gap-2 text-[var(--color-gray-400)]">
          <p>${w}</p> 
          &bull;
          <p>${L}</p>
          &bull;
          <p>${E}</p>
        </div>
      </div>

      <div class="flex flex-auto gap-2 justify-end flex-wrap max-sm:justify-start max-sm:gap-3" id="job-tags"></div>
  `;const v=l.querySelector("#job-info"),T=l.querySelector("#job-tags");if(d){const r=document.createElement("button");r.classList.add("bg-[var(--color-green-400)]","text-white","px-1.5","py-0.5","rounded-[10px]","font-bold","cursor-pointer","flex","items-center","justify-center"),r.textContent="NEW!",v.appendChild(r)}if(e){const r=document.createElement("button");r.classList.add("bg-[var(--color-green-900)]","text-white","px-1.5","py-0.5","rounded-[10px]","font-bold","cursor-pointer","flex","items-center","justify-center"),r.textContent="FEATURED",v.appendChild(r)}[i,y,...j,...C].forEach(r=>{const u=document.createElement("button");u.classList.add("bg-[var(--color-green-50)]","text-[var(--color-green-400)]","p-1.5","rounded-[5px]","font-bold","cursor-pointer","hover:bg-[var(--color-green-400)]","hover:text-white"),u.textContent=r,u.addEventListener("click",()=>{if(!s.includes(r)){s.push(r);const a=document.createElement("div");a.classList.add("flex"),a.innerHTML=`
          <div
            class="bg-[var(--color-green-50)] text-[var(--color-green-400)] p-1.5 rounded-tl-[5px] rounded-bl-[5px] font-bold">${r}</div>

          <div class="text-white bg-[var(--color-green-400)] hover:bg-black flex items-center justify-center p-2 cursor-pointer rounded-tr-[5px] rounded-br-[5px]" id="clear-tag"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path fill="#FFF" fill-rule="evenodd"
              d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z" />
          </svg></div>
        `,a.querySelector("#clear-tag").addEventListener("click",()=>{s=s.filter(B=>B!==r),a.remove(),s.length==0?(f.classList.add("hidden"),p()):x()}),h.appendChild(a),x()}document.querySelector("#clear-btn").addEventListener("click",()=>{s=[],h.innerHTML="",f.classList.add("hidden"),p()})}),T.appendChild(u)}),g.appendChild(l)}function p(){g.innerHTML="",m.forEach(t=>{b(t)})}function x(){g.innerHTML="",f.classList.remove("hidden"),f.classList.add("flex"),m.forEach(t=>{const n=[t.role,t.level,...t.languages,...t.tools];s.every(c=>n.includes(c))&&b(t)})}p();
