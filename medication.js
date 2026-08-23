(() => {
  "use strict";

  const medications = [
    {id:"dexmedetomidine",name:"Dexmedetomidine",brand:"Precedex",category:"Sedation",concentration:"400 mcg / 100 mL NS",amount:400,amountUnit:"mcg",volume:100,initial:"1 mcg/kg bolus over 10 min, then 0.2 mcg/kg/hr",titrate:"0.1 mcg/kg/hr",interval:"2–5 min",max:"1.5 mcg/kg/hr",notes:"",calc:{doseUnit:"mcg/kg/hr",defaultDose:0.2,weight:true}},
    {id:"diltiazem",name:"Diltiazem",brand:"Cardizem",category:"Cardiac / BP",concentration:"125 mg / 125 mL D5W",amount:125,amountUnit:"mg",volume:125,initial:"5 mg/hr",titrate:"5 mg/hr",interval:"2–5 min",max:"20 mg/hr",notes:"Mix 25 mL (125 mg) of diltiazem into 100 mL D5W for a final volume of 125 mL.",calc:{doseUnit:"mg/hr",defaultDose:5,weight:false}},
    {id:"dobutamine",name:"Dobutamine",brand:"",category:"Vasopressors / Inotropes",concentration:"500 mg / 125 mL D5W",amount:500,amountUnit:"mg",volume:125,initial:"2.5 mcg/kg/min",titrate:"2.5 mcg/kg/min",interval:"2–5 min",max:"20 mcg/kg/min",notes:"Premixed.",calc:{doseUnit:"mcg/kg/min",defaultDose:2.5,weight:true}},
    {id:"dopamine",name:"Dopamine",brand:"",category:"Vasopressors / Inotropes",concentration:"400 mg / 250 mL D5W",amount:400,amountUnit:"mg",volume:250,initial:"5 mcg/kg/min",titrate:"2 mcg/kg/min",interval:"1–5 min",max:"20 mcg/kg/min (PIV max 10 mcg/kg/min)",notes:"Premixed.",calc:{doseUnit:"mcg/kg/min",defaultDose:5,weight:true}},
    {id:"epinephrine",name:"Epinephrine",brand:"",category:"Vasopressors / Inotropes",concentration:"2 mg / 250 mL D5W",amount:2,amountUnit:"mg",volume:250,initial:"0.1 mcg/kg/min",titrate:"0.2 mcg/kg/min",interval:"1–5 min",max:"2 mcg/kg/min (PIV max 0.5 mcg/kg/min)",notes:"",calc:{doseUnit:"mcg/kg/min",defaultDose:0.1,weight:true}},
    {id:"esmolol",name:"Esmolol",brand:"",category:"Cardiac / BP",concentration:"2500 mg / 250 mL NS",amount:2500,amountUnit:"mg",volume:250,initial:"50 mcg/kg/min",titrate:"5 mcg/kg/min",interval:"2–5 min",max:"200 mcg/kg/min",notes:"Premixed.",calc:{doseUnit:"mcg/kg/min",defaultDose:50,weight:true}},
    {id:"glucagon",name:"Glucagon",brand:"",category:"Toxicology",concentration:"10 mg / 100 mL D5W",amount:10,amountUnit:"mg",volume:100,initial:"3 mg/hr",titrate:"1 mg/hr",interval:"15 min",max:"10 mg/hr",notes:"For beta-blocker or calcium-channel blocker toxicity associated with hypotension unresponsive to standard measures.",calc:{doseUnit:"mg/hr",defaultDose:3,weight:false}},
    {id:"ketamine-infusion",name:"Ketamine",brand:"",category:"Sedation",concentration:"500 mg / 500 mL D5W",amount:500,amountUnit:"mg",volume:500,initial:"0.05 mg/kg/hr",titrate:"0.05 mg/kg/hr",interval:"5–15 min",max:"2 mg/kg/hr",notes:"",calc:{doseUnit:"mg/kg/hr",defaultDose:0.05,weight:true}},
    {id:"labetalol",name:"Labetalol",brand:"",category:"Cardiac / BP",concentration:"500 mg / 250 mL D5W",amount:500,amountUnit:"mg",volume:250,initial:"2 mg/min",titrate:"1 mg/min",interval:"5 min",max:"6 mg/min",notes:"",calc:{doseUnit:"mg/min",defaultDose:2,weight:false}},
    {id:"lorazepam",name:"Lorazepam",brand:"Ativan",category:"Sedation",concentration:"50 mg / 510 mL D5W",amount:50,amountUnit:"mg",volume:510,initial:"1 mg/hr",titrate:"1 mg/hr",interval:"15 min",max:"10 mg/hr",notes:"Remove 10 mL of D5W from bag prior to addition of 20 mL of lorazepam. Assign 12-hour expiration.",calc:{doseUnit:"mg/hr",defaultDose:1,weight:false}},
    {id:"midazolam-infusion",name:"Midazolam",brand:"Versed",category:"Sedation",concentration:"100 mg / 100 mL NS",amount:100,amountUnit:"mg",volume:100,initial:"1 mg/hr",titrate:"1 mg/hr",interval:"15 min",max:"20 mg/hr",notes:"",calc:{doseUnit:"mg/hr",defaultDose:1,weight:false}},
    {id:"nicardipine",name:"Nicardipine",brand:"",category:"Cardiac / BP",concentration:"50 mg / 250 mL NS",amount:50,amountUnit:"mg",volume:250,initial:"5 mg/hr",titrate:"2.5 mg/hr",interval:"5 min",max:"15 mg/hr",notes:"Remove 20 mL of NS from bag prior to addition of 20 mL of nicardipine.",calc:{doseUnit:"mg/hr",defaultDose:5,weight:false}},
    {id:"nitroglycerin",name:"Nitroglycerin",brand:"",category:"Cardiac / BP",concentration:"100 mg / 250 mL D5W",amount:100,amountUnit:"mg",volume:250,initial:"20 mcg/min",titrate:"20 mcg/min",interval:"2–5 min",max:"200 mcg/min",notes:"Premixed.",calc:{doseUnit:"mcg/min",defaultDose:20,weight:false}},
    {id:"nitroprusside",name:"Nitroprusside",brand:"Nipride",category:"Cardiac / BP",concentration:"50 mg / 250 mL D5W",amount:50,amountUnit:"mg",volume:250,initial:"0.3 mcg/kg/min",titrate:"0.1 mcg/kg/min",interval:"5 min",max:"10 mcg/kg/min",notes:"Protect from light.",calc:{doseUnit:"mcg/kg/min",defaultDose:0.3,weight:true}},
    {id:"norepinephrine",name:"Norepinephrine",brand:"Levophed",category:"Vasopressors / Inotropes",concentration:"8 mg / 250 mL D5W",amount:8,amountUnit:"mg",volume:250,initial:"4 mcg/min",titrate:"1 mcg/min",interval:"1–5 min",max:"30 mcg/min (PIV max 15 mcg/min)",notes:"",calc:{doseUnit:"mcg/min",defaultDose:4,weight:false}},
    {id:"phenylephrine",name:"Phenylephrine",brand:"Neosynephrine",category:"Vasopressors / Inotropes",concentration:"50 mg / 250 mL NS",amount:50,amountUnit:"mg",volume:250,initial:"40 mcg/min",titrate:"10 mcg/min",interval:"1–5 min",max:"200 mcg/min (central and PIV max)",notes:"Also available as premixed syringe 100 mcg/mL (50–200 mcg IVP every 1–5 min).",calc:{doseUnit:"mcg/min",defaultDose:40,weight:false}},
    {id:"propofol-infusion",name:"Propofol",brand:"Diprivan",category:"Sedation",concentration:"1000 mg / 100 mL",amount:1000,amountUnit:"mg",volume:100,initial:"5 mcg/kg/min",titrate:"5 mcg/kg/min",interval:"1–5 min",max:"60 mcg/kg/min",notes:"Tubing change required every 12 hours.",calc:{doseUnit:"mcg/kg/min",defaultDose:5,weight:true}},
    {id:"vecuronium",name:"Vecuronium",brand:"",category:"Paralytic",concentration:"50 mg / 100 mL D5W",amount:50,amountUnit:"mg",volume:100,initial:"0.8 mcg/kg/min",titrate:"0.1 mcg/kg/min",interval:"15 min",max:"1.7 mcg/kg/min",notes:"",calc:{doseUnit:"mcg/kg/min",defaultDose:0.8,weight:true}},
  ];

  const search = document.getElementById("medSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const medList = document.getElementById("medList");
  const detail = document.getElementById("medDetail");
  const noResults = document.getElementById("noMedResults");
  const resultCount = document.getElementById("resultCount");
  const categories = ["All", "Vasopressors / Inotropes", "Cardiac / BP", "Sedation", "Toxicology", "Paralytic"];
  let activeCategory = "All";
  let activeId = "";
  let filtered = medications;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  }

  function renderCategories() {
    categoryFilter.innerHTML = categories.map(category => `<button class="category-chip${category === activeCategory ? " active" : ""}" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
  }

  function searchableText(med) {
    return [med.name,med.brand,med.category,med.concentration,med.initial,med.titrate,med.max,med.notes,med.doseLabel].filter(Boolean).join(" ").toLowerCase();
  }

  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    filtered = medications
      .filter(med => (activeCategory === "All" || med.category === activeCategory) && (!query || searchableText(med).includes(query)))
      .sort((a, b) => {
        const byName = a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
        if (byName !== 0) return byName;
        return a.category.localeCompare(b.category, undefined, { sensitivity: "base" });
      });
    if (activeId && !filtered.some(med => med.id === activeId)) activeId = "";
    renderList();
    renderDetail();
  }

  function renderList() {
    resultCount.textContent = `${filtered.length} shown`;
    noResults.hidden = filtered.length !== 0;
    medList.innerHTML = filtered.map(med => `<button type="button" class="med-list-button${med.id === activeId ? " active" : ""}" data-id="${med.id}"><span class="med-list-name">${escapeHtml(med.name)}${med.brand ? ` (${escapeHtml(med.brand)})` : ""}</span><span class="med-list-meta">${escapeHtml(med.concentration)}</span></button>`).join("");
  }

  function concentrationInUnit(med, targetUnit) {
    let amount = med.amount;
    if (med.amountUnit === "mg" && targetUnit === "mcg") amount *= 1000;
    if (med.amountUnit === "mcg" && targetUnit === "mg") amount /= 1000;
    return amount / med.volume;
  }

  function calculateRate(med, dose, weight) {
    const unit = med.calc.doseUnit;
    const targetMassUnit = unit.startsWith("mcg") ? "mcg" : "mg";
    const concentration = concentrationInUnit(med, targetMassUnit);
    let massPerTime = dose;
    if (unit.includes("/kg/")) massPerTime *= weight;
    let mlPerHour = massPerTime / concentration;
    if (unit.endsWith("/min")) mlPerHour *= 60;
    return mlPerHour;
  }

  function formatNumber(value, maxDecimals=2) {
    if (!Number.isFinite(value)) return "—";
    return value.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:maxDecimals});
  }

  function renderInfusion(med) {
    detail.className = "med-detail";
    detail.innerHTML = `
      <div class="med-detail-header">
        <h2>${escapeHtml(med.name)}</h2>
        ${med.brand ? `<p class="brand-name">${escapeHtml(med.brand)}</p>` : ""}
        <span class="category-label">${escapeHtml(med.category)}</span>
      </div>
      <div class="med-detail-body">
        <div class="concentration-card"><span>Concentration</span><strong>${escapeHtml(med.concentration)}</strong></div>
        <div class="parameter-grid">
          <div class="parameter"><span>Recommended Initial Dose</span><strong>${escapeHtml(med.initial)}</strong></div>
          <div class="parameter"><span>Increase / Decrease By</span><strong>${escapeHtml(med.titrate)}</strong></div>
          <div class="parameter"><span>Time Increment</span><strong>${escapeHtml(med.interval)}</strong></div>
          <div class="parameter"><span>Maximum Dose</span><strong>${escapeHtml(med.max)}</strong></div>
        </div>
        ${med.notes ? `<div class="clinical-note"><strong>Clinical Note</strong>${escapeHtml(med.notes)}</div>` : ""}
        <div class="calculator-card">
          <h3>Dose → Pump Rate Calculator</h3>
          <p>Enter the ordered dose to calculate the corresponding pump rate.</p>
          <div class="calc-inputs">
            ${med.calc.weight ? `<div class="calc-field"><label for="weightInput">Patient Weight</label><div class="input-with-unit"><input id="weightInput" type="number" inputmode="decimal" min="0" step="0.1" value="80"><span>kg</span></div></div>` : ""}
            <div class="calc-field"><label for="doseInput">Ordered Dose</label><div class="input-with-unit"><input id="doseInput" type="number" inputmode="decimal" min="0" step="any" value="${med.calc.defaultDose}"><span>${escapeHtml(med.calc.doseUnit)}</span></div></div>
          </div>
          <div id="calcError" class="calc-error" hidden></div>
          <div class="calc-result"><span>Calculated Pump Rate</span><strong id="rateOutput">— mL/hr</strong><small>${escapeHtml(med.concentration)}</small></div>
        </div>
      </div>`;

    const weightInput = document.getElementById("weightInput");
    const doseInput = document.getElementById("doseInput");
    const output = document.getElementById("rateOutput");
    const error = document.getElementById("calcError");
    const update = () => {
      const dose = Number(doseInput.value);
      const weight = med.calc.weight ? Number(weightInput.value) : 1;
      if (!(dose > 0) || (med.calc.weight && !(weight > 0))) {
        error.hidden = false;
        error.textContent = med.calc.weight ? "Enter a dose and patient weight greater than zero." : "Enter a dose greater than zero.";
        output.textContent = "— mL/hr";
        return;
      }
      error.hidden = true;
      output.textContent = `${formatNumber(calculateRate(med,dose,weight),2)} mL/hr`;
    };
    doseInput.addEventListener("input",update);
    weightInput?.addEventListener("input",update);
    update();
  }

  function renderRsi(med) {
    detail.className = "med-detail rsi-detail";
    detail.innerHTML = `
      <div class="med-detail-header">
        <h2>${escapeHtml(med.name)}</h2>
        <span class="category-label">Rapid Sequence Induction</span>
      </div>
      <div class="med-detail-body">
        <div class="rsi-dose"><span>Reference Dose</span><strong>${escapeHtml(med.doseLabel)}</strong></div>
        <div class="calculator-card">
          <h3>Weight-Based RSI Dose Calculator</h3>
          <p>Calculates the total IV-push dose from the displayed mg/kg dosing guideline.</p>
          <div class="calc-inputs">
            <div class="calc-field"><label for="rsiWeight">Patient Weight</label><div class="input-with-unit"><input id="rsiWeight" type="number" inputmode="decimal" min="0" step="0.1" value="80"><span>kg</span></div></div>
          </div>
          <div id="calcError" class="calc-error" hidden></div>
          <div class="calc-result"><span>Calculated IVP Dose</span><strong id="rsiOutput">— mg</strong><small>${escapeHtml(med.doseLabel)}</small></div>
        </div>
      </div>`;
    const weightInput = document.getElementById("rsiWeight");
    const output = document.getElementById("rsiOutput");
    const error = document.getElementById("calcError");
    const update = () => {
      const weight = Number(weightInput.value);
      if (!(weight > 0)) { error.hidden=false; error.textContent="Enter a patient weight greater than zero."; output.textContent="— mg"; return; }
      error.hidden=true;
      const low = weight * med.doseMin;
      const high = weight * med.doseMax;
      output.textContent = med.doseMin === med.doseMax ? `${formatNumber(low,1)} mg` : `${formatNumber(low,1)}–${formatNumber(high,1)} mg`;
    };
    weightInput.addEventListener("input",update);
    update();
  }

  function renderDetail() {
    if (!activeId) {
      detail.className = "med-detail empty-detail";
      detail.innerHTML = `
        <div class="med-detail-body empty-detail-body">
          <h2>Select a Medication</h2>
          <p>Choose a medication from the list or use the search above to view dosing guidelines and calculate a dose or pump rate.</p>
        </div>`;
      return;
    }
    const med = medications.find(item => item.id === activeId);
    if (!med) return;
    renderInfusion(med);
  }

  categoryFilter.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCategories();
    applyFilters();
  });
  medList.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;
    activeId = button.dataset.id;
    renderList();
    renderDetail();
    if (window.innerWidth < 900) detail.scrollIntoView({behavior:"smooth",block:"start"});
  });
  search.addEventListener("input",applyFilters);

  renderCategories();
  applyFilters();
})();
