import { Component, OnInit } from '@angular/core'
import { HomeService } from '../../services/home.service'
import { Transaction } from '../../models/transaction.model'

interface TableElement {
  month: string
  income: number
  expenses: number
  economy: number
  percentage: number
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  january: Transaction[] = []
  february: Transaction[] = []
  march: Transaction[] = []
  april: Transaction[] = []
  may: Transaction[] = []
  june: Transaction[] = []
  july: Transaction[] = []
  august: Transaction[] = []
  september: Transaction[] = []
  october: Transaction[] = []
  november: Transaction[] = []
  december: Transaction[] = []
  tableElements: TableElement[] = []
  displayedColumns: string[] = [
    'month',
    'income',
    'expenses',
    'economy',
    'percentage'
  ]
  toggleButton: string = 'monthly'
  transactions: Transaction[] = []
  constructor(private homeService: HomeService) {}

  filterByMonth(): void {
    this.tableElements = []
    this.january = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 0
      }
    )
    this.february = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 1
      }
    )
    this.march = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 2
      }
    )
    this.april = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 3
      }
    )
    this.may = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 4
      }
    )
    this.june = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 5
      }
    )
    this.july = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 6
      }
    )
    this.august = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 7
      }
    )
    this.september = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 8
      }
    )
    this.october = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 9
      }
    )
    this.november = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 10
      }
    )
    this.december = this.transactions.filter(
      (key: { dateOfTransaction: number }) => {
        return new Date(key.dateOfTransaction).getMonth() === 11
      }
    )
  }

  insertToTableJanuary(): void {
    if (this.january.length === 0) return
    var income = 0
    this.january.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.january.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'January',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableFebruary(): void {
    if (this.february.length === 0) return
    var income = 0
    this.february.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'income') {
          income += key.cash
        }
      }
    )
    var expenses = 0
    this.february.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'expenses') {
          expenses += key.cash
        }
      }
    )
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'February',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableMarch(): void {
    if (this.march.length === 0) return
    var income = 0
    this.march.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.march.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'March',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableApril(): void {
    if (this.april.length === 0) return
    var income = 0
    this.april.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.april.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'April',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableMay(): void {
    if (this.may.length === 0) return
    var income = 0
    this.may.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.may.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'May',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableJune(): void {
    if (this.june.length === 0) return
    var income = 0
    this.june.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.june.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'June',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableJuly(): void {
    if (this.february.length === 0) return
    var income = 0
    this.february.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'income') {
          income += key.cash
        }
      }
    )
    var expenses = 0
    this.february.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'expenses') {
          expenses += key.cash
        }
      }
    )
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'February',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableAugust(): void {
    if (this.august.length === 0) return
    var income = 0
    this.august.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.august.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'August',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableSeptember(): void {
    if (this.september.length === 0) return
    var income = 0
    this.september.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'income') {
          income += key.cash
        }
      }
    )
    var expenses = 0
    this.september.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'expenses') {
          expenses += key.cash
        }
      }
    )
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'September',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableOctober(): void {
    if (this.october.length === 0) return
    var income = 0
    this.october.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      }
    })
    var expenses = 0
    this.october.forEach((key: { typeOfTransaction: string; cash: number }) => {
      if (key.typeOfTransaction === 'expenses') {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'October',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableNovember(): void {
    if (this.november.length === 0) return
    var income = 0
    this.november.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'income') {
          income += key.cash
        }
      }
    )
    var expenses = 0
    this.november.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'expenses') {
          expenses += key.cash
        }
      }
    )
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'November',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableDecember(): void {
    if (this.december.length === 0) return
    var income = 0
    this.december.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'income') {
          income += key.cash
        }
      }
    )
    var expenses = 0
    this.december.forEach(
      (key: { typeOfTransaction: string; cash: number }) => {
        if (key.typeOfTransaction === 'expenses') {
          expenses += key.cash
        }
      }
    )
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'December',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableTotal(): void {
    var income = 0
    var expenses = 0
    this.transactions.forEach((key: any) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      } else {
        expenses += key.cash
      }
    })
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'Total',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  insertToTableAverage(): void {
    var income = 0
    var expenses = 0
    this.transactions.forEach((key: any) => {
      if (key.typeOfTransaction === 'income') {
        income += key.cash
      } else {
        expenses += key.cash
      }
    })
    income = income / this.transactions.length
    expenses = expenses / this.transactions.length
    var economy = income - expenses
    var percentage = (economy / income) * 100
    this.tableElements = [
      ...this.tableElements,
      {
        month: 'Average',
        income,
        expenses,
        economy,
        percentage
      }
    ]
  }
  ngOnInit(): void {
    this.homeService.transactionsList$.subscribe(data => {
      this.transactions = data
      this.filterByMonth()
      this.insertToTableJanuary()
      this.insertToTableFebruary()
      this.insertToTableMarch()
      this.insertToTableApril()
      this.insertToTableMay()
      this.insertToTableJune()
      this.insertToTableJuly()
      this.insertToTableAugust()
      this.insertToTableSeptember()
      this.insertToTableOctober()
      this.insertToTableNovember()
      this.insertToTableDecember()
      this.insertToTableTotal()
      this.insertToTableAverage()
    })
  }
}
