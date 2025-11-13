<script setup lang="ts">



const fruitName = ref('');

async function addFruit() {
    try {
        await $fetch('/api/fruits', {
            method: 'POST',
            body: {
                fruitName: fruitName.value
            }
        })

    } catch (error) {
        console.log('Failed to add fruit');
    }
}

const fruits = ref<Array<{ id: number, fruitName: string }>>([])

async function showFruit() {
  try {
    const data = await $fetch('/api/fruits', {
      method: 'GET',
    })

    // directly replace fruits with the fetched list
    fruits.value = data;

  } catch (error) {
    console.log('Failed to show fruit', error);
  }
}


onMounted(() => {
    showFruit();
})

</script>

<template>
    <NuxtLayout name="fruit-layout">

        <form @submit.prevent="addFruit" class="flex justify-center pt-50 space-x-3">
            <Input v-model="fruitName" class="bg-white w-100" />
            <Button type="submit">Add</Button>
        </form>


        <ul class="text-white text-center pt-40" >
            <li v-for="fruit in fruits" :key="fruit.id">{{ fruit.fruitName }}</li>

            
        </ul>

    </NuxtLayout>
</template>
