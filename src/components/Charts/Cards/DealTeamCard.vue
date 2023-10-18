<template>
  <form>
    <div class="row g-2">

      <div class="col-6">
        <label for="lead-source" class="form-label">Originator </label>
        <select class="form-select" id="lead-source" aria-label="Default select example">
          <option selected>Daniel Muller</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-6">
        <label for="lead-source" class="form-label">Administrator </label>
        <select class="form-select" id="lead-source" aria-label="Default select example">
          <option selected>Chinua Azubike</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-6">
        <label for="lead-source" class="form-label">Lead Transactor </label>
        <select class="form-select" id="lead-source" aria-label="Default select example">
          <option selected>Olumesanya Jesuro</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-6">
        <label for="lead-source" class="form-label">Co-Transactor </label>
        <select class="form-select" id="lead-source" aria-label="Default select example">
          <option selected>John Doe</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="col-6">
        <label for="lead-source" class="form-label">Transactor Legal </label>
        <select class="form-select" id="lead-source" aria-label="Default select example">
          <option selected>Micheal Smith</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

    </div>
    <div class="d-flex justify-content-end mr-2">

      <button type="submit" class="submit-button">Update</button>
    </div>
  </form>
</template>

<style scoped>
label.form-label {
  /* Capion Bold */
  font-size: 12px;
  font-weight: 700;
  line-height: 14.4px;
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
