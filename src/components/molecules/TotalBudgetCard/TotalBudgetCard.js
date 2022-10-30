import { useBudgets } from '../../../contexts/BudgetsContext'
import BudgetCard from '../../organisms/BudgetCard/BudgetCard'

export default function TotalBudgetCard() {
	const { expenses, budgets } = useBudgets()
	const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
	const limit = budgets.reduce((total, budget) => total + budget.limit, 0)
	if (limit === 0) return null

	return <BudgetCard amount={amount} title='Total' gray limit={limit} hideButtons />
}
