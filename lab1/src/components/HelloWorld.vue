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
      <p><strong>Студентка:</strong> Щевелева Анна</p>
      <p><strong>Група:</strong> 7.F2.25-2</p>
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
.student-card p {
  margin: 6px 0;
  font-size: 0.95rem;
}
</style>
