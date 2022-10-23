import randomizerInteger from "@/helpers/randomizerInteger"


describe('Pruebas en el generador de un Integer Random', () => {
  test('El valor devuelto tiene que es entre un entero y el valor max', () => {
    const max = 10
    const result = randomizerInteger(10)

    expect(result).toEqual(expect.any(Number))
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(max)
  })
})