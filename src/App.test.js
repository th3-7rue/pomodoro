import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App.svelte';

describe('App', () => {
    // App uses Timer, which uses Audio. We need to verify Audio is mocked globally or mock it here too if tests run in parallel?
    // In Vitest default is threads, so globals are isolated.
    // However, we should mock Audio in setup or here to be safe.
    // And matchMedia if needed for responsive classes? But we just render.

    beforeEach(() => {
        window.Audio = vi.fn(() => ({
            play: vi.fn(),
            pause: vi.fn(),
            loop: false,
            muted: false
        }));

        // Mock dialog
        HTMLDialogElement.prototype.showModal = vi.fn(function () { this.open = true; });
        HTMLDialogElement.prototype.close = vi.fn(function () { this.open = false; });
    });

    it('should render title', () => {
        const { getByText } = render(App);
        expect(getByText('Pomodoro')).toBeInTheDocument();
    });

    it('should rendering To Do section hidden by default', () => {
        const { container } = render(App);
        const todoSection = container.querySelector('#todo');
        expect(todoSection).toHaveClass('hidden');
    });

    it('should toggle To Do section visibility', async () => {
        const { getByText, container } = render(App);
        const todoBtn = getByText('To Do');
        const todoSection = container.querySelector('#todo');

        await fireEvent.click(todoBtn);
        expect(todoSection).not.toHaveClass('hidden');

        await fireEvent.click(todoBtn);
        expect(todoSection).toHaveClass('hidden');
    });

    it('should open personalization modal', async () => {
        const { getByText } = render(App);
        const personalizeBtn = getByText('Personalizza');

        await fireEvent.click(personalizeBtn);
        const dialog = document.querySelector('dialog');
        expect(dialog.showModal).toHaveBeenCalled();
    });
});
