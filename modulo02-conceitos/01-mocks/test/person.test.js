import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'

describe('#Person Suite', () => {
    describe('#validate', () => {
        it('should throw if the name is not present', () => {
            const mockInvalidPerson = {
                name:'', 
                cpf: '123.456.789-00'
            }

            expect(() => Person.validate(mockInvalidPerson)).toThrow('Name is required')
        })
        it('should throw if the name is not present', () => {
            const mockInvalidPerson = {
                name:'Xuxa da Silva', 
                cpf: ''
            }

            expect(() => Person.validate(mockInvalidPerson)).toThrow('CPF is required')
        })
        it('should not throw if person is valid', () => {
            const mockInvalidPerson = {
                name:'Xuxa da Silva', 
                cpf: '123.456.789-00'
            }

            expect(() => Person.validate(mockInvalidPerson))
            .not
            .toThrow()
        })
    })

    describe('#format', () => {
        it('should format  person name and CPF', () => {
            //AAA

            //Arrange = Prepara
            const mockPerson = {
                name:'Zeca Pagodinho da Silva',
                cpf: '123.456.789-00'
            }
            //Act = Executar
            const formattedPerson = Person.format(mockPerson)

            //Assert = Validar
            const expectedPerson = {
                name: 'Zeca',
                lastName: 'Pagodinho da Silva',
                cpf: '12345678900'
            }

            expect(formattedPerson).toStrictEqual(expectedPerson)
        })
    })

    describe('#save', () => {
        it('should throw if the person does not have name prop', () => {
            const mockPersonWithoutName = {
                cpf: '12345678900',
                lastName: 'da Silva'
            }

            expect(() => Person.save(mockPersonWithoutName)).toThrow('Cannot save invalid person')
        })

        it('should throw if the person does not have cpf prop', () => {
            const mockPersonWithoutName = {
                name: 'Zezinho',
                lastName: 'da Silva'
            }

            expect(() => Person.save(mockPersonWithoutName)).toThrow('Cannot save invalid person')
        })

        it('should throw if the person does not have lastName prop', () => {
            const mockPersonWithoutName = {
                cpf: '12345678900',
                lastName: 'da Silva'
            }

            expect(() => Person.save(mockPersonWithoutName)).toThrow('Cannot save invalid person')
        })

        it('should save a valid person when all required properties are present', () => {
            const mockPerson = {
              name: 'Zezinho',
              cpf: '12345678900',
              lastName: 'da Silva'
            }
      
            expect(() => Person.save(mockPerson)).not.toThrow()
          });
    })

    describe('#process', () => {
        it('should process a valid person', () => {
            // Uma outra ideia é não retestar o que já foi testado

            // lembra dos checkpoints?
            // Testou do caminho A ao caminho B,
            //      agora testa do caminho B ao caminho C
            // Então aqui, eu pulo o caminho A (validate), caminho B (format)
            // e vou direto para o caminho C (save) pois estes caminhos
            // ja foram validados

            // Este método abaixo faz mais sentido para quando se tem interações externas como
            // chamadas de API, bancos de dados, etc (que será mostrado na próxima aula)

            // Mocks são simulações de funções que você pode fazer ao testar o comportamento!!

            /// AAA = Arrange, Act, Assert

            //Arrange
            const mockPerson = {
                name: 'Zezin da Silva', 
                cpf: '123.456.789-00'
            }

            jest
                .spyOn(
                Person,
                Person.validate.name
            )
            .mockReturnValue()
            // .mockImplementation(() => {
            //     throw new Error("Fake Error")
            // })
            

            jest
            .spyOn(
                Person,
                Person.format.name
            )
            .mockReturnValue({
                cpf: '12345678900',
                name: 'Zezin',
                lastName: 'da Silva'
            })

            //Act
            const result = Person.process(mockPerson)

            //Assert
            const expected = 'ok'
            expect(result).toStrictEqual(expected)
        })
    })
})