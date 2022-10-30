import React from 'react'
import BudgetCard from '../../organisms/BudgetCard/BudgetCard'
import { UNCATEGORIZED_BUDGET_ID } from '../../../contexts/BudgetsContext'
import { useBudgets } from '../../../contexts/BudgetsContext'

const UncategorizedBudgetCard = props => {
	const { getBudgetExpenses } = useBudgets()
	const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
	return amount !== 0 ? <BudgetCard gray {...props} title='Uncategorized' amount={amount} /> : null
}

export default UncategorizedBudgetCard
