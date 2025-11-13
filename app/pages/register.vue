<script setup lang="ts">

definePageMeta({
    middleware: 'guest'
})


const username = ref('');
const email = ref('');
const password = ref('');
const message = ref('');


async function registerUser() {

    try {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                username: username.value,
                email: email.value,
                password: password.value
            }
        })

        console.log(username.value, email.value, password.value);

        window.location.href = '/dashboard';

    } catch (error: any) {
        message.value = error?.data?.statusMessage || 'Registration failed';
        setTimeout(() => {
            message.value = '';
        }, 2000);

        
    }
}


</script>

<template>
    <div>
        <div>

            <form @submit.prevent="registerUser">
                <div class="flex flex-col items-center space-y-5 justify-center pt-50">

                    <Label>Username</Label>
                    <Input v-model="username" type="text" class="w-100" />

                    <Label>Email</Label>
                    <Input v-model="email" type="email" class="w-100" />

                    <Label>Password</Label>
                    <Input v-model="password" type="password" class="w-100" />

                    <Button type="submit">Register</Button>

                    <div v-if="message" class="text-red-500">
                        {{ message }}
                    </div>

                </div>
            </form>
        </div>
    </div>
</template>
