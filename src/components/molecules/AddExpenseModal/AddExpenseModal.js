import React, { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../../contexts/BudgetsContext'

const AddExpenseModal = ({ show, handleCloseModal, defaultBudgetId }) => {
	const descriptionRef = useRef()
	const amountRef = useRef()
	const budgetIdRef = useRef()
	const { addExpense, budgets } = useBudgets()

	const handleSubmit = e => {
		e.preventDefault()
		addExpense({
			descriptionRef: descriptionRef.current.value,
			amount: parseFloat(amountRef.current.value),
			budgetId: budgetIdRef.current.value,
		})
		descriptionRef.current.value = ''
		amountRef.current.value = ''
		handleCloseModal()
	}

	return (
		<Modal show={show} onHide={handleCloseModal}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header>
					<Modal.Title>New expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId='description' className='mb-3'>
						<Form.Label className='mb-3'>Description</Form.Label>
						<Form.Control type='text' required ref={descriptionRef} />
					</Form.Group>
					<Form.Group controlId='amount' className='mb-3'>
						<Form.Label className='mb-3'>Amount</Form.Label>
						<Form.Control type='number' required ref={amountRef} />
					</Form.Group>
					<Form.Group controlId='budgetId' className='mb-3'>
						<Form.Label className='mb-3'>Budget</Form.Label>
						<Form.Select required ref={budgetIdRef} defaultValue={defaultBudgetId}>
							<option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
							{budgets.map(budget => {
								return (
									<option key={budget.id} value={budget.id}>
										{budget.name}
									</option>
								)
							})}
						</Form.Select>
					</Form.Group>
					<div className='d-flex justify-content-end'>
						<Button variant='primary' type='submit' className='mt-3'>
							Add
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	)
}
export default AddExpenseModal
