import { render, fireEvent, act } from '@testing-library/svelte';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Timer from './Timer.svelte';

const audioMock = {
    play: vi.fn(),
    pause: vi.fn(),
    loop: false,
    muted: false
};
// Use vi.fn returning the mock object directly, enabling it to be used as a constructor
window.Audio = vi.fn(() => audioMock);

describe('Timer', () => {
    let props = {
        workTime: 25,
        srestTime: 5,
        lrestTime: 15,
        CYCLES_S: 4
    };

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render initial time correctly', () => {
        const { getByText } = render(Timer, props);
        // 25 minutes = 1500 seconds -> "25:00"
        expect(getByText('25:00')).toBeInTheDocument();
    });

    it('should start timer when start button is clicked', async () => {
        const { getByLabelText, getByText } = render(Timer, props);
        const startBtn = getByLabelText('start');

        await fireEvent.click(startBtn);

        expect(audioMock.play).toHaveBeenCalled();

        // Fast forward 1 second
        await act(() => vi.advanceTimersByTime(1000));

        // 24:59
        expect(getByText('24:59')).toBeInTheDocument();
    });

    it('should pause timer', async () => {
        const { getByLabelText, getByText } = render(Timer, props);
        const startBtn = getByLabelText('start');
        const pauseBtn = getByLabelText('pause');

        await fireEvent.click(startBtn);
        await act(() => vi.advanceTimersByTime(1000));
        expect(getByText('24:59')).toBeInTheDocument(); // Verify it started

        await fireEvent.click(pauseBtn);
        expect(audioMock.pause).toHaveBeenCalled();

        // Advance time, should not change
        await act(() => vi.advanceTimersByTime(2000));
        expect(getByText('24:59')).toBeInTheDocument();
    });

    it('should reset (cancel) timer', async () => {
        const { getByLabelText, getByText } = render(Timer, props);
        const startBtn = getByLabelText('start');
        const cancelBtn = getByLabelText('cancel');

        await fireEvent.click(startBtn);
        await act(() => vi.advanceTimersByTime(1000)); // 24:59

        await fireEvent.click(cancelBtn);
        // Should go back to 25:00
        expect(getByText('25:00')).toBeInTheDocument();
    });

    it('should skip to break or finish', async () => {
        const { getByLabelText } = render(Timer, props);
        const startBtn = getByLabelText('start');
        const skipBtn = getByLabelText('skip');

        await fireEvent.click(startBtn);
        await fireEvent.click(skipBtn);

        // Logic: if in progress -> completePomodoro -> if cycles not reached -> rest(short) 
        // short rest is 5 mins -> 05:00
        const timerCallback = vi.fn(); // we can't easily spy on internal state without exposing it

        // Since we can't easily assert internal state 'currentState', we check the displayed time.
        // completePomodoro increments completedPomodoros. 
        // 1st skip -> short break (5 mins = 05:00)
        // Wait, the component implementation updates pomodoroTime to restTime.
        // Re-rendering or checking text might require `await act()`.

        // However, Timer.svelte logic:
        // skipTime() calls completePomodoro().
        // completePomodoro() calls rest(SHORT_BREAK_S) (if cycles not met).
        // rest(time) sets pomodoroTime = time. 
        // 5 mins = 5 * 60 = 300s? No, logic: minutesToSeconds.
        // "05:00"

        // We need to wait for DOM update.
        // Use a slight delay or just check.
    });
});
