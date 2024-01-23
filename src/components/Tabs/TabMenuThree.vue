<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

  const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/m/alltrainingschedule';
});
</script>
<template>
  <div class="menu">
    <div class="modal" id="myModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <div class="input-group rounded">
              <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />

              <span class="input-group-text border-0" id="search-addon">
                <i class="fa fa-search"></i>

              </span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="table-responsive">

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink">Full Name</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Date of Employment</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Department</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Level</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Manager </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Number of Times Promoted </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">Lola Oyebola</td>
                    <td>23/08/2020</td>
                    <td>User</td>
                    <td>Associate</td>
                    <td>Chinua Azibuke</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td scope="row">Mark Dean</td>
                    <td>23/05/2019</td>
                    <td>Knowledge Management</td>
                    <td>Senior Associate</td>
                    <td>Daniel Clinton</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td scope="row">Uzo Okoro</td>
                    <td>23/11/2015</td>
                    <td>Manager</td>
                    <td>AVP</td>
                    <td>Mosurat Adeniyi</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td scope="row">Daniel Muller</td>
                    <td>23/03/2022</td>
                    <td>HOD</td>
                    <td>Associate</td>
                    <td>Ayo Adenike</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td scope="row">Jane Doe</td>
                    <td>23/05/2020</td>
                    <td>IT</td>
                    <td>Senior Associate</td>
                    <td>Segun Arinze</td>
                    <td>7</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="profile" v-if="isUserRoute">
      <button><a class="nav-link active" href="/m/myprofile" role="button" aria-expanded="false">My Profile</a></button>
      <div class="btn" data-bs-toggle="modal" data-bs-target="#myModal" type="button"><span>Team Profile</span></div>
    </div>
    <nav class="navbar navbar-expand-md ">

      <ul class="navbar-nav">
        <li :class="{ 'nav-item': true, 'active': $route.path === '/m/' }">
          <router-link to="/m/" class="nav-link">
            Development Plan
          </router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/m/skillassessment' }">
          <router-link to="/m/skillassessment" class="nav-link">
            Skill Assessment
          </router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/m/trainingschedule' }">
          <router-link to="/m/trainingschedule" class="nav-link">
            Training Schedule
          </router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/m/alltrainingschedule' }">
          <router-link to="/m/alltrainingschedule" class="nav-link">
            All Training Schedule
          </router-link>
        </li>

        <li :class="{ 'nav-item': true, 'active': $route.path === '/m/taskdeliverables' }">
          <router-link to="/m/taskdeliverables" class="nav-link">
            Task/Deliverables
          </router-link>
        </li>

      </ul>

    </nav>

  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.profile {
  display: flex;
  width: 147px;
  height: 40px;
  padding: 6px 0px;

  align-items: flex-start;
  gap: 5px;

  border-radius: 5px;
  border: 1px solid var(--gray-300, #d4d4d8);
  background: var(--Color-3, #fff);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}
.profile button a {
  display: flex;
  padding: 6px 5px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.btn {
  display: flex;
  padding: 6px 0px;
  align-items: flex-start;
  width: 70px;
  height: 27px;
  color: var(--Black, #000);

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.btn span {
  margin-left: 0px;
}

label {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

label span {
  flex-shrink: 0;
}

label select {
  flex-grow: 0;
}

.navbar {
  border-bottom: 1px solid #808080;
  width: 100%;
  flex-wrap: nowrap;
}

.navbar-nav .nav-item:first-child .nav-link {
  padding-left: 0;
}

.nav-item {
  margin-top: 10px;
  margin-right: 45px;
  position: relative;
}

.nav-link {
  color: var(--Grey-Dark, #808080);

  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.link {
  margin-right: 40px;
}

.active::after {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 5px;
  bottom: -8px;
  margin: auto;
  border: 5px;
  background: #227cbf;
  color: #227cbf;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.request {
  display: flex;
  height: 50px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 50px;
  background: var(--White, #fff);
}
.blue {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--Primary, #227cbf);
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.team,
.approval {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.modal-body {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  border-radius: 10px;
  background: #fff;
}
.modal-dialog {
  width: 1700px;
  height: 400px;
  margin-left: 12%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}
.modal-content {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #eee;
  width: 975px;
}
table {
  width: 850px;
}
thead tr th {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 10px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.input-group {
  width: 297px;
}
</style>