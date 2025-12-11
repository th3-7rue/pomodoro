import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import AddForm from './AddForm.svelte';
import { todos } from './store';

describe('AddForm', () => {
    beforeEach(() => {
        todos.set([]);
        localStorage.clear();
    });

    it('should render input and button', () => {
        const { getByPlaceholderText, getByText } = render(AddForm);
        expect(getByPlaceholderText('Scrivi qui')).toBeInTheDocument();
        expect(getByText('Aggiungi')).toBeInTheDocument();
    });

    it('should add todo on submit', async () => {
        const { getByPlaceholderText, getByText } = render(AddForm);
        const input = getByPlaceholderText('Scrivi qui');
        const button = getByText('Aggiungi');

        await fireEvent.input(input, { target: { value: 'New Task' } });
        await fireEvent.click(button);

        const currentTodos = get(todos);
        expect(currentTodos).toHaveLength(1);
        expect(currentTodos[0].title).toBe('New Task');
        expect(currentTodos[0].done).toBe(false);

        // Check localStorage is updated (as implemented in component)
        const stored = JSON.parse(localStorage.getItem('todos'));
        expect(stored).toHaveLength(1);
        expect(stored[0].title).toBe('New Task');
    });

    it('should not add todo if input is empty', async () => {
        const { getByText } = render(AddForm);
        const button = getByText('Aggiungi');

        await fireEvent.click(button);

        const currentTodos = get(todos);
        expect(currentTodos).toHaveLength(0);
    });

    it('should clear input after successful add', async () => {
        const { getByPlaceholderText, getByText } = render(AddForm);
        const input = getByPlaceholderText('Scrivi qui');
        const button = getByText('Aggiungi');

        await fireEvent.input(input, { target: { value: 'Task' } });
        await fireEvent.click(button);

        expect(input.value).toBe('');
    });
});
