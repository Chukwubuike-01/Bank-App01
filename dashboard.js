const bankAccount = {
  balance: 10000,
  transactionHistory: [],

  deposit(amount) {
    if (amount <= 0 || isNaN(amount)) {
      this.transactionHistory.push("⚠️ Invalid deposit amount.");
      updateHistory();
      return;
    }

    this.balance += amount;
    this.transactionHistory.push(`✅ Deposited $${amount}`);
    updateBalance();
    updateHistory();
  },

  withdraw(amount) {
    if (amount <= 0 || isNaN(amount)) {
      this.transactionHistory.push("⚠️ Invalid withdrawal amount.");
      updateHistory();
      return;
    }

    if (amount > this.balance) {
      this.transactionHistory.push("❌ Insufficient funds for withdrawal.");
      updateHistory();
      return;
    }

    this.balance -= amount;
    this.transactionHistory.push(`✅ Withdrew $${amount}`);
    updateBalance();
    updateHistory();
  },

  getBalance() {
    return this.balance;
  },

  getTransactionHistory() {
    return this.transactionHistory;
  },
};

// DOM elements
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const depositInput = document.getElementById("depositAmount");
const withdrawInput = document.getElementById("withdrawAmount");
const balanceDisplay = document.getElementById("balanceDisplay");
const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");
const historyBox = document.getElementById("historyBox");
const historyList = document.getElementById("historyList");

// Event Listeners
depositBtn.addEventListener("click", () => {
  const amount = parseFloat(depositInput.value);
  bankAccount.deposit(amount);
  depositInput.value = "";
});

withdrawBtn.addEventListener("click", () => {
  const amount = parseFloat(withdrawInput.value);
  bankAccount.withdraw(amount);
  withdrawInput.value = "";
});

toggleHistoryBtn.addEventListener("click", () => {
  historyBox.classList.toggle("d-none");
});

// Helpers
function updateBalance() {
  balanceDisplay.textContent = `Current Balance: ₦${bankAccount.getBalance()}`;
}

function updateHistory() {
  const history = bankAccount.getTransactionHistory();
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = `<li class="list-group-item text-muted text-center">No transactions yet.</li>`;
    return;
  }

  history.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

// Initialize
updateBalance();
updateHistory();
