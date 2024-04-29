import { InvalidEmailError } from '../errors/invalid-email-error'

export class Email {
  private readonly address: string

  constructor(address: string) {
    if (!this.isValidEmailAddress(address)) {
      throw new InvalidEmailError()
    }
    this.address = address
  }

  getAddress() {
    return this.address
  }

  private isValidEmailAddress(Email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)
  }
}
