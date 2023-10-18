<script setup>
const {title, body, } = defineProps(["title", "body"])
</script>

<template>
  <div class="d-flex gap-1 mb-2">
    <div class="avatar">
      <img src="../../assets/images/ellipse.png" alt="" class="profile-image">
    </div>
    <div class="card-container">

      <div class="card shadow-cstm border-0">
        <div class="card-body">
          <h5 class="card-title" v-if="title">PipeLine Project Reminder</h5>
          <p class="card-text" v-if="body"> {{ body }}</p>
          <p class="card-text" v-else>

            Dear All, <br>
            This is to notify you to update the Pipeline project for Asiko Energy. <br>
            Please click <a href="#" class="card-link"> here</a> to make required updates. <br>
            Thank you,
            CRM.
          </p>
        </div>
      </div>
      <p class="mb-0"><small class="text-muted"> Daniel Muller 16/09/2022 2:20pm</small></p>

    </div>
  </div>
</template>

<style scoped>
.avatar .profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.shadow-cstm {
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: var(--black, #000);
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
}

.card-text {
  color: #000;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}
small {
  font-size: 12px;
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