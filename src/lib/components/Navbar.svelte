<script lang="ts">
	interface NavbarProps {
		mobileAudioEnabled: boolean;
		onMobileAudioToggle: () => void;
	}

	let { mobileAudioEnabled, onMobileAudioToggle }: NavbarProps = $props();
</script>

<nav class="toolbar-container app-toolbar">
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-label="Chess clock icon"
	>
		<path
			d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
		/>
		<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
	</svg>
	<span class="toolbar-title">Chess Clock</span>

	<button class="audio-button" onclick={onMobileAudioToggle} type="button">
		{#if mobileAudioEnabled}
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-label="Volume on"
			>
				<path
					d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
				/>
			</svg>
		{:else}
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-label="Volume off"
			>
				<path
					d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
				/>
			</svg>
		{/if}
	</button>
</nav>

<style>
	.toolbar-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #1976d2;
		color: white;
		padding: 0 16px;
		height: 64px;
		position: sticky;
		position: -webkit-sticky;
		top: 0;
		z-index: 1000;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.toolbar-title {
		flex: 1;
		margin: 0 0.5%;
		font-size: 20px;
		font-weight: 500;
	}

	.icon {
		width: 24px;
		height: 24px;
	}

	.audio-button {
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.5);
		color: white;
		padding: 8px;
		aspect-ratio: 1 / 1;
		cursor: pointer;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		transition: background-color 0.2s;
	}

	.audio-button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.audio-button:focus {
		outline-offset: 2px;
	}

	.app-toolbar {
		position: sticky;
		position: -webkit-sticky;
		top: 0;
		z-index: 1000;
	}
</style>
