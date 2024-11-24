<template>
    <template v-if="calendarData">
        <Calendar :calendar="calendarData" />
    </template>
    <template v-else>
        <p>Calendar {{slug}} not found. Double check your configuration in calendars.ts</p>
    </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Calendar from '@/components/Calendar.vue';
import { calendars } from '@/data/calendars';

const props = defineProps<{
  slug: string;
}>();

const calendarData = computed(() => {
  return calendars.find(calendar => calendar.slug === props.slug);
});
</script>

