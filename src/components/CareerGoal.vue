<script setup>
  import TableOne from '../components/Tables/TableOne.vue'
</script>
<template>
  <div class="career mt-3">

    <form action="">
      <div class="d-goal">
        Development Plan:
        <select class="form-select" aria-label="Default select example">
          <option class="opt" selected>Career Goals and Aspirations</option>
          <option class="opt" value="1">Career Goals and Aspirations</option>
          <option class="opt" value="2">Areas of Interest</option>
          <option class="opt" value="3">Mentorship and Skills Building</option>
        </select>
      </div>
      <div class="d-flex justify-content-between mt-4  ">
        <div class="custom-table table-responsive-sm">
          <TableOne />

        </div>
        <div class="side-panel">
          <h3> Details </h3>
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">

              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                  Goal
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                  <DetailsCard />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  What I will do to achieve this
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                  <DealTeamCard />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                  Resources and Support Needed
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                <div class="accordion-body">
                  <CheckList />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour " aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                  What does success look like?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                <div class="accordion-body">
                  <OtherDetailsCard />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                  Target Date for Completion
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                <div class="accordion-body">
                  <FileCard />

                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                  Potential Challenges
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <TimeLineCard v-for="i in 3" />

                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                  Solution
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <TimeLineCard v-for="i in 3" />

                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                  Progress Metrics (Outcome Based)
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <TimeLineCard v-for="i in 3" />

                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                  Status
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <TimeLineCard v-for="i in 3" />

                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                  Feedback
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <TimeLineCard v-for="i in 3" />

                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                  Evidence
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <TimeLineCard v-for="i in 3" />

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.career {
  width: 100%;
  padding-left: 20px;
}
.career h4 {
  color: var(--Secondary, #47b65c);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
form {
  margin: auto;
}
.d-goal {
  display: flex;
  padding: 7px 20px;
  align-items: flex-start;
  gap: 20px;
}
.form-select {
  color: var(--Secondary, #47b65c);
  text-align: right;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  width: 260px;
  height: 30px;
}
.side-panel {
  display: flex;
  width: 390px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  align-self: stretch;
  background: var(--Grey-Light, #eee);
}
.side-panel h4 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.accordion-item {
  display: flex;
  width: 350px;
  height: 57px;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
}
.accordion-button {
  width: 330px;
}
</style>