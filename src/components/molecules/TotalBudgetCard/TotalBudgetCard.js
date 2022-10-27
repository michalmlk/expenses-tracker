import React from 'react'
import { useBudgets } from '../../../hooks/useBudgets'
import BudgetCard from '../../organisms/BudgetCard/BudgetCard'

const TotalBudgetCard = () => {
	const { expenses, budgets } = useBudgets()
	const amount = expenses.reduce((total, expense) => total + expense.amount)
	const limit = budgets.reduce((total, budget) => total + budget.limit)

	return limit !== 0 ? <BudgetCard gray title='Total' amount={amount} limit={limit} /> : null
}

export default TotalBudgetCard
