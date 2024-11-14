<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSelectedNameStore } from '@/store/goals.js';
import { useUsersStore } from '@/store/users.js';

const selectedNameStore = useSelectedNameStore();
const router = useRouter();
const usersStore = useUsersStore();
const activeButton = ref('My Profile');
const showTeamMemberGoals = ref(false);
const users = computed(() => usersStore.users);
console.log(users);


let modalInstance;

onMounted( async () => {
  await usersStore.fetchUsers();
  users.value = usersStore.users;
  
  const modalElement = document.getElementById('myModal5');
  if (modalElement) {
    modalInstance = new bootstrap.Modal(modalElement);
  }
});

const toggleTeamMemberGoals = () => {
  showTeamMemberGoals.value = !showTeamMemberGoals.value;
};

// const setSelectedName = (name) => {
//   selectedNameStore.setSelectedName(name);

//   if (modalInstance && modalInstance._isShown) {
//     modalInstance.hide();
//   }

//   setTimeout(() => {
//     router.push({ path: '/km/myprofile', query: { name } });
//   }, 300); 
// };

const setSelectedName = async (name) => {
  selectedNameStore.setSelectedName(name);

  // Fetch the user's goals or records
  await usersStore .fetchUsers(name);  // Assuming this action fetches the user-specific goals
  
  if (modalInstance && modalInstance._isShown) {
    modalInstance.hide();
  }

setTimeout(() => {
    router.push({ path: '/km/myprofile', query: { name } });
  }, 300); 
};

const setActiveButton = (buttonName) => {
  activeButton.value = buttonName;
};

const teamMembers = ref([
  { name: 'Lola Oyebola', dateOfEmployment: '23/08/2020', department: 'User', level: 'Associate', manager: 'Chinua Azibuke', promotions: 5 },
  { name: 'Mark Dean', dateOfEmployment: '23/05/2019', department: 'Knowledge Management', level: 'Senior Associate', manager: 'Daniel Clinton', promotions: 3 },
  { name: 'Uzo Okoro', dateOfEmployment: '23/11/2015', department: 'Manager', level: 'AVP', manager: 'Mosurat Adeniyi', promotions: 1 },
  { name: 'Daniel Muller', dateOfEmployment: '23/03/2022', department: 'HOD', level: 'Associate', manager: 'Ayo Adenike', promotions: 2 },
  { name: 'Jane Doe', dateOfEmployment: '23/05/2020', department: 'IT', level: 'Senior Associate', manager: 'Segun Arinze', promotions: 7 },
]);
</script>
<template>
  <div>
    <div class="menu">
      <div class="modal" id="myModal5" tabindex="-1">
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
                          <span class="noshrink">Email</span>
                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>
                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink">Job Title</span>
                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>
                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink">Department</span>
                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>
                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink">Business Unit</span>
                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>
                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink">Phone Number</span>
                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>
                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink">Created By</span>
                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="member in teamMembers" :key="member.name" @click="setSelectedName(member.name)" data-bs-dismiss="modal">
                      <td>{{ member.name }}</td>
                      <td>{{ member.dateOfEmployment }}</td>
                      <td>{{ member.department }}</td>
                      <td>{{ member.level }}</td>
                      <td>{{ member.manager }}</td>
                      <td>{{ member.promotions }}</td>
                    </tr> -->
                    <tr v-for="user in users" :key="user.userId">
                      <td>{{ user.userFullName || 'N/A' }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.jobTitle || 'N/A' }}</td>
                      <td>{{ user.department ? user.department.option : 'N/A' }}</td>
                      <td>{{ user.businessUnit ? user.businessUnit.option : 'N/A' }}</td>
                      <td>{{ user.phoneNumber || 'N/A' }}</td>
                      <td>{{ user.createdBy ? user.createdBy.userFullName : 'N/A' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile">
        <button class="btn pl-2" :class="{ 'active': activeButton === 'My Profile' }" @click="setActiveButton('My Profile')">My Profile</button>

        <button class="btn" data-bs-toggle="modal" data-bs-target="#myModal5" type="button" :class="{ 'active': activeButton === 'Team Profile' }" @click="() => { setActiveButton('Team Profile'); toggleTeamMemberGoals(); }">
          <span>Team Profile</span>
        </button>
      </div>

      <nav class="navbar navbar-expand-md">
        <ul class="navbar-nav">
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/', 'active-indicator': $route.path === '/km/' }">
            <router-link to="/km/" class="nav-link">Development Plans</router-link>
          </li>
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/skillassessment', 'active-indicator': $route.path === '/km/skillassessment' }">
            <router-link to="/km/skillassessment" class="nav-link">Skill Assessment</router-link>
          </li>
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/trainingschedule', 'active-indicator': $route.path === '/km/trainingschedule' }">
            <router-link to="/km/trainingschedule" class="nav-link">Training Schedule</router-link>
          </li>
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/alltrainingschedule', 'active-indicator': $route.path === '/km/alltrainingschedule' }">
            <router-link to="/km/alltrainingschedule" class="nav-link">All Training Schedule</router-link>
          </li>
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/taskdeliverables', 'active-indicator': $route.path === '/km/taskdeliverables' }">
            <router-link to="/km/taskdeliverables" class="nav-link">Task/Deliverables</router-link>
          </li>
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/mentorshipplan', 'active-indicator': $route.path === '/km/mentorshipplan' }">
            <router-link to="/km/mentorshipplan" class="nav-link">Mentorship Plan</router-link>
          </li>
          <li :class="{ 'nav-item': true, 'active': $route.path === '/km/speakingengagement', 'active-indicator': $route.path === '/km/speakingengagement' }">
            <router-link to="/km/speakingengagement" class="nav-link">Speaking Engagement</router-link>
          </li>
        </ul>
      </nav>
    </div>
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
  width: 157px;
  height: 40px;
  padding: 0px 0px;
  align-items: flex-start;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid var(--gray-300, #d4d4d8);
  background: var(--Color-3, #fff);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}

.profile button.active {
  display: flex;
  padding: 10px 0px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
  color: var(--White, #fff);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.btn {
  display: flex;
  padding: 6px 0px;
  align-items: flex-start;
  width: 80px;
  height: 40px;
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
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

  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.link {
  margin-right: 40px;
}

.active::after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 0px;
  bottom: -8px;
  margin: auto;
  border: 5px;
  background: #227cbf;
  color: #227cbf;
}
.active-indicator::after {
  content: "";
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
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.team,
.approval {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
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
  margin-left: 6%;
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
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  /* Caption */
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

@media (max-width: 850px) {
  .navbar {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .navbar-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .nav-item {
    margin-right: 10px;
    margin-top: 0;
  }
}

@media screen and (max-width: 768px) {
  .menu {
    flex-direction: column;
  }

  .navbar {
    flex-wrap: wrap;
  }

  .nav-item {
    margin-top: 10px;
    margin-right: 0;
  }

  .navbar-nav {
    width: 100%;
    text-align: center;
  }

  .nav-link {
    font-size: 10px;
  }

  .active::after {
    bottom: -8px;
  }
}
</style>