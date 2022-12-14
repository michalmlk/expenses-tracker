import React, { createContext, useContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

export const BudgetsContext = createContext({
	budgets: [],
	expenses: [],
	getBudgetExpenses: () => {},
	addExpense: () => {},
	addBudget: () => {},
	deleteBudget: () => {},
	deleteExpense: () => {},
})

export const useBudgets = () => {
	return useContext(BudgetsContext)
}

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export const BudgetsProvider = ({ children }) => {
	const [budgets, setBudgets] = useLocalStorage('budgets', [])
	const [expenses, setExpenses] = useLocalStorage('expenses', [])

	const getBudgetExpenses = budgetId => {
		return expenses.filter(expense => expense.budgetId === budgetId)
	}

	const addExpense = ({ name, description, amount, budgetId }) => {
		setExpenses(prevExpenses => {
			return [{ id: uuidV4(), name, amount, description, budgetId }, ...prevExpenses]
		})
	}

	const addBudget = ({ name, limit }) => {
		setBudgets(prevBudgets => {
			if (prevBudgets.some(prevBudget => prevBudget.name === name)) {
				return prevBudgets
			}
			return [{ id: uuidV4(), name, limit }, ...prevBudgets]
		})
	}
	const deleteBudget = ({ id }) => {
		setExpenses(prevExpenses => {
			return prevExpenses.map(expense => {
				if (expense.budgetId !== id) return expense
				return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
			})
		})
		const updatedBudgets = budgets.filter(budget => budget.id !== id)
		setBudgets(updatedBudgets)
	}

	const deleteExpense = ({ id }) => {
		const updatedExpenses = expenses.filter(expense => expense.id !== id)
		setExpenses(updatedExpenses)
	}

	return (
		<BudgetsContext.Provider
			value={{
				budgets,
				expenses,
				getBudgetExpenses,
				addExpense,
				addBudget,
				deleteBudget,
				deleteExpense,
			}}>
			{children}
		</BudgetsContext.Provider>
	)
}
