import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services'

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  // DEFININDO ATRIBUTOS
  private numero1: string
  private numero2: string
  private resultado: number
  private operacao: string

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.limpar()
  }

  // INICIANDO OS VALORES PADRÃO
  limpar(): void {
    this.numero1 = '0'
    this.numero2 = null
    this.operacao = null
    this.resultado = null
  }

  // ADICIONA NUMERO no display
  adicionaNumero(numero: string): void {
    if (this.operacao === null) {
      this.numero1 = this.concatenaNumero(this.numero1, numero)
    } else {
      this.numero2 = this.concatenaNumero(this.numero2, numero)
    }
  }

  // RETORNA UM NUMERO CONCATENADO
  concatenaNumero(numAtual: string, numContact: string): string {
    // CASO TENHA APENAS '0' OU NULL REINICIA O VALOR
    if (numAtual === '0' || numAtual === null) {
      numAtual = ''
    }

    // PRIMEIRO DIGITO É . CONCATENA 0 ANTES DO PONTE
    if (numContact === '.' && numAtual === '') {
      return '0.'
    }

    // CASO . DIGITADO E JA CONTEM UM . APENAS RETORNA NUMATUAL
    if (numContact === '.' && numAtual.indexOf('.') > -1) {
      return numAtual
    }

    return numAtual + numContact
  }

  // DEFININDO OPERACAO
  definirOperacao(operacao: string): void {
    // APENAS DEFINE A OPERACAO CASO NÃO EXISTA UMA
    if (this.operacao === null) {
      this.operacao = operacao
      return
    }

    // CASO A OPERACAO DEFINIDA E NUMERO 2 SELECIONADO EFETUA O CALCULO DA OPERACAO
    if (this.numero2 !== null) {
      // CHAMANDO O METODO CALCULAR DA CALCULADORASERVICE
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao
      )

      this.operacao = operacao
      this.numero1 = this.resultado.toString() // PASSA SER O RESULTADO 
      this.numero2 = null
      this.resultado = null
    }

  }
  // QUANDO O BOTAO DE = FOR PRECIONADO IRA CALCULAR AS OPERACOES
  calcular(): void {
    if (this.numero2 === null || this.numero2 === '') {
      return
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao
    )
  }

  // RETORNA O VALOR MOSTRADO NO DISPLAY DA CALCULADORA
  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString()
    }
    if (this.numero2 !== null) {
      return this.numero2
    }
    return this.numero1
  }
}
