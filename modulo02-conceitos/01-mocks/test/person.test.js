import { describe, it, expect } from '@jest/globals'
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
})