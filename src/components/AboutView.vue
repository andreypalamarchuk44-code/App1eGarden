<template>
  <main class="about-page">

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <span class="label">Про нас</span>
        <h1>Яблука з нашого саду без посередників</h1>
        <p>
          Ми вирощуємо якісні яблука, дбаючи про кожне дерево та кожен урожай.
          Свіжість, натуральність та чесний підхід — основа Apple Garden.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="container stats-grid">
        <div class="stat-card">
          <h3>10+</h3>
          <p>років досвіду</p>
        </div>
        <div class="stat-card">
          <h3>5000+</h3>
          <p>задоволених клієнтів</p>
        </div>
        <div class="stat-card">
          <h3>15</h3>
          <p>сортів яблук</p>
        </div>
        <div class="stat-card">
          <h3>100%</h3>
          <p>натуральний продукт</p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="story">
      <div class="container story-grid">
        <div class="story-image">
          <img :src="gardenImg" alt="Apple Garden" />
        </div>
        <div class="story-content">
          <h2>Наша історія</h2>
          <p>
            Apple Garden почався з любові до садівництва та бажання
            вирощувати справді якісні яблука.
          </p>
          <p>
            Ми поєднуємо традиційний догляд за садом із сучасними
            технологіями вирощування, щоб кожне яблуко потрапляло
            до покупця свіжим та соковитим.
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values">
      <div class="container">
        <h2>Наші цінності</h2>
        <div class="values-grid">
          <div class="value-card">
            <h3>🍏 Якість</h3>
            <p>Ретельний контроль на кожному етапі вирощування.</p>
          </div>
          <div class="value-card">
            <h3>🌱 Натуральність</h3>
            <p>Тільки свіжі та добірні яблука з нашого саду.</p>
          </div>
          <div class="value-card">
            <h3>🤝 Довіра</h3>
            <p>Чесні відносини з кожним клієнтом.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews -->
    <section class="reviews">
      <div class="container">
        <h2>Відгуки наших покупців</h2>
        <div class="review-form">
          <input v-model="name" type="text" maxlength="30" placeholder="Ваше ім'я" />
          <textarea v-model="text" maxlength="300" placeholder="Ваш відгук"></textarea>
          <button @click="addReview">Залишити відгук</button>
        </div>
        <div class="reviews-grid">
          <div v-for="(review,index) in reviews" :key="index" class="review-card">
            <div class="stars">⭐⭐⭐⭐⭐</div>
            <p>{{ review.text }}</p>
            <span>{{ review.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="catalog-cta">
      <div class="container">
        <div class="cta-box">
          <h2>Спробуйте смак справжніх яблук</h2>
          <p>Перейдіть до каталогу та оберіть свій улюблений сорт яблук.</p>
          <router-link to="/catalog" class="catalog-btn">Перейти в каталог</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gardenImg from '../assets/styles/images/garden.jpg'

const reviews = ref([
  { name: 'Олена', text: 'Дуже соковиті яблука. Замовляємо вже третій сезон поспіль.' },
  { name: 'Андрій', text: 'Якість відмінна, доставка швидка.' }
])

const name = ref('')
const text = ref('')

onMounted(() => {
  const saved = localStorage.getItem('appleReviews')
  if (saved) reviews.value = JSON.parse(saved)
})

const addReview = () => {
  const userName = name.value.trim()
  const userText = text.value.trim()
  if (!userName || !userText) return alert("Будь ласка, заповніть усі поля")
  reviews.value.unshift({ name: userName, text: userText })
  localStorage.setItem('appleReviews', JSON.stringify(reviews.value))
  name.value = ''
  text.value = ''
}
</script>

<style scoped>
.about-page { padding-top: 80px; }

.hero { text-align: center; padding: clamp(60px, 8vw, 100px) 0; }
.label { color: #6ba539; font-weight: 600; }
.hero h1 { max-width: 700px; margin: 20px auto; font-size: clamp(2rem, 5vw, 4rem); }
.hero p { max-width: 650px; margin: auto; color: #666; line-height: 1.7; }

.stats { padding: clamp(40px, 6vw, 80px) 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.stat-card { text-align: center; padding: 30px; background: #fff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.05); }
.stat-card h3 { color: #6ba539; font-size: 2rem; }

.story { padding: clamp(60px, 8vw, 100px) 0; }
.story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.story-image img { width: 100%; border-radius: 24px; transition: .6s ease; }
.story-image:hover img { transform: scale(1.05); }

.values { padding: clamp(60px, 8vw, 100px) 0; }
.values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }

.reviews { padding: clamp(60px, 8vw, 100px) 0; }
.reviews-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 50px; }

.review-form { max-width: 700px; margin: 40px auto 60px; display: flex; flex-direction: column; gap: 15px; }
.review-form input, .review-form textarea { padding: 16px; border: 1px solid #ddd; border-radius: 14px; font-size: 16px; }
.review-form textarea { min-height: 120px; resize: vertical; }
.review-form button { padding: 16px; border: none; border-radius: 14px; cursor: pointer; background: #6ba539; color: white; font-weight: 600; transition: .3s; }
.review-form button:hover { transform: translateY(-3px); }

.review-card { background: white; padding: 28px; border-radius: 24px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: all .3s ease; position: relative; overflow: hidden; }
.review-card::before { content: "❝"; position: absolute; top: -10px; right: 20px; font-size: 5rem; color: rgba(107, 165, 57, 0.08); font-family: serif; }
.review-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
.review-card p { font-size: 1rem; line-height: 1.8; color: #555; margin-bottom: 20px; }
.review-card span { display: flex; align-items: center; gap: 10px; color: #6ba539; font-weight: 600; }
.review-card span::before { content: ""; width: 35px; height: 35px; border-radius: 50%; background: linear-gradient(135deg, #6ba539, #8cc84b); }

.catalog-cta { padding: clamp(60px, 8vw, 100px) 0; }
.cta-box { text-align: center; padding: 70px 40px; border-radius: 30px; background: linear-gradient(135deg, #6ba539, #82c245); color: white; }
.cta-box h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 20px; }
.cta-box p { max-width: 600px; margin: 0 auto 30px; opacity: .9; }
.catalog-btn { display: inline-block; padding: 16px 36px; background: white; color: #6ba539; text-decoration: none; border-radius: 14px; font-weight: 700; transition: .3s; }
.catalog-btn:hover { transform: translateY(-4px); }

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .stats-grid, .values-grid, .reviews-grid, .story-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}
@media (max-width: 768px) {
  .stats-grid, .values-grid, .reviews-grid, .story-grid { grid-template-columns: 1fr; gap: 20px; }
  .hero { padding: clamp(40px, 6vw, 60px) 0; text-align: center; }
  .story-grid { gap: 40px; }
  .review-form { max-width: 100%; padding: 0 16px; }
  .cta-box { padding: 50px 20px; }
}
@media (max-width: 480px) {
  .hero h1 { font-size: clamp(1.5rem, 5vw, 2.5rem); }
  .hero p { font-size: 0.9rem; line-height: 1.6; }
  .stat-card h3 { font-size: 1.5rem; }
  .review-card p { font-size: 0.9rem; }
  .cta-box h2 { font-size: 1.5rem; }
  .cta-box p { font-size: 0.85rem; }
  .catalog-btn { padding: 12px 24px; font-size: 0.9rem; }
}
</style>