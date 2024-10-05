<script setup>
//   import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import html2pdf from "html2pdf.js";
import { computed, ref } from "vue";

     const emit = defineEmits(['filter'])

    const filter = (e) => {
        emit('filter', e.target.value)
    }
    const radioFilter = ref('')

     const recent = [
            {
                name: 'Chinua Azubike',
                date: '12 October, 2023 ',
                time: '07:49:22 PM ',
                action: 'Assigned Role',
            },
            {
                name: 'Osaze Osaghae',
                date: '11 October, 2023 ',
                time: '10:19:56 AM ',
                action: 'Added User',
            },
            {
                name: 'Daniel Mueller',
                date: '14 June, 2023',
                time: '11:45:30 AM ',
                action: 'Edited Permission',
            },
            {
                name: 'Lola Oyebola',
                date: '20 May, 2023 ',
                time: '09:25:40 AM ',
                action: 'Added User',
            },
            {
                name: 'Jane Doe',
                date: '3 April, 2023 ',
                time: '12:13:19 PM ',
                action: 'Assigned Role',
            },
        ]

const filteredItems = computed(() => {
    let items = recent;

    

    // return props.items.filter(item => item.status === 'Done')
    switch(radioFilter.value){
        case 'this week':
          const sevenDaysAgo = new Date().getDate();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            // show items due today
            items = items.filter(item => new Date(item.date) < sevenDaysAgo);
            // items = items.filter(item => new Date(item.date) === new Date().getDate());
            break;
        case 'this month':
            // show items past due
            items = items.filter(item => new Date(item.date) < new Date())
            break;
    }

    // return props.items
    return items
})

const handleRadioFilter = (filter) => {
    radioFilter.value = filter
}


const exportToPDF = () => {
			html2pdf(document.getElementById('element-to-convert'), {
				margin: 1,
  			filename: "auditlog.pdf",
			});
		}
  
</script>
<template>

  <body>

    <div class="tab">
      <h2>Audit Logs</h2>
      <div class="btn" @click="exportToPDF">Export Log</div>
    </div>
    <div class="form" ref="document">
      <div class="header d-flex">
        <div class="title mb-3">
          <label for="filter">Filter by:</label>
          <select class="form-select" @change="filter" aria-label="Default select example">
            <option selected>All</option>
            <option value="1">This Week</option>
            <option value="2">This Month</option>
            <option value="3">60 Days Ago</option>
            <option value="4">90 Days Ago</option>
          </select>

        </div>

      </div>

      <v-table id="element-to-convert">
        <thead>
          <tr>
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
                <span> Date </span>

                <span class="d-flex flex-column align-center">
                  <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                  <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                </span>

              </div>
            </th>
            <th class="text-left">
              <div class="d-flex align-center gap-1">
                <span> Time </span>

                <span class="d-flex flex-column align-center">
                  <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                  <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                </span>

              </div>
            </th>
            <th class="text-left">
              <div class="d-flex align-center gap-1">
                <span> Action </span>

                <span class="d-flex flex-column align-center">
                  <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                  <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                </span>

              </div>
            </th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.action }}</td>

          </tr>
        </tbody>
      </v-table>
    </div>
  </body>
</template>

<style scoped>
body {
  background: #eeeeee;
  height: 100vh;
}
.tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin: 30px;
}
.tab h2 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 43.2px;
}
.tab .btn {
  display: flex;
  width: 200px;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  border-radius: 50px;
  background: var(--Gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
}
.form {
  display: flex;
  width: 95%;
  height: 70vh;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
  margin: auto;
  /* Drop Shadow */
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}
.title {
  width: 256px;
  height: 42px;
  display: flex;
  padding: 10px 20px;
  align-items: flex-start;
  gap: 20px;

  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
}
.title label {
  color: var(--Black, #000);
  text-align: right;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  position: relative;
}
.form-select {
  width: 150px;
  top: 193px;
  left: 150px;
  position: absolute;
  border: none;
}
.from {
  position: absolute;
  top: 199px;
  left: 260px;
}
.to {
  position: absolute;
  top: 201px;
  left: 420px;
}
.from label,
.to {
  color: var(--Black, #000);
  text-align: right;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.from input,
.to input {
  padding-left: 5px;
  width: 100px;
}
th {
  color: var(--Black, #000);

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
td {
  color: var(--Grey-Dark, #808080);

  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
  width: 300px;

  border-top: 1px solid var(--Grey-Light, #fafafb);
  border-bottom: 1px solid var(--Grey-Light, #fafafb);
  background: #fff;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
</style>