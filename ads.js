// ads.js - Painel de Ads & Tráfego Pago: distribuição da verba por canal, números do mês
// por canal, métricas calculadas (por canal e no total), comparação com o mês anterior e
// análise do mês. Cada mês é um documento "AAAA-MM" na coleção marketing_ads_metrics do
// Firestore, salvo automaticamente enquanto a pessoa digita.

(function () {
  const COLLECTION = "marketing_ads_metrics";
  const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const MONTHS_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

  const CHANNELS = [
    { key: "google", label: "Google Ads", color: "#1F3DFF" },
    { key: "meta", label: "Meta Ads", color: "#0EA5E9" },
    { key: "linkedin", label: "LinkedIn Ads", color: "#0A1A5C" },
    { key: "chatgpt", label: "ChatGPT Ads", color: "#10B981" },
  ];

  // Números brutos que a equipe preenche em cada canal.
  const INPUTS = [
    { key: "investimento", label: "Investimento", money: true, hint: "Total gasto no canal no mês" },
    { key: "impressoes", label: "Impressões", hint: "Vezes que os anúncios apareceram" },
    { key: "alcance", label: "Alcance", hint: "Pessoas diferentes que viram os anúncios" },
    { key: "cliques", label: "Cliques no link", hint: "Cliques que levaram ao site ou formulário" },
    { key: "leads", label: "Leads", hint: "Formulários ou contatos recebidos" },
    { key: "demonstracoes", label: "Demonstrações agendadas", hint: "Leads que marcaram demonstração" },
    { key: "clientes", label: "Clientes fechados", hint: "Vendas que vieram dos anúncios" },
    { key: "receita", label: "Receita gerada", money: true, hint: "Valor dos contratos fechados" },
  ];

  const ratio = (a, b, factor = 1) => (Number.isFinite(a) && Number.isFinite(b) && b > 0 ? (a / b) * factor : null);

  // Métricas calculadas, na ordem do funil. "better" diz se subir é bom ("higher") ou ruim ("lower").
  const GROUPS = [
    {
      title: "Alcance",
      metrics: [
        { key: "cpm", label: "CPM", name: "Custo por mil impressões", format: "money", better: "lower",
          calc: (v) => ratio(v.investimento, v.impressoes, 1000),
          how: "Quanto custa aparecer mil vezes. Sobe quando o público é pequeno demais ou a concorrência pelo mesmo público aumenta. Para melhorar: amplie o público, teste outros posicionamentos e renove os criativos." },
        { key: "frequencia", label: "Frequência", name: "Vezes que cada pessoa viu", format: "number", better: null,
          calc: (v) => ratio(v.impressoes, v.alcance),
          how: "Quantas vezes, em média, a mesma pessoa viu os anúncios. Se a frequência sobe enquanto o CTR cai, o público cansou do criativo: troque os criativos ou amplie o público." },
      ],
    },
    {
      title: "Cliques",
      metrics: [
        { key: "ctr", label: "CTR", name: "Taxa de cliques", format: "percent", better: "higher",
          calc: (v) => ratio(v.cliques, v.impressoes, 100),
          how: "De quem viu o anúncio, quantos clicaram. Mostra se o anúncio chama atenção. Para melhorar: headline com a dor do público fiscal, imagem mais clara e testes A/B entre criativos." },
        { key: "cpc", label: "CPC", name: "Custo por clique", format: "money", better: "lower",
          calc: (v) => ratio(v.investimento, v.cliques),
          how: "Quanto custa cada clique. Normalmente cai quando o CTR sobe. Para melhorar: aumente a relevância do anúncio para o público e pause os anúncios com CTR baixo." },
      ],
    },
    {
      title: "Conversão",
      metrics: [
        { key: "conversao", label: "Conversão da página", name: "Cliques que viraram lead", format: "percent", better: "higher",
          calc: (v) => ratio(v.leads, v.cliques, 100),
          how: "De quem clicou, quantos deixaram o contato. Mede a página de destino. Para melhorar: formulário curto, a mesma promessa do anúncio na página e carregamento rápido no celular." },
        { key: "cpl", label: "CPL", name: "Custo por lead", format: "money", better: "lower",
          calc: (v) => ratio(v.investimento, v.leads),
          how: "Quanto custa cada lead. Junta o desempenho do anúncio e da página. Compare sempre com a qualidade dos leads: um CPL baixo com leads que não agendam demonstração não ajuda." },
      ],
    },
    {
      title: "Resultado comercial",
      metrics: [
        { key: "leadDemo", label: "Lead → demonstração", name: "Leads que agendaram", format: "percent", better: "higher",
          calc: (v) => ratio(v.demonstracoes, v.leads, 100),
          how: "Quantos leads agendaram demonstração. Mede a qualidade do lead e a rapidez do comercial. Para melhorar: segmente melhor o público e faça o primeiro contato no mesmo dia." },
        { key: "custoDemo", label: "Custo por demonstração", name: "Investimento por demonstração", format: "money", better: "lower",
          calc: (v) => ratio(v.investimento, v.demonstracoes),
          how: "Quanto custa cada demonstração agendada. É a métrica mais próxima do resultado de vendas; compare entre os canais para decidir onde colocar mais verba." },
        { key: "cac", label: "CAC de mídia", name: "Custo por cliente", format: "money", better: "lower",
          calc: (v) => ratio(v.investimento, v.clientes),
          how: "Investimento em anúncios dividido pelos clientes fechados. Não inclui salários e ferramentas. Como a venda leva tempo, olhe a tendência de alguns meses, não só um." },
        { key: "roas", label: "ROAS", name: "Retorno sobre o investimento em anúncios", format: "times", better: "higher",
          calc: (v) => ratio(v.receita, v.investimento),
          how: "Quanto de receita volta para cada R$ 1 investido. Em vendas com ciclo longo, o retorno de um mês pode aparecer nos meses seguintes." },
      ],
    },
  ];
  const ALL_METRICS = GROUPS.flatMap((g) => g.metrics);

  const NOTES = [
    { key: "funcionou", label: "O que funcionou", placeholder: "Canais, campanhas, públicos ou criativos que trouxeram bons resultados..." },
    { key: "naoFuncionou", label: "O que não funcionou", placeholder: "O que gastou verba sem trazer resultado..." },
    { key: "testar", label: "O que vamos testar no próximo mês", placeholder: "Nova divisão da verba, públicos, criativos, ofertas ou ajustes na página..." },
  ];

  const months = {}; // { "2026-10": { budget: { total, split: {} }, channels: { google: {...} }, notes: {} } }
  let loaded = false;
  let current = new Date();
  current.setDate(1);
  let view = "total"; // "total" ou a chave de um canal
  let saveTimer = null;

  const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const shiftMonth = (date, delta) => new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const shortLabel = (key) => {
    const [y, m] = key.split("-");
    return `${MONTHS_SHORT[Number(m) - 1]}/${y.slice(2)}`;
  };

  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const decimal = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
  function formatValue(value, format) {
    if (value === null || value === undefined || !Number.isFinite(value)) return "—";
    if (format === "money") return money.format(value);
    if (format === "percent") return `${decimal.format(value)}%`;
    if (format === "times") return `${decimal.format(value)}x`;
    return decimal.format(value);
  }

  function monthData(key, create = false) {
    if (!months[key]) {
      const empty = { budget: { split: {} }, channels: {}, notes: {} };
      if (!create) return empty;
      months[key] = empty;
    }
    return months[key];
  }

  // Números de um canal, ou a soma de todos os canais quando a visão é "total".
  function valuesFor(key, channel) {
    const data = monthData(key);
    if (channel !== "total") return (data.channels || {})[channel] || {};
    const sum = {};
    CHANNELS.forEach((c) => {
      const values = (data.channels || {})[c.key] || {};
      INPUTS.forEach((input) => {
        if (Number.isFinite(values[input.key])) sum[input.key] = (sum[input.key] || 0) + values[input.key];
      });
    });
    return sum;
  }
  const hasData = (key) => Object.keys(valuesFor(key, "total")).length > 0 || Number.isFinite(monthData(key).budget?.total);

  function setSaveState(text, state) {
    const el = document.getElementById("ads-save-state");
    if (!el) return;
    el.textContent = text;
    el.dataset.state = state || "";
  }

  function scheduleSave() {
    setSaveState("Salvando…", "saving");
    clearTimeout(saveTimer);
    const key = monthKey(current);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      saveMonth(key);
    }, 900);
  }

  async function saveMonth(key) {
    const data = monthData(key);
    try {
      await window.db.collection(COLLECTION).doc(key).set({
        month: key,
        budget: data.budget,
        channels: data.channels,
        notes: data.notes,
        updatedAt: Date.now(),
      });
      const now = new Date();
      setSaveState(`Salvo às ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`, "ok");
      renderHistory();
    } catch (error) {
      console.error("Erro ao salvar métricas de Ads:", error);
      setSaveState("Não foi possível salvar", "error");
      if (typeof showToast === "function") showToast("Não foi possível salvar os dados de Ads. Tente de novo.", "error");
    }
  }

  function numberInput(value, onChange, { placeholder = "—", disabled = false } = {}) {
    const el = document.createElement("input");
    el.type = "number";
    el.min = "0";
    el.step = "any";
    el.inputMode = "decimal";
    el.placeholder = placeholder;
    el.disabled = disabled;
    el.value = Number.isFinite(value) ? value : "";
    if (onChange) {
      el.addEventListener("input", () => {
        const number = parseFloat(el.value);
        onChange(Number.isFinite(number) ? number : null);
      });
    }
    return el;
  }

  // ---- Distribuição da verba -------------------------------------------------
  function renderBudget() {
    const container = document.getElementById("ads-budget");
    if (!container) return;
    const key = monthKey(current);
    const budget = monthData(key).budget || { split: {} };
    const total = budget.total;
    const split = budget.split || {};
    const distributed = CHANNELS.reduce((sum, c) => sum + (Number.isFinite(split[c.key]) ? split[c.key] : 0), 0);
    const invested = valuesFor(key, "total").investimento;
    container.innerHTML = "";

    // Orçamento total + resumo
    const top = document.createElement("div");
    top.className = "ads-budget-top";
    const totalField = document.createElement("label");
    totalField.className = "ads-input ads-budget-total";
    totalField.innerHTML = `<span class="ads-input-label">Orçamento do mês (R$)</span><span class="ads-input-hint">Quanto a empresa vai investir em anúncios</span>`;
    totalField.appendChild(numberInput(total, (value) => {
      const data = monthData(monthKey(current), true);
      if (value === null) delete data.budget.total;
      else data.budget.total = value;
      renderBudget();
      scheduleSave();
    }));
    top.appendChild(totalField);

    let status = "";
    if (distributed === 0) status = `<span class="ads-split-status neutral">Defina a porcentagem de cada canal</span>`;
    else if (Math.abs(distributed - 100) < 0.01) status = `<span class="ads-split-status good">Verba 100% distribuída</span>`;
    else if (distributed < 100) status = `<span class="ads-split-status warn">Faltam ${decimal.format(100 - distributed)}% para distribuir</span>`;
    else status = `<span class="ads-split-status bad">Passou ${decimal.format(distributed - 100)}% do orçamento</span>`;
    const investedText = Number.isFinite(invested)
      ? `Investido até agora: <strong>${money.format(invested)}</strong>${Number.isFinite(total) && total > 0 ? ` de ${money.format(total)} (${decimal.format((invested / total) * 100)}%)` : ""}`
      : "O investido aparece quando os números de cada canal forem preenchidos.";
    const summary = document.createElement("div");
    summary.className = "ads-budget-summary";
    summary.innerHTML = `${status}<span class="ads-budget-invested">${investedText}</span>`;
    top.appendChild(summary);
    container.appendChild(top);

    // Barra com a divisão planejada
    const bar = document.createElement("div");
    bar.className = "ads-split-bar";
    CHANNELS.forEach((c) => {
      const pct = Number.isFinite(split[c.key]) ? split[c.key] : 0;
      if (pct <= 0) return;
      const piece = document.createElement("span");
      piece.style.width = `${Math.min(pct, 100)}%`;
      piece.style.background = c.color;
      piece.title = `${c.label}: ${decimal.format(pct)}%`;
      bar.appendChild(piece);
    });
    container.appendChild(bar);

    // Uma linha por canal: % planejada, valor planejado e investido
    const rows = document.createElement("div");
    rows.className = "ads-budget-rows";
    CHANNELS.forEach((c) => {
      const pct = split[c.key];
      const planned = Number.isFinite(total) && Number.isFinite(pct) ? (total * pct) / 100 : null;
      const spent = valuesFor(key, c.key).investimento;
      const row = document.createElement("div");
      row.className = "ads-budget-row";
      row.innerHTML = `<span class="ads-channel-name"><i style="background:${c.color}"></i>${c.label}</span>`;

      const pctWrap = document.createElement("label");
      pctWrap.className = "ads-pct";
      pctWrap.appendChild(numberInput(pct, (value) => {
        const data = monthData(monthKey(current), true);
        if (value === null) delete data.budget.split[c.key];
        else data.budget.split[c.key] = value;
        renderBudget();
        scheduleSave();
      }, { placeholder: "0" }));
      pctWrap.insertAdjacentHTML("beforeend", "<span>%</span>");
      row.appendChild(pctWrap);

      const plannedEl = document.createElement("span");
      plannedEl.className = "ads-budget-planned";
      plannedEl.innerHTML = `<small>Planejado</small>${formatValue(planned, "money")}`;
      row.appendChild(plannedEl);

      const spentEl = document.createElement("span");
      spentEl.className = "ads-budget-spent";
      let progress = "";
      if (Number.isFinite(spent) && planned > 0) {
        const used = (spent / planned) * 100;
        progress = `<span class="ads-progress"><span style="width:${Math.min(used, 100)}%;background:${used > 100 ? "#EF4444" : c.color}"></span></span><small>${decimal.format(used)}% do planejado</small>`;
      }
      spentEl.innerHTML = `<small>Investido</small>${formatValue(Number.isFinite(spent) ? spent : null, "money")}${progress}`;
      row.appendChild(spentEl);
      rows.appendChild(row);
    });
    container.appendChild(rows);
  }

  // ---- Números e métricas -------------------------------------------------------
  function renderTabs() {
    const container = document.getElementById("ads-channel-tabs");
    if (!container) return;
    container.innerHTML = "";
    [{ key: "total", label: "Total" }, ...CHANNELS].forEach((c) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "ads-tab" + (view === c.key ? " active" : "");
      tab.innerHTML = c.color ? `<i style="background:${c.color}"></i>${c.label}` : c.label;
      tab.addEventListener("click", () => {
        view = c.key;
        renderTabs();
        renderInputs();
        renderMetrics();
      });
      container.appendChild(tab);
    });
  }

  function renderInputs() {
    const container = document.getElementById("ads-inputs");
    if (!container) return;
    const key = monthKey(current);
    const isTotal = view === "total";
    const values = valuesFor(key, view);
    container.innerHTML = "";
    const note = document.getElementById("ads-inputs-note");
    if (note) {
      note.textContent = isTotal
        ? "Total = soma dos canais. Para preencher, escolha um canal acima."
        : `Preencha os números de ${CHANNELS.find((c) => c.key === view).label} neste mês.`;
    }
    INPUTS.forEach((input) => {
      const field = document.createElement("label");
      field.className = "ads-input";
      field.innerHTML = `<span class="ads-input-label">${input.label}${input.money ? " (R$)" : ""}</span><span class="ads-input-hint">${input.hint}</span>`;
      field.appendChild(numberInput(values[input.key], isTotal ? null : (value) => {
        const data = monthData(monthKey(current), true);
        if (!data.channels[view]) data.channels[view] = {};
        if (value === null) delete data.channels[view][input.key];
        else data.channels[view][input.key] = value;
        renderMetrics();
        renderBudget();
        scheduleSave();
      }, { disabled: isTotal }));
      container.appendChild(field);
    });
  }

  function renderMetrics() {
    const container = document.getElementById("ads-metrics");
    if (!container) return;
    const key = monthKey(current);
    const prevKey = monthKey(shiftMonth(current, -1));
    const values = valuesFor(key, view);
    const prevValues = valuesFor(prevKey, view);
    container.innerHTML = "";

    GROUPS.forEach((group, index) => {
      const column = document.createElement("div");
      column.className = "ads-group";
      column.innerHTML = `<h4 class="ads-group-title"><span>${index + 1}</span>${group.title}</h4>`;

      group.metrics.forEach((metric) => {
        const value = metric.calc(values);
        const prev = metric.calc(prevValues);
        let delta = "";
        if (value !== null && prev !== null && prev > 0) {
          const change = ((value - prev) / prev) * 100;
          const arrow = change > 0 ? "▲" : change < 0 ? "▼" : "■";
          let tone = "neutral";
          if (metric.better && change !== 0) {
            const improved = metric.better === "higher" ? change > 0 : change < 0;
            tone = improved ? "good" : "bad";
          }
          delta = `<span class="ads-delta ${tone}">${arrow} ${decimal.format(Math.abs(change))}% vs. ${shortLabel(prevKey)}</span>`;
        } else if (value !== null) {
          delta = `<span class="ads-delta neutral">Sem ${shortLabel(prevKey)} para comparar</span>`;
        }

        const card = document.createElement("div");
        card.className = "ads-metric";
        card.innerHTML = `
          <div class="ads-metric-head">
            <span class="ads-metric-label">${metric.label}</span>
            <span class="ads-metric-name">${metric.name}</span>
          </div>
          <div class="ads-metric-value">${formatValue(value, metric.format)}</div>
          ${delta}
          <details class="ads-metric-how">
            <summary>Como ler e melhorar</summary>
            <p>${metric.how}</p>
          </details>
        `;
        column.appendChild(card);
      });
      container.appendChild(column);
    });
  }

  // ---- Análise do mês -------------------------------------------------------
  function renderNotes() {
    const container = document.getElementById("ads-notes");
    if (!container) return;
    const notes = monthData(monthKey(current)).notes || {};
    container.innerHTML = "";
    NOTES.forEach((note) => {
      const field = document.createElement("label");
      field.className = "ads-note";
      field.innerHTML = `<span class="ads-input-label">${note.label}</span>`;
      const textarea = document.createElement("textarea");
      textarea.placeholder = note.placeholder;
      textarea.value = notes[note.key] || "";
      textarea.addEventListener("input", () => {
        const data = monthData(monthKey(current), true);
        if (textarea.value.trim()) data.notes[note.key] = textarea.value;
        else delete data.notes[note.key];
        scheduleSave();
      });
      field.appendChild(textarea);
      container.appendChild(field);
    });
  }

  // ---- Evolução -------------------------------------------------------------
  function renderHistory() {
    const container = document.getElementById("ads-history");
    if (!container) return;
    const keys = Object.keys(months).filter(hasData).sort().reverse();
    if (keys.length === 0) {
      container.innerHTML = `<p class="ads-empty">Os meses preenchidos aparecem aqui para comparar a evolução.</p>`;
      return;
    }
    const metricColumn = (metricKey) => {
      const metric = ALL_METRICS.find((m) => m.key === metricKey);
      return { label: metric.label, get: (k) => formatValue(metric.calc(valuesFor(k, "total")), metric.format) };
    };
    const columns = [
      { label: "Orçamento", get: (k) => formatValue(monthData(k).budget?.total ?? null, "money") },
      { label: "Investido", get: (k) => formatValue(valuesFor(k, "total").investimento ?? null, "money") },
      { label: "Leads", get: (k) => formatValue(valuesFor(k, "total").leads ?? null, "number") },
      ...["ctr", "cpl", "leadDemo", "custoDemo", "cac", "roas"].map(metricColumn),
    ];
    const rows = keys.map((key) => {
      const [y, m] = key.split("-");
      const cells = columns.map((c) => `<td>${c.get(key)}</td>`).join("");
      return `<tr data-month="${key}"><th scope="row">${MONTHS[Number(m) - 1]} ${y}</th>${cells}</tr>`;
    }).join("");
    container.innerHTML = `
      <div class="ads-table-wrap">
        <table class="ads-table">
          <thead><tr><th scope="col">Mês</th>${columns.map((c) => `<th scope="col">${c.label}</th>`).join("")}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
    container.querySelectorAll("tr[data-month]").forEach((row) => {
      row.addEventListener("click", () => {
        const [y, m] = row.dataset.month.split("-").map(Number);
        goToMonth(new Date(y, m - 1, 1));
      });
    });
  }

  function renderAll() {
    const label = document.getElementById("ads-month-label");
    if (label) label.textContent = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
    setSaveState("", "");
    renderBudget();
    renderTabs();
    renderInputs();
    renderMetrics();
    renderNotes();
    renderHistory();
  }

  function goToMonth(date) {
    // Grava na hora o que ainda estava esperando, antes de trocar de mês.
    if (saveTimer) {
      clearTimeout(saveTimer);
      saveTimer = null;
      saveMonth(monthKey(current));
    }
    current = date;
    renderAll();
  }

  async function load() {
    try {
      const snapshot = await window.db.collection(COLLECTION).get();
      snapshot.forEach((doc) => {
        const data = doc.data();
        months[doc.id] = {
          budget: { split: {}, ...(data.budget || {}) },
          channels: data.channels || {},
          notes: data.notes || {},
        };
      });
      loaded = true;
    } catch (error) {
      console.error("Erro ao carregar métricas de Ads:", error);
      setSaveState("Não foi possível carregar os dados", "error");
    }
  }

  // Chamado pelo app.js sempre que a página de Ads abre.
  window.openAdsMetrics = async function () {
    renderAll();
    if (!loaded) {
      await load();
      renderAll();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ads-prev-month")?.addEventListener("click", () => goToMonth(shiftMonth(current, -1)));
    document.getElementById("ads-next-month")?.addEventListener("click", () => goToMonth(shiftMonth(current, 1)));
  });
})();
