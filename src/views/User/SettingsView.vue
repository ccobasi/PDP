<script setup>
import TabMenu from '../../components/Tabs/TabMenu.vue';
import { ref, onMounted } from 'vue'
import {useUsersStore} from "@/store/users"
import {useDepartmentsStore} from "@/store/departments"


const store = useUsersStore();
console.log(store.users);
const users = store.users;

const stores = useDepartmentsStore();
console.log(stores.departments);
const departments = stores.departments;


  const user = ref('')
  const department = ref('')
  const manager = ref('')
  const resource = ref('')
  const email  = ref('')
  const level = ref('')
  const status = ref('')
  const role = ref('')
  const selectedValue = ref('')

  const dept = ref('')

const addUser = async () => {
  if (
    user.value.trim() !== '' || department.value.trim() !== '' || manager.value.trim() !== '' ||
    resource.value.trim() !== '' || email.value.trim() !== '' || level.value.trim() !== '' ||
    status.value.trim() !== '' || role.value.trim() !== '' 
  ) {
    await store.addUser(
      user.value.trim(), department.value.trim(), manager.value.trim(),
      resource.value.trim(), email.value.trim(), level.value.trim(), status.value.trim(), role.value.trim()
    );

    // Clear form inputs after submission
    user.value = '';
    department.value = '';
    manager.value = '';
    email.value = '';
    level.value = '';
    status.value = '';
    role.value = '';
    

    console.log("User added");
  }
};

const addDepartment = async () => {
  if (
    dept.value.trim() !== '' 
  ) {
    await stores.addDepartment(
      dept.value.trim()
    );
    

    console.log("Department added");
  }
};


const handleSubmit = () => {
  addUser();
  console.log("User added")
};

const handleSubmit1 = () => {
  addDepartment();
  console.log("Department added")
};

onMounted(() => {
  
  store.fetchUsers();
  console.log("Fetch users")
  stores.fetchDepartments();
  console.log("Fetch departments")
});

 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}


const tab = ref(1);



</script>
<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">User Role Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="left">
                  <h4>Name</h4>
                  <textarea name="Name" placeholder="Name" id="" cols="30" rows="10" v-model="name"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Department</h4>
                  <textarea name="Department" placeholder="Department" id="" cols="30" rows="10" v-model="department"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Manager</h4>
                  <textarea name="Manager" placeholder="Manager" id="" cols="30" rows="10" v-model="manager"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Email</h4>
                  <textarea name="Email" placeholder="Email" id="" cols="30" rows="10" v-model="email"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Level</h4>
                  <textarea name="Level" placeholder="Level" id="" cols="30" rows="10" v-model="level"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Status</h4>
                  <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="status">

                    <option class="opt" value="Active">Active</option>
                    <option class="opt" value="In-Active">In-Active</option>
                  </select>
                </div>
              </div>

            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/settings')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <form method="post" action="" @submit.prevent="handleSubmit1">
      <div class="modal" id="myModal1" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Department Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="leftt">
                  <h4>Department</h4>
                  <!-- <textarea name="Department" placeholder="Department" id="" cols="30" rows="10" v-model="department"></textarea> -->
                  <input type="text" v-model="dept" placeholder="Department">
                </div>

              </div>

            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/settings')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="container-fluid mt-3 justify-content-start">
      <h3 style="color: var(--black, #000);font-size: 24px;font-family: Roboto;font-style: normal;font-weight: 500;line-height: 28.8px;">Settings</h3>
      <p style="color: var(--grey-dark, #808080);font-size: 16px;font-family: Roboto;font-style: normal;font-weight: 400;line-height: 19.2px;">System Configuration</p>

      <div class="list-group">
        <div class="list-group-item" style="background:#F7F7F7;color: var(--black, #000);font-size: 20px;font-family: Roboto;font-style: normal;font-weight: 600;line-height: 24px;">

          <v-card>
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
              <v-tab :value="1">Users/Roles</v-tab>
              <v-tab :value="2">Department and Levels</v-tab>
              <v-tab :value="3">Log</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <!-- Users Tab -->
              <v-tab-item :value="1">
                <v-container fluid v-if="tab === 1">
                  <div class="dev">
                    <h3>Roles</h3>
                    <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Add Role</button>
                  </div>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> S/N </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Name </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Department </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Manager </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Email </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Level </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Status </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Role </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in users" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.department }}</td>
                        <td>{{ item.manager }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.level }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.role }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-container>
              </v-tab-item>

              <!-- Department and Levels Tab -->
              <v-tab-item :value="2">
                <v-container fluid v-if="tab === 2">
                  <div class="dev">
                    <h3>Department</h3>
                    <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Add Department</button>
                  </div>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> S/N </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>
                        <th class="text-left">
                          <div class="d-flex align-center gap-1">
                            <span> Department </span>

                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                          </div>
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in departments" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.dept }}</td>

                      </tr>
                    </tbody>
                  </v-table>
                </v-container>
              </v-tab-item>

              <!-- Log Tab -->
              <v-tab-item :value="3">
                <v-container fluid v-if="tab === 3">

                </v-container>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

        </div>

      </div>

    </div>
  </main>
</template>
<style scoped>
main {
  height: 1450px;
}
.dev h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 900px;
}
.dev {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 180px;
  height: 40px;
  color: #fff;
  font-size: 18px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}
.modal-dialog {
  width: 900px;
  height: 630px;
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}
.modal-content {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
}
.type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.type h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.form-select {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.goal {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.left h4,
.right h4 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.goal textarea {
  display: flex;
  width: 320px;
  height: 70px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #808080;
  border-radius: 5px;
}
.type input {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.modal-footer {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}
.wright textarea {
  width: 320px;
  height: 70px;
}
.lefts input {
  width: 320px;
  height: 40px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.form-selects {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.types button {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
.leftt {
  width: 400px;
}
.leftt input {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
}
#myModal1 .modal-dialog {
  height: 370px;
}
</style>