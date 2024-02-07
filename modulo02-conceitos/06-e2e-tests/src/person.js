class Person {

    static validate(person) {
        if (!person.name) throw new Error('Name is required')
        if (!person.cpf) throw new Error('CPF is required')
        return true
    }

    static format(person) {
        const [name, ...lastName] = person.name.split(' ')

        return {
            cpf: person.cpf.replace(/\D/g, ''),
            name,
            lastName: lastName.join(' ')
        }
    }

    static save(person) {
        if(!['cpf', 'name', 'lastName'].every(prop => person[prop])) {
            throw new Error(`Cannot save invalid person: ${JSON.stringify(person)}`)
        }

        console.log('Person saved!', person)
    }

    static process(person) {
        this.validate(person)
        const formattedPerson = this.format(person)
        this.save(formattedPerson)
       
        return 'ok'
    }
}

Person.process({
    name: 'Zezin da Silva', 
    cpf: '123.456.789-00'
})

export default Person;