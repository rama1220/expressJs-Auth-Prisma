import bcrypt from 'bcrypt'
import { config } from 'dotenv'

config()

const bcryptRound = Number(process.env.BCRYPT_ROUND)
const password = 'password'

// create hash
const hash = bcrypt.hashSync(password, bcryptRound)
console.log('hash', hash)

// compare hash
const checkTrue = bcrypt.compareSync('password', hash)
console.log('checkTrue', checkTrue)

const checkFalse = bcrypt.compareSync('otherpassword', hash)
console.log('checkFalse', checkFalse)
