export class InvalidEmailError extends Error {
  constructor() {
    super(`Invalid email address.`)
  }
}
