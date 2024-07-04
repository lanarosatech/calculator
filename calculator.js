function calculate(expr) {
  function isOperator(char) {
      return ['+', '-', '*', '/'].includes(char);
  }

  function applyOperation(a, b, operator) {
      switch (operator) {
          case '+':
              return a + b;
          case '-':
              return a - b;
          case '*':
              return a * b;
          case '/':
              return a / b;
          default:
              return NaN; // Operador inválido
      }
  }

  function evaluateExpression(expression) {
      let numbers = [];
      let operators = [];
      let numBuffer = '';
      let i = 0;

      while (i < expression.length) {
          const char = expression[i];

          if (char === '(') {
              // Encontrou um parêntese, resolve recursivamente a expressão dentro
              let countParentheses = 1;
              let subExpr = '';
              i++;

              while (i < expression.length && countParentheses > 0) {
                  if (expression[i] === '(') countParentheses++;
                  else if (expression[i] === ')') countParentheses--;

                  if (countParentheses > 0) {
                      subExpr += expression[i];
                      i++;
                  }
              }

              // Avalia a subexpressão dentro dos parênteses recursivamente
              const result = evaluateExpression(subExpr);
              numbers.push(result);
          }

          if (!isNaN(parseInt(char)) || char === '.') {
              numBuffer += char;


              if (i === expression.length - 1 || isOperator(expression[i + 1])) {
                  numbers.push(parseFloat(numBuffer));
                  numBuffer = '';
              }
          }

          if (isOperator(char)) {
              // Se o caractere é um operador '-' e é o primeiro da expressão ou vem após '(' ou outro operador
              if (char === '-' && (i === 0 || expression[i - 1] === '(' || isOperator(expression[i - 1]))) {
                  // Adiciona o '-' ao numBuffer e continua para o próximo caractere
                  numBuffer += char;
                  i++;
                  continue;
              }

              while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[char]) {
                  const b = numbers.pop();
                  const a = numbers.pop();
                  const op = operators.pop();
                  numbers.push(applyOperation(a, b, op));
              }
              operators.push(char);
          }

          i++;
      }

      while (operators.length > 0) {
          const b = numbers.pop();
          const a = numbers.pop();
          const op = operators.pop();
          numbers.push(applyOperation(a, b, op));
      }

      return numbers.pop();
  }

  const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
  };

  // Remove espaços em branco da expressão
  expr = expr.replace(/\s/g, '');

  // Avalia a expressão
  const result = evaluateExpression(expr);

  // Verifica se o resultado é um número válido
  if (isNaN(result)) {
      throw new Error('Ops! Expressão inválida ou fora do alcance dessa calculadora.');
  }

  return result;
}

// Test cases
function test(expr, expected) {
  try {
      const actual = calculate(expr);
      const result = actual === expected ? "passed" : `failed. Actual: ${actual}`;
      console.log(`Test case "${expr}" ${result}`);
  } catch (error) {
      console.log(`Test case "${expr}" failed with error: ${error.message}`);
  }
}

test('1+2', 3);
test('0+8', 8);
test('10+350', 360);
test('5+40+100', 145);

test('10-2', 8);
test('-2+10', 8);
test('10-2+40', 48);

test('2*4', 8);
test('12/3', 4);

test('10+40*2+10', 100);
test('10-40*2+10', -60);
test('10-(2+4)', 4);
test('5+(10+20)*2', 65);
test('5-40*(-2)+15', 100);
