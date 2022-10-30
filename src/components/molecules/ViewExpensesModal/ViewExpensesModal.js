import React from 'react'
import { Modal, Button, Stack } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../../contexts/BudgetsContext'
import { currencyFormat } from '../../../utils/currencyUtil'

const ViewExpensesModal = ({ handleCloseModal, budgetId }) => {
	const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

	const expenses = getBudgetExpenses(budgetId)

	const budget =
		UNCATEGORIZED_BUDGET_ID === budgetId ? { name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID } : budgets.find(b => b.id === budgetId)
	return (
		<Modal show={budgetId != null} onHide={handleCloseModal}>
			<Modal.Header>
				<Stack direction='horizontal' gap='2'>
					<div>Expenses ({budget?.name})</div>
					{budgetId !== UNCATEGORIZED_BUDGET_ID && (
						<Button
							variant='outline-danger'
							onClick={() => {
								deleteBudget(budget)
								handleCloseModal()
							}}>
							Delete
						</Button>
					)}
				</Stack>
			</Modal.Header>
			<Modal.Body>
				<Stack direction='vertical'>
					{expenses.map(expense => (
						<Stack direction='horizontal'>
							<div className='me-auto fs-4'>{expense.description}</div>
							<div className='fs-5'>{currencyFormat.format(expense.amount)}</div>
							<Button onClick={() => deleteExpense(expense)} size='sm' variant='outline-danger'>
								&times;
							</Button>
						</Stack>
					))}
				</Stack>
			</Modal.Body>
		</Modal>
	)
}
export default ViewExpensesModal
