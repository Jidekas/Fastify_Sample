// import { upperTest } from "../../src/utils/hash"

const upper2 = (arg: string)=>{
    return arg.toLocaleUpperCase()
}


describe('utils hash test', ()=>{

    test('upperTest should return uppercase', ()=>{
        const result = upper2("abcd")
        expect(result).toBe('ABCD')
    })
})