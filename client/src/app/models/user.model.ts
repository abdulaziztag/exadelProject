export interface UserModel {
  name: string
  surname: string
  id: string
  email: string
  country: string
  dateOfBirth: number
  role: string
  categories: [string]
  accounts: [string]
}
