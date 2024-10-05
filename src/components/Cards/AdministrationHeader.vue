<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<template>
  <div class="MainHead">
    <div class="topItems">
      <div class="tabmenu">
        <RouterLink to="/administration" active-class="active" class="inactive" v-if="$route.path == '/administration'">Users</RouterLink>
        <RouterLink to="/administration" class="inactive" v-else>Users</RouterLink>
        <RouterLink to="/administration/userroles" active-class="active" class="inactive">Roles</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>
.MainHead {
  width: 100%;
}

.inactive {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Inter';
  text-decoration: none;
  color: #000000;
  padding: 20px 20px 0px 20px;
}

.active {
  color: #227cbf;
  border-bottom: 2px solid #227cbf;
  padding-bottom: 14px;
  cursor: pointer;
}

.inactive:hover {
  background-color: #efefef;
  padding-bottom: 14px;
}

.tabmenu {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 45px;
  border-bottom: 1px solid #9b9b9b;
}

.topItems {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  width: 120%;
}
</style>
