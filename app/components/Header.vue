<script setup lang="ts">

    const { clear } = useUserSession();

   async function logOut(){
        await clear();
        await navigateTo('/');
    }

</script>


<template>
    <div class="flex justify-center items-center bg-green-400 h-20 w-full space-x-5">

        <Button @click="logOut">Logout</Button>

   
    </div>
</template>



