<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h3 text-center mt-6">Testimonios</div>
      </v-col>      
      <v-col cols="12"><div class="text-h5 text-center">Ayudanos a mejorar nuestros servicios y calidad</div></v-col>
    </v-row>

    <v-row>
      <v-col lg="4" md="6" sm="6" cols="12" v-for="(testimonio, index) in testimonios" :key="index">
        <div class="section__card">
          <span><v-icon icon="mdi-format-quote-open"></v-icon></span>
          <h4>{{ testimonio.titulo }}</h4>
          <p>
            {{ testimonio.descripcion }}
          </p>          
          <img :src="testimonio.url ? testimonio.url : 'https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Follower-512.png'" alt="user" />
          <h5><v-rating v-model="testimonio.valoracion" hover readonly></v-rating></h5>
          <h5>{{ testimonio.nombres }}</h5>
          <h6>{{ testimonio.posicion }}</h6>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <!-- <section class="section__container">
    <h2>Testimonials</h2>
    <h1>What our customers say</h1>
    <div class="section__grid">
      <div class="section__card">
        <span><i class="ri-double-quotes-l"></i></span>
        <h4>Love the simplicity</h4>
        <p>
          They understood our brand and created a stunning website design.
          Professional, responsive, and on-time delivery. Highly recommended!
        </p>
        <img src="../assets/user-1.jpg" alt="user" />
        <h5>Allan Collins</h5>
        <h6>Managing Director</h6>
      </div>
      <div class="section__card">
        <span><i class="ri-double-quotes-l"></i></span>
        <h4>Excellent Designs</h4>
        <p>
          Efficient, reliable, and results-oriented. Visually appealing
          website, improved online visibility. Highly recommended!
        </p>
        <img src="../assets/user-2.jpg" alt="user" />
        <h5>Tanya Grant</h5>
        <h6>Ceo & Founder</h6>
      </div>
      <div class="section__card">
        <span><i class="ri-double-quotes-l"></i></span>
        <h4>Efficient and Reliable</h4>
        <p>
          Best decision we made. Stunning website, exceptional support. Always
          available and prompt issue resolution. Hassle-free experience!
        </p>
        <img src="../assets/user-3.jpg" alt="user" />
        <h5>Clay Washington</h5>
        <h6>Fashion Designer</h6>
      </div>
    </div>
  </section> -->
</template>

<script>
export default {
  props:{    
    testimonios: [],
    testimonio: {}
  },
  data() {
    return {      
    }
  }  
}
</script>

<style lang="scss" scoped>


.section__card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 5rem 2rem 2rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  text-align: center;
}

.section__card::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 75%;
  aspect-ratio: 1;
  border-radius: 100%;
  background-color: #585030;
  z-index: -1;
  transition: 0.5s;
}

.section__card span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  font-size: 3rem;
  color: #fff;
}

.section__card h4 {
  margin-top: 4rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #585030;
  transition: 0.3s;
}

.section__card p {
  margin-bottom: 2rem;
  max-width: 500px;
  color: #333;
  transition: 0.3s;
}

.section__card img {
  margin-bottom: 1rem;
  max-height: 100px;
  max-width: 100px;    
  border-radius: 100%;
  border: 2px solid #585030;
  transition: 0.3s;
}

.section__card h5 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #585030;
  transition: 0.3s;
}

.section__card h6 {
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  transition: 0.3s;
}

.section__card:hover::before {
  width: 400%;
}

.section__card:hover :is(h4, h5) {
  color: var(--white);
}

.section__card:hover :is(p, h6) {
  color: #EAE6D7;
}

.section__card:hover img {
  border-color: #fff;
}</style>