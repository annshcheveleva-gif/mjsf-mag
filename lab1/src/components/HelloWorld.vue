<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Лабораторна робота 1: Vue.js + Docker
    </h3>
    <div class="student-card">
      <p><strong>Спеціальність:</strong> 121 Інженерія програмного забезпечення</p>
      <p><strong>Освітній рівень:</strong> Магістр</p>
      <p><strong>ЗВО:</strong> Запорізький національний університет</p>
    </div>
  </div>
</template>

<style scoped>
.greetings { text-align: left; }
.green { color: #42b883; }
.student-card {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #42b883;
  border-radius: 8px;
  background-color: rgba(66, 184, 131, 0.05);
}
</style>
