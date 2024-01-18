<script setup>
import TabMenu from '../../components/Tabs/TabMenu.vue';
import { ref } from 'vue'

const tab = ref(1);



</script>
<template>
  <main class="wrapper">
    <TabMenu />
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
                <v-container fluid>
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
                            <span> Email </span>

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
                      <tr v-for="item in events" :key="item.id" @click="$router.push({ name: 'details', params: { id: item.id } })">
                        <td>{{ item.id }}</td>
                        <td>{{ item.transaction }}</td>
                        <td>{{ item.venue }}</td>
                        <td>{{ item.date }}</td>

                      </tr>
                    </tbody>
                  </v-table>
                </v-container>
              </v-tab-item>

              <!-- Department and Levels Tab -->
              <v-tab-item :value="2">
                <v-container fluid>

                </v-container>
              </v-tab-item>

              <!-- Log Tab -->
              <v-tab-item :value="3">
                <v-container fluid>

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
</style>