import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  // DEFININDO CONSTANTES PARA SOMENTE LEITURA
  static readonly SOMA: string = '+'
  static readonly SUBTRACAO: string = '-'
  static readonly DIVISAO: string = '/'
  static readonly MULTIPICACAO: string = '*'

  constructor() { }

  // METODO CACULAR
  calcular(num1: number, num2: number, operacao: String): number {
    let resultado: number

    // VERIFICA O TIPO DA OPERACAO
    switch (operacao) {
      // ACESSANDO CONSTANTES 
      case CalculadoraService.SOMA:
        resultado = num1 + num2
        break
      // ACESSANDO CONSTANTES 
      case CalculadoraService.SUBTRACAO:
        resultado = num1 - num2
        break
      // ACESSANDO CONSTANTES 
      case CalculadoraService.DIVISAO:
        resultado = num1 / num2
        break
      // ACESSANDO CONSTANTES 
      case CalculadoraService.MULTIPICACAO:
        resultado = num1 * num2
        break
      default:
        resultado = 0
        break
    }
    // RETORNANDO UM VALOR INTEIRO
    return resultado
  }
}
