import React from 'react'
import { Card, ProgressBar, Button, Stack } from 'react-bootstrap'
import { currencyFormat } from '../../../utils/currencyUtil'
import { StyledCardTitle } from './BudgetCard.styles'

const BudgetCard = ({ title, amount, limit, gray, onAddExpense, onViewExpenses, hideButtons }) => {
	const getProgressBarVariant = (amount, limit) => {
		const ratio = amount / limit
		if (ratio < 0.5) return 'primary'
		if (ratio < 0.75) return 'warning'
		return 'danger'
	}

	const classNames = []
	if (amount > limit) {
		classNames.push('bg-danger', 'bg-opacity-10')
	} else if (gray) {
		classNames.push('bg-light')
	}

	return (
		<Card className={classNames.join(' ')}>
			<Card.Body>
				<StyledCardTitle>
					<div className='me-2'>{title}</div>
					<div className='d-flex align-items-baseline'>
						{currencyFormat.format(amount)}
						{limit && <span className='text-muted fs-6 ms-1'>/ {currencyFormat.format(limit)}</span>}
					</div>
				</StyledCardTitle>
				{limit && <ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, limit)} min={0} max={limit} now={amount} />}
				{!hideButtons && (
					<Stack direction='horizontal' gap='2' className='mt-4'>
						<Button variant='outline-primary' onClick={onAddExpense}>
							Add expense
						</Button>
						<Button variant='outline-secondary' onClick={onViewExpenses}>
							View expenses
						</Button>
					</Stack>
				)}
			</Card.Body>
		</Card>
	)
}

export default BudgetCard
