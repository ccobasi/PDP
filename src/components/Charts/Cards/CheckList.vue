<script setup>
import { ref } from 'vue';
import Toggle from '../Toggle.vue';

const NDARequired = ref(false)
const NDAExecuted = ref(true)

</script>
<template>
  <div class="d-flex flex-column gap-2">
    <div class="form-group d-flex justify-content-between">
      <span> NDA Required </span>

      <Toggle v-model:model-value="NDARequired" />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> NDA Sent? </span>

      <Toggle v-model:model-value="NDAExecuted" />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> NDA Executed? </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> Project Viability </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> Commence Initial KYC </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> E & S Assessment Commmenced </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> Outcome of E&S and
        initial KYC assessment Updated? </span>

      <Toggle />
    </div>

    <div class="form-group d-flex justify-content-between">
      <span> MROC Approval </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> Draft NBC Paper Sent? </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> Draft Mandate Letter Sent? </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> NBC Approved? </span>

      <Toggle />
    </div>
    <div class="form-group d-flex justify-content-between">
      <span> NBC Number </span>

      <Toggle />
    </div>

    <div class="form-group d-flex justify-content-between">
      <span> Mandate Signed? </span>

      <div class="form-check form-check-inline form-switch">
        <input class="form-check-input" type="checkbox">
      </div>
    </div>

    <div class="d-flex justify-content-end mr-2 mt-3">
      <button type="submit" class="submit-button">Update</button>
    </div>
  </div>
</template>

<style scoped>
input[type='checkbox'] {
  accent-color: blue;
}

.form-group span:first-child {
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  max-width: 180px;
}
input,
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}
</style>