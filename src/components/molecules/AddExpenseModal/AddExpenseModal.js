import React, { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useBudgets } from '../../../hooks/useBudgets'

const AddExpenseModal = ({ show, handleCloseModal }) => {
	const nameRef = useRef()
	const amountRef = useRef()
	const { addBudget } = useBudgets()

	const handleSubmit = e => {
		e.preventDefault()
		addBudget({
			name: nameRef.current.value,
			limit: parseFloat(amountRef.current.value),
		})
		nameRef.current.value = ''
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
					<Form.Group controlId='name'>
						<Form.Label className='mb-3'>Name</Form.Label>
						<Form.Control type='text' required ref={nameRef} />
					</Form.Group>

					<Form.Group controlId='limit'>
						<Form.Label className='mb-3'>Amount</Form.Label>
						<Form.Control type='number' required ref={amountRef} />
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
