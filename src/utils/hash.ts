import crypto, { pbkdf2, pbkdf2Sync } from 'crypto'

export const hashPassword = (password: string)=>{
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex")
    return {hash, salt}
}
export const verifyPassword = ({loginPassword, salt, hash}: {loginPassword: string, salt:string, hash: string})=>{
    const loginHash = pbkdf2Sync(loginPassword, salt, 1000, 64, 'sha512').toString("hex")
    return loginHash === hash
}