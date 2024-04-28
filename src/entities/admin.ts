import { Entity } from 'src/core/entity'
import { Optional } from 'src/core/types/optional'

interface AdminProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export class Admin extends Entity<AdminProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<AdminProps, 'createdAt'>, id?: string) {
    const admin = new Admin(
      {
        createdAt: new Date(),
        ...props,
      },
      id,
    )

    return admin
  }
}
