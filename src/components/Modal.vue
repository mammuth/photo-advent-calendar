<template>
  <transition name="modal" @after-leave="modalVisible = false">
    <div v-if="modalVisible" class="modal-overlay" @click="close">
      <div :class="['modal-content', { 'scale-out': isClosing }]" @click.stop>
        <button class="close-button" @click="close">✖️</button>
        <div v-if="contentType === 'image'" class="content-container">
          <img :src="contentUrl" @click="close" />
        </div>
        <div v-if="contentType === 'video'" class="content-container">
          <video controls :src="contentUrl" @click="close"></video>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isVisible: boolean;
  contentUrl: string;
  contentType: "image" | "video";
}>();

const emit = defineEmits(["close"]);

const modalVisible = ref(props.isVisible);
const isClosing = ref(false);

const close = () => {
  isClosing.value = true;
  setTimeout(() => {
    emit("close");
    isClosing.value = false;
  }, 300); // Match the duration of the scaleOut animation
};

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      modalVisible.value = true;
    } else {
      close();
    }
  },
);
</script>

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
  width: 95vw;
  height: 95vh;
  max-width: 95vw;
  max-height: 95vh;
  overflow: hidden;
  animation: scaleIn 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img,
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
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

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 16px;
    background-color: white;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
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
