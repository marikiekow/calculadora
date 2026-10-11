let calculadora = {
    valorAtual: '0',
    valorAnterior: '',
    operador: '',

    somar: function(a, b) {
        return a + b;
    },

    subtrair: function(a, b) {
        return a - b;
    },

    multiplicar: function(a, b) {
        return a * b;
    },

    dividir: function(a, b) {
        return a / b;
    },

    adicionarNumero: function(numero) {
        if (this.valorAtual === 'Erro') {
            this.limpar();
        }

        if (this.valorAtual === '0' || this.valorAtual === '') {
            this.valorAtual = numero;
        } else if (this.valorAtual.length < 10) {
            this.valorAtual += numero;
        }

        this.atualizarDisplay();
    },

    adicionarVirgula: function() {
        if (this.valorAtual === 'Erro') {
            this.valorAtual = '0';
        }

        if (this.valorAtual === '') {
            this.valorAtual = '0.';
        } else if (!this.valorAtual.includes('.')) {
            this.valorAtual += '.';
        }

        this.atualizarDisplay();
    },

    escolherOperador: function(op) {
        if (this.valorAtual === 'Erro') {
            return;
        }

        if (this.operador !== '' && this.valorAtual === '') {
            this.operador = op;
            this.atualizarDisplay();
            return;
        }

        if (this.operador !== '') {
            this.calcular();
        }

        this.valorAnterior = this.valorAtual;
        this.operador = op;
        this.valorAtual = '';

        this.atualizarDisplay();
    },

    calcular: function() {
        if (this.operador === '' || this.valorAtual === '') {
            return;
        }

        let a = Number(this.valorAnterior);
        let b = Number(this.valorAtual);
        let resultado = 0;

        if (this.operador === '+') {
            resultado = this.somar(a, b);
        } else if (this.operador === '-') {
            resultado = this.subtrair(a, b);
        } else if (this.operador === '*') {
            resultado = this.multiplicar(a, b);
        } else if (this.operador === '/') {
            if (b === 0) {
                this.limpar();
                this.valorAtual = 'Erro';
                this.atualizarDisplay();
                return;
            }

            resultado = this.dividir(a, b);
        }

        this.valorAtual = String(Number(resultado.toFixed(8)));
        this.valorAnterior = '';
        this.operador = '';

        this.atualizarDisplay();
    },

    limpar: function() {
        this.valorAtual = '0';
        this.valorAnterior = '';
        this.operador = '';

        this.atualizarDisplay();
    },

    atualizarDisplay: function() {
        let expressao = this.valorAnterior + this.operador + this.valorAtual;
        let texto = expressao.replace(/\./g, ',');

        document.getElementById('visor').value = texto || '0';
    }
};

let teclado = document.querySelector('.botoes');

teclado.addEventListener('click', function(e) {
    let botao = e.target;

    if (botao.tagName !== 'BUTTON') {
        return;
    }

    if (botao.classList.contains('numero') ||
    botao.classList.contains('zero')) {
    calculadora.adicionarNumero(botao.innerText);


    } else if (botao.classList.contains('operador')) {
        calculadora.escolherOperador(botao.innerText);

    } else if (botao.classList.contains('virgula')) {
        calculadora.adicionarVirgula();

    } else if (botao.classList.contains('igual')) {
        calculadora.calcular();

    } else if (botao.classList.contains('limpar')) {
    calculadora.limpar();
    }
    
});