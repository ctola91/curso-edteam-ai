<script lang="ts" setup>
import Logo from '/logo.png'
</script>
<template>
  <UContainer as="div" class="flex justify-center align-center p-4">
    <UCard>
      <div>
        <img :src="Logo" alt="logo" width="320" />
      </div>
      <template #footer>
        <div class="flex flex-row justify-start gap-2 flex-wrap">
          <UButton size="lg" color="indigo" label="Iniciar" />
          <UButton size="lg" color="gray" label="Generar Preguntas" to="/questions" />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
