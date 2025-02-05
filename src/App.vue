<script setup>
import { RouterView } from 'vue-router'
import { auth } from '../firebase/firebase'
import { onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Usuario autenticado:", user)
    } else {
      console.log("Usuario no autenticado")
    }
  })
})
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style scoped></style>
