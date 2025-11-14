<script setup lang="ts">
import { Edit, Trash } from 'lucide-vue-next';
import { set } from 'zod';
import { ca } from 'zod/v4/locales';

definePageMeta({
  middleware: 'auth'
})



const fruitName = ref('');
const message = ref('');

async function addFruit() {
  try {
    await $fetch('/api/fruits', {
      method: 'POST',
      body: {
        fruitName: fruitName.value
      }
    })

    showFruit();

  } catch (error: any) {
    console.log('Failed to add fruit');
    message.value = error?.data?.statusMessage || 'failed to add fruit'
    setTimeout(() => {
      message.value = ''; 
    }, 2000);
    
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
    // remove deleted fruit from  list 
    fruits.value = fruits.value.filter(fruit => fruit.id !== id);
  } catch (error) {
    console.error('Failed to delete fruit:', error);
  }
}

async function editFruit(id: number, newName: string) {
  try {
    await $fetch(`/api/fruits/${id}`, {
      method: 'PUT',
      body: {
        fruitName: newName
      }
    })

    window.location.reload();

  } catch (error) {
    console.log('Failed to edit fruit');
  }

}

</script>

<template>
  <NuxtLayout name="fruit-layout">


    <div class="">
      <form @submit.prevent="addFruit" class="flex justify-center pt-50 space-x-3">
        <Input v-model="fruitName" class="bg-white w-100" />
        <Button type="submit">Add</Button>
        <div class="text-red-500">{{ message }}</div>

      </form>

      <div class="text-white  mt-10 w-100 mx-auto p-4 space-y-3">

        <div v-for="fruit in fruits" :key="fruit.id"
          class="flex items-center justify-between bg-white text-black p-3 rounded shadow">
          <span>{{ fruit.fruitName }}</span>

          <div class="flex items-center space-x-3">


            <UModal>
              <UButton class="text-white">
                <Edit />
              </UButton>
              <template #content>

                <div class=" space-y-5 p-10">
                  <p class="text-center">Edit FruitName</p>
                  <Input v-model="fruit.fruitName" />

                  <div class="flex justify-end">
                    <Button @click="editFruit(fruit.id, fruit.fruitName)">Save</Button>
                  </div>
                </div>
              </template>
            </UModal>



            <Button @click="deleteFruit(fruit.id)">
              <Trash />
            </Button>
          </div>
        </div>

      </div>


    </div>





  </NuxtLayout>
</template>
