<script setup lang="ts">
import { Trash } from 'lucide-vue-next';




const fruitName = ref('');

async function addFruit() {
    try {
        await $fetch('/api/fruits', {
            method: 'POST',
            body: {
                fruitName: fruitName.value
            }
        })

        showFruit();
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
});



async function deleteFruit(id: number) {
  try {
    await $fetch(`/api/fruits/${id}`, {
      method: 'DELETE'
    });
    // remove deleted fruit from local list (no need to refresh)
    fruits.value = fruits.value.filter(fruit => fruit.id !== id);
  } catch (error) {
    console.error('Failed to delete fruit:', error);
  }
}

</script>

<template>
    <NuxtLayout name="fruit-layout">

        <form @submit.prevent="addFruit" class="flex justify-center pt-50 space-x-3">
            <Input v-model="fruitName" class="bg-white w-100" />
            <Button type="submit">Add</Button>
        </form>


        <div class="text-black text-center pt-40 flex" >

            <div class="space-x-5">
                    <div v-for="fruit in fruits" :key="fruit.id">{{ fruit.fruitName }} 
                    <Button @click="deleteFruit(fruit.id)"><Trash /></Button> 
                    </div> 

            </div>
            
          
                

               
        </div>

    </NuxtLayout>
</template>
