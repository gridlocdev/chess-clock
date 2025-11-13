<script lang="ts">
	import type { GameStateType } from '$lib/models/gamestate';

	interface PlayerTimerProps {
		active: boolean;
		playerName: string;
		gameState: GameStateType;
		defaultMinutes: number;
		defaultSeconds: number;
		onEndOfGame?: () => void;
	}

	let {
		active,
		playerName,
		gameState,
		defaultMinutes,
		defaultSeconds,
		onEndOfGame
	}: PlayerTimerProps = $props();

	let minutes = $state(defaultMinutes);
	let seconds = $state(defaultSeconds);

	// Use $derived for formatted time display
	let formattedMinutes = $derived(minutes < 10 ? `0${minutes}` : `${minutes}`);
	let formattedSeconds = $derived(seconds < 10 ? `0${seconds}` : `${seconds}`);

	// Reset timer when gameState becomes 'reset'
	$effect(() => {
		if (gameState === 'reset') {
			minutes = defaultMinutes;
			seconds = defaultSeconds;
		}
	});

	// Timer interval effect - only runs when active and game is active
	$effect(() => {
		if (!active || gameState !== 'active') {
			return;
		}

		const intervalId = setInterval(() => {
			if (seconds > 0) {
				seconds--;
			} else if (minutes > 0) {
				seconds = 59;
				minutes--;
			} else {
				// Timer has ended
				onEndOfGame?.();
			}
		}, 1000);

		// Cleanup function
		return () => clearInterval(intervalId);
	});
</script>

<div class="player-timer-container">
	<h1 class="player-name-header">
		<b>{playerName}</b>
	</h1>

	<div class="timer-card">
		<h1 class="timer-text">
			<span>{formattedMinutes}</span>
			<span>:</span>
			<span>{formattedSeconds}</span>
		</h1>
	</div>

	<div class="timer-icon-container">
		{#if active}
			<svg
				class="timer-icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-label="Timer active"
			>
				<path
					d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
				/>
				<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
			</svg>
		{/if}
	</div>
</div>

<style>
	.player-timer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.player-name-header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 0 0 16px 0;
	}

	.timer-card {
		background: white;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 24px;
		min-width: 200px;
	}

	.timer-text {
		font-size: 3em;
		margin: 0;
		text-align: center;
	}

	@media (min-width: 600px) and (max-width: 959px) {
		.timer-text {
			font-size: 3.5em;
		}
	}

	@media (min-width: 960px) {
		.timer-text {
			font-size: 4em;
		}
	}

	.timer-icon-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 15%;
		height: 50px;
	}

	.timer-icon {
		width: 50px;
		height: 50px;
	}
</style>
