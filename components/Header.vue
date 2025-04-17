<template>
  <div class="bg-cover bg-center h-40 md:h-64 flex items-center justify-center flex-col mb-10"
       style="background-image: url('/images/backgroundDetails.jpg');">
    <h1 class="text-gray-800 text-3xl font-semibold mb-3">{{ headerData.title }}</h1>
    <div v-if="headerData.breadCrumbs.length" class="text-sm text-gray-500 space-x-2">
      <NuxtLink to="/" @click="resetHeaderData">Home</NuxtLink> / <span> {{ headerData.breadCrumbs }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const headerData = useState("headerData");
const resetHeaderData = () => headerData.value.breadCrumbs = "";
</script>
