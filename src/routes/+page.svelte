<script lang="ts">
	import type { PageData } from './+page.server';

	export let data: PageData;
</script>

<div>
	<header class="bg-white max-w-6xl mx-auto py-4 px-6">
		<div class="text-xl text-slate-700 font-bold flex justify-center items-center">🕌 hyd.life</div>
		<div class="text-sm text-slate-700 flex justify-center items-center">
			<span>Updated at: {data.metadata.modifiedDate}</span>
		</div>
	</header>
	<div
		class="relative bg-cover bg-center text-center py-16 lg:py-32"
		style="background-image:url('/images/hero5.webp')"
	>
		<h1 class="text-2xl sm:text-4xl lg:text-4xl font-bold text-white">
			A curated list of recos for Hyderabad
		</h1>
		<p class="mt-2 text-base sm:text-lg lg:text-2xl text-white">Stop getting lost on Google.</p>
	</div>

	<main class="bg-white max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
		{#each Object.entries(data.listings) as [category, details]}
			<div class="bg-white border border-gray-200 rounded-lg">
				<h2 class="flex items-center font-semibold text-lg mb-2 relative">
					<span class="pl-3">{details.emoji}</span><span class="ml-2 text-slate-700 p-2 text-base"
						>{category}</span
					>
					<div class="absolute bottom-0 left-0 w-full border-b border-gray-300"></div>
				</h2>

				<ul class="pl-4 counter-reset pb-2">
					{#each details.places as nameWithLocation}
						<li class="mb-1 counter-increment group p-0.5">
							<a
								href={nameWithLocation.location}
								class="flex items-center no-underline text-sm"
								target="_blank"
								rel="noopener noreferrer"
								><span class="counter text-slate-300 mr-2"></span><span
									class="text-slate-500 underline underline-offset-4">{nameWithLocation.name}</span
								><span
									class="ml-2 text-slate-500 transform rotate-[-45deg] inline-block group-hover:no-underline"
									>→</span
								></a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</main>
	<footer
		class="max-w-6xl mx-auto bg-white py-4 px-6 flex overflow-x-auto justify-between items-center"
	>
		<div class="text-slate-600 whitespace-nowrap">
			curated with 💚 and <a
				href="https://kit.svelte.dev/"
				target="_blank"
				rel="noopener noreferrer">Svelte</a
			>
		</div>
		<div class="flex space-x-2 text-slate-500 mx-5">
			<a href="https://www.pondy.life/" target="_blank" rel="noopener noreferrer"
				>Inspiration pondy.life</a
			>
		</div>
	</footer>
</div>

<style>
	.counter-increment {
		counter-increment: list-counter;
	}

	.counter-reset {
		counter-reset: list-counter;
	}

	.counter:before {
		content: counter(list-counter) '. ';
		color: #cbd5e1;
		margin-right: 0.5rem;
		pointer-events: none;
	}
</style>
