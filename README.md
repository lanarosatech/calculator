# Calculadora de Expressões Matemáticas

Este projeto implementa uma calculadora em JavaScript capaz de avaliar expressões matemáticas simples, seguindo as regras especificadas no desafio.

## Desafio e Regras

O desafio consistia em implementar uma calculadora que:
- Recebe uma string contendo uma expressão matemática.
- Avalia essa expressão e retorna o resultado numérico.
- Não utiliza expressões regulares, `eval` ou técnicas similares para manipular ou executar código diretamente a partir da string da expressão.

### Funcionalidades Implementadas

- **Análise da Expressão:** A calculadora utiliza uma abordagem baseada em pilhas e avaliação por prioridade de operadores para analisar e calcular o resultado da expressão.
- **Tratamento de Números Negativos:** Foi implementada uma lógica para lidar corretamente com números negativos.
- **Precedência de Operadores:** Multiplicações e divisões são tratadas antes de adições e subtrações, seguindo as regras matemáticas padrão.

### Exemplo Desafiador

A expressão `5-40*(-2)+15` foi particularmente desafiadora de resolver devido à presença de números negativos e operadores aninhados. A solução envolveu uma análise detalhada da string, identificação correta de operadores e operandos, e o tratamento adequado de precedência e ordem de operações.

## Uso

Para usar a calculadora, basta chamar a função `calculate(expr)` passando uma string contendo a expressão matemática a ser avaliada. Por exemplo:

```javascript
const resultado = calculate('5-40*(-2)+15');
console.log(resultado); // Saída esperada: 100
```
