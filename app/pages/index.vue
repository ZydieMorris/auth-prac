<template>
  <div>

    <form @submit.prevent="logInUser" class="flex flex-col items-center space-y-5 justify-center pt-50">

      <Label>Email</Label>
      <Input v-model="email" class="w-100" />

      <Label>Password</Label>
      <Input v-model="password" type="password" class="w-100" />
      <div v-if="message">{{ message }}</div>

      <Button type="submit">Login</Button>
      <NuxtLink to="/register"><Button>Register</Button></NuxtLink>

    </form>

  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'guest'
})

const email = ref('');
const password = ref('');
const message = ref('');

async function logInUser() {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    
    window.location.href = '/dashboard';

  } catch (error: any) {
    console.log('Login failed');
    message.value = error?.data?.statusMessage || 'Login failed';

  }
}

</script>
