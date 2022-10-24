import React from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import { CategoriesWrapper } from '../../atoms/CategoriesWrapper/CategoriesWrapper.styles'
import BudgetCard from '../../organisms/BudgetCard/BudgetCard'

const Dashboard = () => {
	return (
		<Container className='my-4'>
			<Stack direction='horizontal' gap='2' className='mb-4'>
				<h1 className='me-auto'>Wallet</h1>
				<Button variant='primary'>Add budget</Button>
				<Button variant='outline-primary'>Add expense</Button>
			</Stack>
			<CategoriesWrapper>
				<BudgetCard title='budget' amount={100} limit={1000} />
			</CategoriesWrapper>
		</Container>
	)
}

export default Dashboard
