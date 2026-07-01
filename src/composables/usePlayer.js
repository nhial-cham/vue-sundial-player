// Import the vue.js functions
import { ref, computed } from "vue";
// Import the Tracks dataset
import trackList from "../data/tracks.js";

// State: shared singleton across every component
const queue = ref ([...trackList]);
const currentIndex = ref(0);
const isPlaying = ref(false);
const progress = ref(0); // Secons elapsed in the current track
const volume = ref(0.8);

let tickInterval = null;

export default function usePlayer() {

    const currentTrack = computed(() => queue.value[currentIndex.value]);

    const progressPercent = computed(() => {
        if (!currentTrack.value) return 0;
        return (progress.value / currentTrack.value.duration) * 100;
    });

    const formattedProgress = computed(() => formatTime(progress.value));

    const formattedDuration = computed(() =>
        currentTrack.value ? formatTime(currentTrack.value.duration) : "0:00"
    );

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60); 
        const s = Math.floor(seconds % 60).toString().padStart(2, "0");
        return '${m}:${s}';
    }
}