const display = document.querySelector(".cal-display");
display.textContent = 0;
let firstNum = 0;
let operator = "";
let secNum = 0;
let currentState = true;
let isFloat = false;
const calButtons = document.querySelectorAll("a");
const add = function (num1, num2) {
  return +(num1 + num2).toFixed(6);
};
const subtract = function (num1, num2) {
  return +(num1 - num2).toFixed(6);
};
const multiply = function (num1, num2) {
  return +(num1 * num2).toFixed(6);
};
const divide = function (num1, num2) {
  return +(num1 / num2).toFixed(6);
};

const changeSign = function (num) {
  return num * -1;
};

const operate = (first, op, sec) => {
  switch (op) {
    case "+":
      return add(first, sec);
    case "-":
      return subtract(first, sec);
    case "/":
      return divide(first, sec);
    case "*":
      return multiply(first, sec);
  }
};
const clear = () => {
  display.textContent = 0;
  firstNum = 0;
  secNum = 0;
  operator = "";
  currentState = true;
};

const runCalculator = function () {
  firstNum = +display.textContent;
  calButtons.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const id = btn.id;
      if (
        id !== "back" &&
        id !== "divide" &&
        id !== "changeSign" &&
        id !== "clear" &&
        id !== "multiply" &&
        id !== "subtract" &&
        id !== "add" &&
        id !== "float" &&
        id !== "equals"
      ) {
        if (display.textContent === "0") {
          display.textContent = id;
          firstNum = +id;
          console.log(firstNum);
        } else if (
          (firstNum > 0 && secNum === 0 && currentState) ||
          (firstNum < 0 && secNum === 0 && currentState)
        ) {
          console.log(firstNum, id);
          firstNum = +(firstNum + id);
          display.textContent = firstNum;
        } else if (!currentState) {
          secNum = +(secNum + id);
          display.textContent = secNum;
        }
      } else if (id !== "equals") {
        switch (id) {
          case "multiply":
            operator = "*";
            console.log(operator);
            display.textContent = firstNum + operator;
            currentState = false;
            break;
          case "add":
            operator = "+";
            display.textContent = firstNum + operator;
            currentState = false;
            break;
          case "subtract":
            operator = "-";
            display.textContent = firstNum + operator;
            currentState = false;
            break;
          case "divide":
            operator = "/";
            display.textContent = firstNum + operator;
            currentState = false;
            break;
          case "float":
            isFloat = true;
            if (currentState) {
              firstNum = +(firstNum + "." + id);
            }
          case "clear":
            clear();
            break;
          case "changeSign":
            if (currentState) {
              firstNum = changeSign(firstNum);
              console.log(firstNum);
              display.textContent = firstNum;
              break;
            } else {
              secNum = changeSign(secNum);
              display.textContent = secNum;
              break;
            }
        }
      } else if (id === "equals") {
        if (!(operator === "")) {
          firstNum = operate(firstNum, operator, secNum);
          display.textContent = firstNum;
          secNum = 0;
          currentState = true;
          isFloat = false;
        }
      }
    });
  });
};
runCalculator();
