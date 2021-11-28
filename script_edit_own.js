const allMoney = document.querySelector("#allMoney");

//funkcja odejmująca expenses od incomes i zwracająca ją w DOM
function sumBudgetAll() {
  const budget = sumIncomeValue() - sumExpenseValue();
  if (budget > 0) {
    return (allMoney.textContent =
      "Możesz jeszcze wydać: " + budget + " złotych");
  } else if (budget === 0) {
    return (allMoney.textContent = "Bilans wynosi zero");
  } else {
    return (allMoney.textContent =
      "Bilans jest ujemny. Jesteś na minusie: " + budget + " złotych");
  }
}
