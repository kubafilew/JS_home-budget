const sumIncome = document.querySelector("#sumIncome");
const incomeName = document.querySelector("#incomeName");
const incomeValue = document.querySelector("#incomeValue");
const sumExpense = document.querySelector("#sumExpense");
const expenseName = document.querySelector("#expenseName");
const expenseValue = document.querySelector("#expenseValue");

// -------------------------------------------------------------------------------------------------------

function createElementLi(name, value, isExpense) {
  const li = document.createElement("li");
  li.classList.add("li");

  const spanName = document.createElement("span");
  spanName.innerHTML = name + "\xa0";

  const spanAmount = document.createElement("span");
  spanAmount.classList.add("value");
  spanAmount.innerHTML = value + "\xa0";

  // ----------------------------------------------------------dataset-----------------------------

  spanAmount.dataset.amount = value;
  li.appendChild(spanName);
  li.appendChild(spanAmount);

  const div = document.createElement("div");
  div.classList.add("li-btns");
  li.appendChild(div);

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  editButton.innerHTML = "";
  editButton.classList.add("edit");
  deleteButton.innerHTML = "";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", function () {
    li.remove();

    //  --------------------------------------------------------------------

    sumIncomeValue();
    sumExpenseValue();
    allBudget();
  });

  // --------------------------------

  editButton.addEventListener("click", function () {
    spanName.contentEditable = true;
    spanAmount.contentEditable = true;
    editButton.style.visibility = "hidden";

    // ---------------------------------------

    const doneButton = document.createElement("button");
    doneButton.innerHTML = "";
    doneButton.classList.add("done");
    div.appendChild(doneButton);
    doneButton.addEventListener("click", function () {
      spanName.contentEditable = false;
      spanAmount.contentEditable = false;

      // --------------------------------------------------click & new value--------------------

      spanAmount.dataset.amount = spanAmount.textContent;
      doneButton.remove();
      editButton.style.visibility = "visible";
      sumIncomeValue();
      sumExpenseValue();
      allBudget();
    });
  });
  if (isExpense) {
    expenseList.appendChild(li);
  } else {
    incomeList.appendChild(li);
  }
}

// -----------------------------------------sum from income--------------------------------------

const incomeList = document.querySelector("#incomeList");
function sumIncomeValue() {
  const sumIn = [...document.querySelectorAll("#incomeList .value")].reduce(
    (acc, income) => {
      return acc + Number(income.dataset.amount);
    },
    0
  );
  sumIncome.textContent = sumIn;
  return sumIn;
}

// ---------------------------------------------sum from expanse---------------------------------------

const expenseList = document.querySelector("#expenseList");
function sumExpenseValue() {
  const sumEx = [...document.querySelectorAll("#expenseList .value")].reduce(
    (acc, expense) => {
      return acc + Number(expense.dataset.amount);
    },
    0
  );
  sumExpense.textContent = sumEx;
  return sumEx;
}

// --------------------------------income-expanse sum DOM----------------------------------

const allMoney = document.querySelector("#allMoney");
function allBudget() {
  const budget = sumIncomeValue() - sumExpenseValue();
  if (budget > 0) {
    return (allMoney.textContent = "your account is  " + "\xa0" + budget);
  } else if (budget === 0) {
    return (allMoney.textContent = "you are at zero");
  } else {
    return (allMoney.textContent =
      "you are under the dash... " + "\xa0" + budget);
  }
}

// ------------------------------------------------------------------

document.querySelector("#addIncome").addEventListener("click", function () {
  if (incomeValue.value.length !== 0 || incomeName.value.length !== 0) {
    addIncome();
    sumIncomeValue();
    allBudget();
  } else {
    resetInputs([incomeName, incomeValue]);
  }
});

// -----------------------------------------------------------------------

document.querySelector("#addOutgo").addEventListener("click", function () {
  if (expenseValue.value.length !== 0 || expenseName.value.length !== 0) {
    addExpense();
    sumExpenseValue();
    allBudget();
  } else {
    resetInputs([expenseName, expenseValue]);
  }
});

// ---------------------------------------resets--------------------------------------

function resetInputs(inputs) {
  inputs.forEach((i) => (i.value = ""));
}

function addIncome() {
  createElementLi(incomeName.value, incomeValue.value, false);
  resetInputs([incomeName, incomeValue]);
}

function addExpense() {
  createElementLi(expenseName.value, expenseValue.value, true);
  resetInputs([expenseName, expenseValue]);
}
