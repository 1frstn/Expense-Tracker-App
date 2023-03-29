const form = document.querySelector('form');
const descriptionInput = document.getElementById('description-input');
const amountInput = document.getElementById('amount-input');
const categorySelect = document.getElementById('category-select');
const expenseTableBody = document.getElementById('expense-table-body');
const tableList = document.querySelector("body")
const totalExpensesDisplay = document.createElement('div');

let expenses = [];

function addExpense(description, amount, category) {
  const date = new Date();
  const expense = {
    description,
    amount: parseFloat(amount),
    category,
    date: date.toISOString()
  };
  expenses.push(expense);
  updateExpenses();
}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenses();
}

function updateExpenses() {
  expenseTableBody.innerHTML = '';
  let totalExpenses = 0;
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    const descriptionCell = document.createElement('td');
    const amountCell = document.createElement('td');
    const categoryCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount.toFixed(2);
    categoryCell.textContent = expense.category;
    dateCell.textContent = new Date(expense.date).toLocaleString();
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => removeExpense(index));

    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(deleteButtonCell);
    expenseTableBody.appendChild(row);

    totalExpenses += expense.amount;
  });
  
  totalExpensesDisplay.classList.add('total-expenses');
  totalExpensesDisplay.innerHTML = `<div id="total-expenses"><h3>Total Expenses: <span class="expenses-span">$${totalExpenses}</span> </h3></div>`;
  tableList.appendChild(totalExpensesDisplay);
  
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = amountInput.value.trim();
  const category = categorySelect.value;
  if (description && amount && category) {
    addExpense(description, amount, category);
    descriptionInput.value = '';
    amountInput.value = '';
    categorySelect.value = '';
  }
});