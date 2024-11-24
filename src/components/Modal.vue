<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  contentUrl: string;
  contentType: 'image' | 'video';
}>();

const emit = defineEmits(['close']);

const modalVisible = ref(props.isVisible);
const isClosing = ref(false);

const close = () => {
  isClosing.value = true;
  setTimeout(() => {
    emit('close');
    isClosing.value = false;
  }, 300); // Match the duration of the scaleOut animation
};

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    modalVisible.value = true;
  } else {
    close();
  }
});
</script>

<template>
  <transition name="modal" @after-leave="modalVisible = false">
    <div v-if="modalVisible" class="modal-overlay" @click="close">
      <div :class="['modal-content', { 'scale-out': isClosing }]" @click.stop>
        <button class="close-button" @click="close">✖️</button>
        <div v-if="contentType === 'image'" class="content-container">
          <img :src="contentUrl" alt="Fullscreen content" @click="close" />
        </div>
        <div v-if="contentType === 'video'" class="content-container">
          <video controls :src="contentUrl" @click="close"></video>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: fadeIn 0.3s;
}

.modal-content {
  position: relative;
  border-radius: 8px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  animation: scaleIn 0.3s;
}

.modal-content.scale-out {
  animation: scaleOut 0.3s forwards;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.content-container {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img, video {
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.8);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.8);
  }
}
</style>