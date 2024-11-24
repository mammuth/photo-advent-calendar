<template>
    <div class="calendar" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <h1 class="title">{{ calendar.title }}</h1>
        <p class="description">{{ calendar.description }}</p>
        <div class="doors">
            <div v-for="day in 24" :key="day" class='door' :class="{ opened: openedDoors.includes(day) }"
                @click="handleDoorClick(day)" :style="{ backgroundImage: `url(${getImageUrl(day)})` }">
                <div class="label">{{ day }}</div>
            </div>
        </div>
        <Modal v-if="isModalVisible" :isVisible="isModalVisible" :contentUrl="modalContentUrl"
            :contentType="modalContentType" @close="closeModal" />
        <a href="#" @click="resetDoors">Reset doors</a>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CalendarData } from '@/data/calendars';

import { useDoorsStore } from '@/stores/doors';

import Modal from '@/components/Modal.vue';
import backgroundImage from '@/assets/background.jpg';

const doorsStore = useDoorsStore();

const { openedDoors, openDoor, resetDoors } = doorsStore;

const props = defineProps<{
    calendar: CalendarData;
}>();

const isModalVisible = ref(false);
const modalContentUrl = ref('');
const modalContentType = ref<'image' | 'video'>('image');

const handleDoorClick = (day: number) => {
    if (!openedDoors.includes(day)) {
        openDoor(day);
    } else {
        showModal(day);
    }
};

const getImageUrl = (day: number) => {
    const supportedExtensions = ['svg', 'jpg', 'jpeg', 'png'];
    const images: { [key: string]: { default: string } } = import.meta.glob('/src/assets/calendars/**/*.{svg,jpg,jpeg,png}', { eager: true });

    for (const ext of supportedExtensions) {
        const filePath = `/src/assets/calendars/${props.calendar.slug}/${day}.${ext}`;
        if (images[filePath]) {
            console.log('images[filePath].default', images[filePath].default);
            return images[filePath].default;
        }
    }

    return '';
};

const showModal = (day: number) => {
    modalContentUrl.value = getImageUrl(day) + '?url';
    // todo support video
    modalContentType.value = 'image';
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};
</script>

<style scoped>
.calendar {
    width: 100vw;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    background-color: #830000;
}


.title,
.description {
    color: white;
    font-family: 'Mountains of Christmas', cursive;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    padding: 0 10px;
}

.title {
    padding-top: 30px;
    font-weight: bold;
    font-size: 2.5rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.description {
    font-size: 1.5rem;
    text-align: center;
}

.doors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    padding: 20px;
}

.door {
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    font-size: 22px;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 auto;
    background-size: cover;
    background-position: center center;

    &:not(.opened) {
        background-image: none !important;
    }
}

.door:hover {
    transform: scale(1.05);
}

a {
    color: white;
}
</style>