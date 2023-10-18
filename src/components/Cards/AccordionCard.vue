<script setup>
   import DetailsCard from '../Cards/DetailsCard.vue' 
</script>
<template>
  <div class="wrap">
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
</template>
<style scoped>
.wrap {
  width: 100%;
}
</style>