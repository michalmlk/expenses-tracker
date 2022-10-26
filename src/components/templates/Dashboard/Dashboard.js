import React, { useState } from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import { CategoriesWrapper } from '../../atoms/CategoriesWrapper/CategoriesWrapper.styles'
import BudgetCard from '../../organisms/BudgetCard/BudgetCard'
import AddBudgetModal from '../../molecules/AddBudgetModal/AddBudgetModal'
import AddExpenseModal from '../../molecules/AddExpenseModal/AddExpenseModal'
import { useBudgets } from '../../../hooks/useBudgets'

const Dashboard = () => {
	const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false)
	const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)

	const showBudgetModalHandler = () => setIsBudgetModalVisible(true)
	const showExpenseModalHandler = () => setIsExpenseModalVisible(true)
	const closeBudgetModalHandler = () => setIsBudgetModalVisible(false)
	const closeExpenseModalHandler = () => setIsExpenseModalVisible(false)

	const { budgets, getBudgetExpenses } = useBudgets()

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
						return <BudgetCard key={budget.id} title={budget.name} amount={amount} limit={budget.limit} />
					})}
				</CategoriesWrapper>
			</Container>
			<AddBudgetModal show={isBudgetModalVisible} handleCloseModal={closeBudgetModalHandler} />
			<AddExpenseModal show={isExpenseModalVisible} handleCloseModal={closeExpenseModalHandler} />
		</>
	)
}

export default Dashboard
