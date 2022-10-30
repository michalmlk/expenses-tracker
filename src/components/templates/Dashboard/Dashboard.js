import React, { useState } from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import { CategoriesWrapper } from '../../atoms/CategoriesWrapper/CategoriesWrapper.styles'
import BudgetCard from '../../organisms/BudgetCard/BudgetCard'
import AddBudgetModal from '../../molecules/AddBudgetModal/AddBudgetModal'
import AddExpenseModal from '../../molecules/AddExpenseModal/AddExpenseModal'
import ViewExpensesModal from '../../molecules/ViewExpensesModal/ViewExpensesModal'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../../contexts/BudgetsContext'
import UncategorizedBudgetCard from '../../molecules/UncategorizedBudgetCard/UncategorizedBudgetCard'
import TotalBudgetCard from '../../molecules/TotalBudgetCard/TotalBudgetCard'

const Dashboard = () => {
	const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false)
	const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)
	const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
	const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
	const { budgets, getBudgetExpenses } = useBudgets()

	const showBudgetModalHandler = () => setIsBudgetModalVisible(prevState => !prevState)
	const showExpenseModalHandler = budgetId => {
		setAddExpenseModalBudgetId(budgetId)
		setIsExpenseModalVisible(prevState => !prevState)
	}

	return (
		<>
			<Container className='my-4'>
				<Stack direction='horizontal' gap='2' className='mb-4'>
					<h1 className='me-auto'>Wallet</h1>
					<Button variant='primary' onClick={showBudgetModalHandler}>
						Add budget
					</Button>
					<Button variant='outline-primary' onClick={showExpenseModalHandler}>
						Add expense
					</Button>
				</Stack>
				<CategoriesWrapper>
					{budgets.map(budget => {
						const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
						return (
							<BudgetCard
								key={budget.id}
								title={budget.name}
								amount={amount}
								limit={budget.limit}
								onAddExpense={() => showExpenseModalHandler(budget.id)}
								onViewExpenses={() => setViewExpensesModalBudgetId(budget.id)}
							/>
						)
					})}
					<UncategorizedBudgetCard
						onAddExpense={showExpenseModalHandler}
						onViewExpenses={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
					/>
					<TotalBudgetCard />
				</CategoriesWrapper>
			</Container>
			<AddBudgetModal show={isBudgetModalVisible} handleCloseModal={showBudgetModalHandler} />
			<AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={isExpenseModalVisible} handleCloseModal={showExpenseModalHandler} />
			<ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleCloseModal={() => setViewExpensesModalBudgetId()} />
		</>
	)
}

export default Dashboard
