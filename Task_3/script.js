// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                clearDisplay();
            } else if (button.id === 'equals') {
                evaluateExpression();
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        secondOperand = '';
        display.textContent = '0';
    }

    function handleNumber(value) {
        if (currentInput === '' && value === '0') {
            return;
        }
        currentInput += value;
        display.textContent = currentInput;
    }

    function handleOperator(value) {
        if (currentInput === '' && value === '-') {
            currentInput = '-';
            display.textContent = currentInput;
            return;
        }
        if (firstOperand && operator && currentInput) {
            secondOperand = currentInput;
            evaluateExpression();
        }
        operator = value;
        firstOperand = currentInput;
        currentInput = '';
    }

    function evaluateExpression() {
        if (operator && firstOperand !== '' && currentInput !== '') {
            secondOperand = currentInput;
            let result;
            switch (operator) {
                case '+':
                    result = parseFloat(firstOperand) + parseFloat(secondOperand);
                    break;
                case '-':
                    result = parseFloat(firstOperand) - parseFloat(secondOperand);
                    break;
                case '*':
                    result = parseFloat(firstOperand) * parseFloat(secondOperand);
                    break;
                case '/':
                    result = parseFloat(firstOperand) / parseFloat(secondOperand);
                    break;
                default:
                    return;
            }
            display.textContent = result;
            firstOperand = result.toString();
            currentInput = '';
            operator = '';
        }
    }
});

