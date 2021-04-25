<template>
  <span class="tooltip">
    <span class="data"><slot /></span>
    <img class="centered-image" src="@/assets/icons/question_mark.svg" height="20" />
  </span>
</template>

<script>
export default {

}
</script>

<style scoped>
  .tooltip {
    position: relative;
    cursor: pointer;
  }

  .tooltip .data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 12px);

    background: #041a2c; 
    color: #fff; 
    width: 250px;
    font-size: 0.9rem;
    padding: 0.8em;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Параметры тени */
    pointer-events: none; /* Подсказка */
    opacity: 0; /* Подсказка невидима */
    transition: 0.5s; /* Время появления подсказки */
    border-radius: 8px;
    z-index: 2;
  }

  .tooltip:hover .data {
    opacity: 0.9;
  }

  .data:hover {
    opacity: 0.9;
  }
</style>