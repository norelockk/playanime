import { ref, onMounted, onUnmounted } from 'vue';
import { Timeout } from '@/types/interfaces';

export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function createInterval(callback: () => void, ms: number) {
	const timeoueId = ref<Timeout>();

	onMounted(() => {
		timeoueId.value = setInterval(callback, ms);
	});

	onUnmounted(() => {
		clearInterval(timeoueId.value);
	});

	return timeoueId;
}