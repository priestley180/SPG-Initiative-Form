'use strict';
const formConfig = {
 type: 'intake',
 title: 'Intake Form',
 storageKey: 'spg-intake-v1',
 sections: [{
  title: 'Intake Form',
  navLabel: 'Intake questions',
  note: 'As part of the Product Operating Model, we want to ensure focus on outcome-based product work, continuous discovery, and empowered product teams. To achieve this, any new feature or improvement request must include a clear problem statement and success metrics, which can be assessed by the product team before committing to delivery.',
  fieldsAsTable: true,
  fields: [
   'Submitted by:',
   'What problem or opportunity have you identified?',
   'Who is affected?',
   'What evidence do you have that we should solve this problem?',
   'What business or user outcome is this aligned to?',
   'What does success look like?',
   'Any other information we should know?'
  ]
 }],
 hints: {
  'What evidence do you have that we should solve this problem?': ['Product data & insight', 'Competitor analysis', 'Operational need', 'User feedback'],
  'Any other information we should know?': ['Dependencies', 'Legal or compliance issue', 'Commercial agreements', 'Timelines']
 }
};

const sections = formConfig.sections;
const hints = formConfig.hints;
const formType = formConfig.type || 'initiative';
const formTitle = formConfig.title || 'Initiative Opportunity Brief';
const key=formConfig.storageKey || 'spg-initiative-v1'; let data={}; const status=document.querySelector('#status');
try{data=JSON.parse(localStorage.getItem(key)||'{}')}catch{status.textContent='Browser storage unavailable. Download drafts to save.'}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fieldHint(label) {
 const hint = hints[label];
 return Array.isArray(hint) ? `<div class="hint">Examples:<ul>${hint.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></div>` : hint ? `<p class="hint">${esc(hint)}</p>` : '';
}
function field(s,label,compact=false){const id=`${s}:${label}`,options=label==='Current lifecycle stage'?sections.slice(1).map(s=>s.title):label==='Next step'?['Scale','Iterate','Monitor','Stop']:null;return `<label class="field${compact?' table-field':''}"><span${compact?' class="visually-hidden"':''}>${esc(label)}</span>${compact && Array.isArray(hints[label])?'':fieldHint(label)}${options?`<select aria-label="${esc(label)}" data-id="${esc(id)}"><option value="">Select…</option>${options.map(v=>`<option ${data[id]===v?'selected':''}>${esc(v)}</option>`).join('')}</select>`:`<textarea aria-label="${esc(label)}" data-id="${esc(id)}">${esc(data[id])}</textarea>`}</label>`}
function overviewTable(section, index, editing) {
 return `<div class="table-wrap"><table class="outcome-table overview-table"${editing ? '' : ' border="1"'}><thead><tr><th scope="col">Field</th><th scope="col">Details</th></tr></thead><tbody>${section.fields.map(label => `<tr><th scope="row">${esc(label)}${Array.isArray(hints[label])?fieldHint(label):''}</th><td>${editing ? field(index,label,true) : esc(data[`${index}:${label}`]).replace(/\n/g,'<br>')}</td></tr>`).join('')}</tbody></table></div>`;
}
function outcomeTable(section, index, editing) {
 if (!section.outcomes) return '';
 const legacyLevel = data[`${index}:Level`];
 return `<h3>What outcome does this affect?</h3>${legacyLevel ? `<p>Previously saved level: ${esc(legacyLevel)}</p>` : ''}<div class="table-wrap"><table class="outcome-table"${editing ? '' : ' border="1"'}><thead><tr><th scope="col">Level</th><th scope="col">Details</th></tr></thead><tbody>${section.outcomes.map(label => `<tr><th scope="row">${esc(label)}</th><td>${editing ? `<textarea aria-label="${esc(label)}" data-id="${index}:${esc(label)}">${esc(data[`${index}:${label}`])}</textarea>` : esc(data[`${index}:${label}`]).replace(/\n/g, '<br>')}</td></tr>`).join('')}</tbody></table></div>`;
}
function entryTable([title, fields], section, tableIndex, editing) {
 const id = `${section}:table:${tableIndex}`;
 // Keep the existing entry-first draft format; only the presentation is transposed.
 const entries = data[id] || (editing ? [fields.map(() => '')] : []);
 return `<h3>${esc(title)}</h3><div class="table-wrap"><table class="entry-table"${editing ? '' : ' border="1"'}><thead><tr><th scope="col">Field</th>${entries.map((_, entry) => `<th scope="col">Entry ${entry+1}</th>`).join('')}</tr></thead><tbody>${fields.map((label, fieldIndex) => `<tr><th scope="row">${esc(label)}</th>${entries.map((entry, entryIndex) => `<td>${editing ? `<textarea aria-label="${esc(label)} column ${entryIndex+1}" data-table="${id}" data-row="${entryIndex}" data-col="${fieldIndex}">${esc(entry[fieldIndex])}</textarea>${fieldIndex === fields.length - 1 ? `<button type="button" data-remove="${id}" data-row="${entryIndex}" aria-label="Remove column ${entryIndex+1}">Remove column</button>` : ''}` : esc(entry[fieldIndex]).replace(/\n/g, '<br>')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${editing ? `<button type="button" class="add" data-add="${id}" data-cols="${fields.length}">+ Add column</button>` : ''}`;
}
function render(){if(document.querySelector('#nav'))document.querySelector('#nav').innerHTML=sections.map((s,i)=>`<a href="#stage-${i}">${s.navLabel || (i===0?'Overview':s.title)}</a>`).join('');document.querySelector('#form').innerHTML=sections.map((s,i)=>`<section id="stage-${i}"><div class="section-num">${i===0?'START HERE':`STAGE 0${i}`}</div><h2>${s.title}</h2>${s.note?`<p class="hint">${s.note}</p>`:''}${s.fieldsAsTable?overviewTable(s,i,true):(s.fields||[]).map(l=>field(i,l)).join('')}${(s.tables||[]).map((table,t)=>entryTable(table,i,t,true)).join('')}${outcomeTable(s,i,true)}${s.afterHeading?`<h3>${esc(s.afterHeading)}</h3>`:''}${s.afterNote?`<p>${esc(s.afterNote)}</p>`:''}${(s.after||[]).map(l=>field(i,l)).join('')}${s.checks?`<div class="checkpoint"><h3>Checkpoint: ${s.checkpoint}</h3>${s.checks.map((c,n)=>`<label class="check"><input type="checkbox" data-id="${i}:check:${n}" ${data[`${i}:check:${n}`]?'checked':''}>${esc(c)}</label>`).join('')}</div>`:''}</section>`).join('')}
function persist(){try{localStorage.setItem(key,JSON.stringify(data));status.textContent='Draft saved in this browser'}catch{status.textContent='Could not save locally. Download your draft.'}}
document.querySelector('#form').addEventListener('input',e=>{const el=e.target;if(el.dataset.id)data[el.dataset.id]=el.type==='checkbox'?el.checked:el.value;if(el.dataset.table){const id=el.dataset.table;data[id]??=[sections[Number(id.split(':')[0])].tables[Number(id.split(':')[2])][1].map(()=> '')];data[id][Number(el.dataset.row)][Number(el.dataset.col)]=el.value}persist()});
document.querySelector('#form').addEventListener('click',e=>{const el=e.target;if(el.dataset.add){const id=el.dataset.add;data[id]??=[Array(Number(el.dataset.cols)).fill('')];data[id].push(Array(Number(el.dataset.cols)).fill(''));persist();render()}if(el.dataset.remove){const id=el.dataset.remove;data[id]??=[[]];data[id].splice(Number(el.dataset.row),1);persist();render()}});
function completed(){return sections.map((s,i)=>`<h1>${esc(s.title)}</h1>${s.note?`<p>${esc(s.note)}</p>`:''}${s.fieldsAsTable?overviewTable(s,i,false):(s.fields||[]).map(l=>`<h3>${esc(l)}</h3><p>${esc(data[`${i}:${l}`]).replace(/\n/g,'<br>')}</p>`).join('')}${(s.tables||[]).map((table,t)=>entryTable(table,i,t,false)).join('')}${outcomeTable(s,i,false)}${s.afterHeading?`<h3>${esc(s.afterHeading)}</h3>`:''}${s.afterNote?`<p>${esc(s.afterNote)}</p>`:''}${(s.after||[]).map(l=>`<h3>${esc(l)}</h3><p>${esc(data[`${i}:${l}`]).replace(/\n/g,'<br>')}</p>`).join('')}${s.checks?`<h3>Checkpoint: ${esc(s.checkpoint)}</h3><ul>${s.checks.map((c,n)=>`<li>${data[`${i}:check:${n}`]?'☑':'☐'} ${esc(c)}</li>`).join('')}</ul>`:''}`).join('')}
function download(content,type,name){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
document.querySelector('#save').onclick=()=>download(JSON.stringify({version:1,formType,data},null,2),'application/json',`${formType}-draft.json`);
document.querySelector('#export').onclick=()=>download(`<!doctype html><html lang="en"><meta charset="utf-8"><title>${esc(formTitle)}</title><body>${completed()}</body></html>`,'text/html',`${formType}.html`);
document.querySelector('#copy').onclick=async()=>{const html=completed(),div=document.createElement('div');div.innerHTML=html;try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([div.innerText||div.textContent],{type:'text/plain'})})]);status.textContent='Copied. Paste into Confluence in edit mode.'}catch{status.textContent='Clipboard unavailable. Open downloaded HTML and copy its contents.'}};
document.querySelector('#import').onchange=async e=>{try{const parsed=JSON.parse(await e.target.files[0].text());if((parsed.formType || 'initiative')!==formType||parsed.version!==1||!parsed.data||typeof parsed.data!=='object'||Array.isArray(parsed.data))throw Error();for(const [k,v] of Object.entries(parsed.data)){if(k.includes(':table:')){if(!Array.isArray(v)||v.some(r=>!Array.isArray(r)||r.some(c=>typeof c!=='string')))throw Error()}else if(typeof v!=='string'&&typeof v!=='boolean')throw Error()}data=parsed.data;persist();render()}catch{status.textContent='Could not open draft. Choose a downloaded draft for this form.'}e.target.value=''};
render();

// Print a read-only snapshot of the same content copied into Confluence.
document.querySelector('#pdf').onclick = () => {
 const preview = window.open('', '_blank');
 if (!preview) { status.textContent = 'Allow pop-ups to open the PDF preview, then try again.'; return; }
 const title = data[formConfig.titleField || '0:Initiative title'] || formTitle;
 preview.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head><body><div class="print-toolbar"><p>Choose <strong>Save as PDF</strong> in the print dialog. For a clean page, turn off browser headers and footers. For many columns, choose landscape.</p><button type="button" id="print-again">Print / Save as PDF</button></div><article><h1 class="page-title">${esc(title)}</h1>${completed().replace(/<h1>/g,'<h2>').replace(/<\/h1>/g,'</h2>')}</article></body></html>`);
 preview.document.close();
 preview.document.querySelector('#print-again').onclick = () => preview.print();
 const stylesheet = preview.document.createElement('link');
 stylesheet.rel = 'stylesheet';
 stylesheet.onload = () => { preview.focus(); preview.print(); };
 stylesheet.onerror = () => { status.textContent = 'PDF preview styles could not load. Please try again.'; };
 stylesheet.href = new URL('print.css', document.baseURI).href;
 preview.document.head.append(stylesheet);
 status.textContent = 'PDF preview opened. Choose Save as PDF in the print dialog.';
};

const clearDialog = document.querySelector('#clear-dialog');
document.querySelector('#clear').onclick = () => clearDialog.showModal();
document.querySelector('#clear-cancel').onclick = () => clearDialog.close();
document.querySelector('#clear-confirm').onclick = () => {
 try {
  localStorage.removeItem(key);
 } catch {
  clearDialog.close();
  status.textContent = 'Could not clear the saved browser draft. Your answers have been kept. Please try again.';
  return;
 }
 data = {};
 clearDialog.close();
 render();
 document.querySelector('main').scrollTop = 0;
 status.textContent = 'Form and saved browser draft cleared.';
};
