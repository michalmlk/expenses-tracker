import React, { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useBudgets } from '../../../contexts/BudgetsContext'

const AddBudgetModal = ({ show, handleCloseModal }) => {
	const nameRef = useRef()
	const limitRef = useRef()
	const { addBudget } = useBudgets()

	const handleSubmit = e => {
		e.preventDefault()
		addBudget({
			name: nameRef.current.value,
			limit: parseFloat(limitRef.current.value),
		})
		nameRef.current.value = ''
		limitRef.current.value = ''
		handleCloseModal()
	}

	return (
		<Modal show={show} onHide={handleCloseModal}>
			<Form onSubmit={handleSubmit}>
				<Modal.Header>
					<Modal.Title>New budget</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId='name'>
						<Form.Label className='mb-3'>Name</Form.Label>
						<Form.Control type='text' required ref={nameRef} />
					</Form.Group>

					<Form.Group controlId='limit'>
						<Form.Label className='mb-3'>Maximum limit</Form.Label>
						<Form.Control type='number' required ref={limitRef} min={0} step={0.01} />
					</Form.Group>
					<div className='d-flex justify-content-end'>
						<Button variant='primary' type='submit' className='mt-3'>
							Add budget
						</Button>
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	)
}
export default AddBudgetModal
