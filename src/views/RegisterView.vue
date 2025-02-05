<script setup>
import { ref } from "vue";
import { auth } from "@/firebase/firebase";
import { Toaster, toast } from "vue-sonner";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const router = useRouter();

const registerUser = async () => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredentials.user;
    console.log(user);
    
    // Enviar verificación de correo electrónico
    await sendEmailVerification(user);
    toast.warning("Verifica el correo electrónico");

    // Redirigir al login
    router.push({ name: "login" });

  } catch (error) {
    toast.error("Error en el registro: " + error.message);
  }
};
</script>


<template>
  <section>
    <h2>Registrate</h2>
    <form @submit.prevent="registerUser">
      <input type="text" placeholder="Ingresa tu email" v-model="email" name="email">
      <input type="password" placeholder="Ingresa tu contraseña" v-model="password" name="password">
      <button type="submit">Registrarse</button>
    </form>
    <p>¿Ya tienes cuenta? <router-link to="/login">Login</router-link></p>
  </section>
</template>

<style>
</style>
