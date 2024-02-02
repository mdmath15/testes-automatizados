export function mapPerson(personStr) {
    const { name, age } = JSON.parse(personStr);

    return {
        name,
        age: age,
        createdAt: new Date()
    }
}   