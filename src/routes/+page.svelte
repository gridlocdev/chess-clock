<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import PlayerTimer from '$lib/components/PlayerTimer.svelte';
	import type { GameStateType } from '$lib/models/gamestate';

	let isMobileDevice = $state(false);
	let mobileAudioEnabled = $state(false);
	let audioSingleton = $state<HTMLAudioElement | null>(null);

	// Simplified game state - just use $state directly
	let gameStateValue = $state<GameStateType>('reset');

	// Use $derived for computed form class
	let formClass = $derived(isMobileDevice ? 'form-container-mobile' : 'form-container-desktop');

	let player1TimerActive = $state(true);
	let player2TimerActive = $state(false);
	let defaultMinutes = $state(5);
	let defaultSeconds = $state(0);

	let snackbarMessage = $state('');
	let snackbarVisible = $state(false);

	// Initialize audio and detect mobile device on mount
	$effect(() => {
		isMobileDevice = detectMobileDevice(window.navigator.userAgent);

		const audio = new Audio();
		audio.src = '/assets/audio/chime.mp3';
		audio.load();
		audio.volume = 0.5;
		audioSingleton = audio;
	});

	function detectMobileDevice(userAgent: string): boolean {
		return /iPhone|iPad|iPod|Android/i.test(userAgent);
	}

	function setMobileAudioState() {
		mobileAudioEnabled = !mobileAudioEnabled;
		if (mobileAudioEnabled && audioSingleton) {
			audioSingleton.play();
		}
	}

	function playGameEndAudio() {
		if (audioSingleton) {
			audioSingleton.play();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			switchTimers();
		}
	}

	function validateIsKeyPressNumber(event: KeyboardEvent): boolean {
		const key = event.key;

		if (/^[0-9]$/.test(key)) {
			return true;
		}

		event.preventDefault();
		return false;
	}

	function switchTimers() {
		player1TimerActive = !player1TimerActive;
		player2TimerActive = !player2TimerActive;
	}

	function startGame() {
		gameStateValue = 'active';
	}

	function resetGame() {
		closeSnackBar();
		gameStateValue = 'reset';
	}

	function pauseGame() {
		gameStateValue = 'paused';
	}

	function endGame() {
		if (mobileAudioEnabled) {
			playGameEndAudio();
		}
		gameStateValue = 'ended';
		openSnackBar('Timer complete!');
	}

	function openSnackBar(message: string) {
		snackbarMessage = message;
		snackbarVisible = true;
	}

	function closeSnackBar() {
		snackbarVisible = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="app-container">
	<Navbar {mobileAudioEnabled} onMobileAudioToggle={setMobileAudioState} />

	<div class="content-container">
		<div class="card">
			<form class={formClass}>
				<div class="form-row">
					<span style="opacity: 0.75;">Starting time:</span>
				</div>
				<div class="form-row">
					<div class="form-field">
						<label for="minutes">Minutes</label>
						<input
							id="minutes"
							type="number"
							min="0"
							placeholder="Number of Minutes"
							bind:value={defaultMinutes}
							onkeypress={validateIsKeyPressNumber}
						/>
					</div>
				</div>
				<div class="form-row">
					<div class="form-field">
						<label for="seconds">Seconds</label>
						<input
							id="seconds"
							type="number"
							min="0"
							placeholder="Number of Seconds"
							bind:value={defaultSeconds}
							onkeypress={validateIsKeyPressNumber}
						/>
					</div>
				</div>
				<div class="form-row hide-mobile">
					<button type="button" onclick={switchTimers}>Switch starting player</button>
				</div>
			</form>

			<div class="flex-row flex-center">
				<h4 class:hidden={isMobileDevice} style="margin: 0; opacity: 0.75;">
					Press <b><kbd>spacebar</kbd></b> or <b><kbd>enter</kbd></b> to switch the timer to the other
					player!
				</h4>
				<h4 class:hidden={!isMobileDevice} style="margin: 0; opacity: 0.75;">
					Tap <b>Switch</b> to move the timer to the other player!
				</h4>
			</div>
		</div>

		<div class="flex-row flex-space-around">
			<PlayerTimer
				playerName="Player 1"
				active={player1TimerActive}
				{defaultMinutes}
				{defaultSeconds}
				gameState={gameStateValue}
				onEndOfGame={endGame}
			/>
			<PlayerTimer
				playerName="Player 2"
				active={player2TimerActive}
				{defaultMinutes}
				{defaultSeconds}
				gameState={gameStateValue}
			/>
		</div>

		<div class="button-container flex-column flex-center" class:mobile-mode={isMobileDevice}>
			{#if isMobileDevice}
				<div class="flex-row flex-center">
					<button class="custom-button-md button-switch" onclick={switchTimers}>Switch</button>
				</div>
			{/if}

			{#if gameStateValue === 'reset'}
				<div class="button-group">
					<button class="custom-button-md button-start" onclick={startGame}>Start</button>
				</div>
			{:else if gameStateValue === 'active'}
				<div class="button-group">
					<button class="custom-button-md button-pause" onclick={pauseGame}>Pause</button>
					<button class="custom-button-md button-reset" onclick={resetGame}>Reset</button>
				</div>
			{:else if gameStateValue === 'paused'}
				<div class="button-group">
					<button class="custom-button-md button-resume" onclick={startGame}>Resume</button>
					<button class="custom-button-md button-reset" onclick={resetGame}>Reset</button>
				</div>
			{:else if gameStateValue === 'ended'}
				<div class="button-group">
					<button class="custom-button-md button-reset" onclick={resetGame}>Reset</button>
				</div>
			{/if}
		</div>
	</div>
</div>

{#if snackbarVisible}
	<div class="snackbar">
		{snackbarMessage}
		<button onclick={closeSnackBar}>Close</button>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: Roboto, 'Helvetica Neue', sans-serif;
		background-color: #fafafa;
	}

	.app-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		gap: 2.5%;
		padding: 20px;
	}

	@media (max-width: 599px) {
		.content-container {
			gap: 7.5%;
		}
	}

	@media (min-width: 600px) and (max-width: 959px) {
		.content-container {
			gap: 5%;
		}
	}

	.card {
		background: white;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 24px;
		margin-bottom: 20px;
	}

	.form-container-mobile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.form-container-desktop {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		gap: 16px;
	}

	.form-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-field label {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.6);
	}

	.form-field input {
		padding: 16px 12px;
		border: 1px solid rgba(0, 0, 0, 0.23);
		border-radius: 4px;
		font-size: 16px;
		background-color: #f5f5f5;
	}

	.form-field input:focus {
		outline: 2px solid #1976d2;
		background-color: white;
	}

	button {
		background-color: #1976d2;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		text-transform: uppercase;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #1565c0;
	}

	button:focus {
		outline: 2px solid rgba(25, 118, 210, 0.5);
		outline-offset: 2px;
	}

	.hide-mobile {
		display: flex;
	}

	@media (max-width: 959px) {
		.hide-mobile {
			display: none !important;
		}
	}

	.hidden {
		display: none;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.flex-center {
		justify-content: center;
		align-items: center;
	}

	.flex-space-around {
		justify-content: space-around;
	}

	.button-container {
		gap: 5%;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.custom-button-md {
		padding: 12px 24px;
		font-size: 1.5em;
		width: 100%;
		min-width: 200px;
		margin: auto;
		white-space: nowrap;
	}

	.button-container:not(.mobile-mode) .custom-button-md {
		min-width: 250px;
	}

	@media (min-width: 960px) {
		.button-container:not(.mobile-mode) .custom-button-md {
			min-width: 300px;
		}
	}

	.button-container.mobile-mode .button-switch {
		width: 75%;
	}

	@media (min-width: 960px) {
		.button-container.mobile-mode .button-switch {
			width: 50%;
		}
	}

	.button-pause {
		background-color: rgb(206, 168, 0);
		color: white;
	}

	.button-pause:hover {
		background-color: rgb(186, 148, 0);
	}

	.button-reset {
		background-color: rgb(169, 20, 9);
		color: white;
	}

	.button-reset:hover {
		background-color: rgb(149, 10, 0);
	}

	.button-resume {
		background-color: rgb(0, 189, 126);
		color: white;
	}

	.button-resume:hover {
		background-color: rgb(0, 169, 106);
	}

	.button-start {
		background-color: rgb(40, 168, 68);
		color: white;
	}

	.button-start:hover {
		background-color: rgb(30, 148, 58);
	}

	.button-switch {
		background-color: rgb(0, 103, 187);
		color: white;
	}

	.button-switch:hover {
		background-color: rgb(0, 83, 167);
	}

	.snackbar {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #323232;
		color: white;
		padding: 14px 24px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		gap: 16px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
		z-index: 2000;
	}

	.snackbar button {
		background: none;
		border: none;
		color: #bb86fc;
		padding: 0;
		text-transform: uppercase;
		font-weight: 500;
		cursor: pointer;
	}

	.snackbar button:hover {
		background: none;
		color: #d0a1ff;
	}
</style>
