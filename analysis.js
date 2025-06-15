const transactions = [
  { type: "DEPOSIT", amount: 1000 },
  { type: "PAYMENT", amount: 300, receiver: "Groceries" },
  { type: "PAYMENT", amount: 150, receiver: "Transport" },
  { type: "PAYMENT", amount: 200, receiver: "Dining" },
  { type: "DEPOSIT", amount: 500 },
];

function formatCurrency(amount) {
  return "RWF " + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function analyze() {
  let income = 0, expenses = 0;
  const categories = {};

  transactions.forEach(tx => {
    if (tx.type === "DEPOSIT") income += tx.amount;
    if (tx.type === "PAYMENT") {
      expenses += tx.amount;
      const cat = tx.receiver || "Other";
      categories[cat] = (categories[cat] || 0) + tx.amount;
    }
  });

  const balance = income - expenses;
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  const topCategory = Object.entries(categories).sort((a,b) => b[1] - a[1])[0];

  document.getElementById("balance").textContent = formatCurrency(balance);
  document.getElementById("balance").className = "value " + (balance >= 0 ? "text-green" : "text-red");

  document.getElementById("savings-rate").textContent = `${savingsRate}%`;
  document.getElementById("savings-rate").className = "value " + (savingsRate >= 20 ? "text-green" : savingsRate >= 10 ? "" : "text-red");

  document.getElementById("top-category").textContent = topCategory ? topCategory[0] : "N/A";
  document.getElementById("top-category-amount").textContent = topCategory ? formatCurrency(topCategory[1]) : "";
}

document.getElementById("generate-btn").addEventListener("click", () => {
  analyze();
  document.getElementById("ai-output").innerHTML += `
    <div style="margin-top:20px;">
      <h3>AI Summary (Mock)</h3>
      <ul>
        <li>💡 You’ve maintained a positive balance. Keep saving!</li>
        <li>📉 Dining is a high spend area. Consider reducing frequency.</li>
        <li>📈 Try setting a monthly savings goal of RWF 200,000.</li>
      </ul>
    </div>
  `;
});
