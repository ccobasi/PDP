<template>

  <main>
    <div class="card border-0">
      <div class="position-relative">

      </div>
      <div class="card-body">
        <h5 class="card-title">Mission</h5>
        <hr>
        <p class="card-text">Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod proiden.</p>
      </div>
      <div class="card-footer">
        <div class="media align-items-center">

        </div>
      </div>
    </div>
    <div class="card border-0">
      <div class="position-relative">

      </div>
      <div class="card-body">
        <h5 class="card-title">Vision</h5>
        <hr>
        <p class="card-text">Minim dolor in amet nulla laboris enim dolore consequat proident fugiat culpa eiusmod proiden.</p>
      </div>
      <div class="card-footer">
        <div class="media align-items-center">

        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  display: flex;
  gap: 20px;
}
.card,
body {
  display: flex;
}

.card-link,
body {
  font-size: 1rem;
}

.card-link {
  letter-spacing: 0.0178571em;
  font-weight: 500;
}

body {
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  color: #212529;
  background-color: #ced4da;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

body .footer {
  margin-top: auto;
}

.card {
  position: relative;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #00000020;
  border-radius: 0.8rem;
}

.card-footer {
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
}

.card-footer {
  padding: 1.5rem;
  background-color: transparent;
  border-top: 0;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem 1.25rem;
}

.card-title {
  line-height: 1.5;
  margin-bottom: 0.5rem;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-style: normal;
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-link + .card-link {
  margin-left: 1.5rem;
}

.card-footer:last-child {
  border-radius: 0 0 0.8rem 0.8rem;
}

.footer {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card.border-0 {
  box-shadow: 0 1px 3px #0000001f, 0 1px 2px #0000003d !important;
  background: hsl(220deg 14% 97%) !important;
  text-align: left;
  background-color: #fff !important;
  position: relative;
  margin-top: 12px !important;
  border: 1px solid #eee !important;
  transition: 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  color: #000 !important;
}

.read-more {
  border-radius: 5px !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 1px 3px #0000001a, 0 1px 2px #00000033, inset 1px 1px 1px #ffffff99,
    inset -1px -1px 1px #0c0d120f, -1px -1px 1px #ffffff99, -1px -1px 4px #ffffff99,
    -2px -2px 8px #ffffff99, 1px 1px 1px #0c0d120f, 1px 1px 4px #0c0d120f, 2px 2px 8px #0c0d120f !important;
  background-color: hsl(228deg 14% 93%);
  text-shadow: 0.25px 0.25px 0.25px hsl(233deg 5% 26% / 85%),
    0.35px 0.35px 0.35px hsl(233deg 5% 26% / 85%), 0 -1.1px 0 rgb(12 13 18 / 8%), 0 1.2px 0 #fff !important;
  color: hsl(233deg 5% 26%) !important;
  font-weight: 300 !important;
  border: none !important;
  padding: 6px 12px;
  text-transform: uppercase;
  font-size: 11px;
}

.tnlink3 {
  display: inline-flex;
  height: max-content;
  width: max-content;
  justify-content: center;
  align-items: center;
  color: #0007;
  font-size: 1rem;
  background: #fff;
  border: 0;
}

.footerright {
  display: inline-flex;
  align-items: center;
  height: 100%;
  gap: 1rem;
  justify-content: right;
}

.card.border-0.three {
  box-shadow: rgb(0 0 0 / 23%) 0 0.0625em 0.0625em, rgb(0 0 0 / 20%) 0 0.25em 0.25em,
    rgb(0 0 0 / 18%) 0 0.45em 1.105em -0.0625em !important;
}

.card.border-0.three h5.card-title {
  top: 25% !important;
  position: absolute;
  z-index: 1;
  font-weight: 800 !important;
  text-transform: uppercase;
  font-family: 'Source Sans Pro';
  color: #000;
  text-shadow: 0.5px 1px 0.5px #fff, -1px -1px 2px #eee;
}

.card.border-0.three hr {
  margin-bottom: -15px !important;
  margin-top: 0 !important;
}
</style>