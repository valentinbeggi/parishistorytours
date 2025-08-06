---
import BaseLayout from "../../layouts/BaseLayout.astro";
import BookTour from "../../components/BookTour.astro";
---

<BaseLayout title="Left Bank Tour - Paris History Tours">
  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="absolute inset-0">
      <img 
        src="/photos/pantheon_de_Paris.webp" 
        alt="Panthéon de Paris" 
        class="w-full h-full object-cover"
      />
    </div>
    <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">Left Bank Tour</h1>
      <p class="text-xl md:text-2xl mb-8 opacity-90">
        Discover Paris under the light of the Second World War
      </p>
      <div class="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4 md:gap-8 text-lg md:text-xl">
        <div class="flex items-center justify-center gap-3">
          <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium">2 hours</span>
        </div>
        <div class="flex items-center justify-center gap-3">
          <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium">2.5 km walking</span>
        </div>
        <div class="flex items-center justify-center gap-3">
          <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">4 historic stops</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Introduction Section -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        A Journey Through Wartime Paris
      </h2>
      <div class="text-center">
        <blockquote class="text-2xl md:text-3xl font-medium text-gray-700 italic mb-6">
          "Paris, Paris outraged! Paris broken! Paris martyred! But Paris liberated!"
        </blockquote>
        <cite class="text-lg text-gray-600">
          — Charles de Gaulle, 25th August 1944
        </cite>
      </div>
    </div>
  </section>

  <!-- Three Topics Section -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h3 class="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Three Historical Themes
      </h3>
      
      <!-- Desktop Version -->
      <div class="hidden md:grid md:grid-cols-3 gap-8">
        <!-- The Fall -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="h-48 relative">
            <img 
              src="/photos/fall_of_paris_ww2_1940.webp" 
              alt="Fall of Paris 1940" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 class="text-2xl font-bold text-white">The Fall of Paris</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-gray-700 leading-relaxed">
              How did the German army reach Paris, the French Capital, in only 35 days of combat? What happened in the city during these 35 crucial days?
            </p>
          </div>
        </div>

        <!-- The Resistance -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="h-48 relative">
            <img 
              src="/photos/resistance_ww2_paris.webp" 
              alt="Resistance in Paris" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 class="text-2xl font-bold text-white">The Resistance</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-gray-700 leading-relaxed">
              How did the Resistance start in the city? We will follow the steps of an early resistance fighter who was part of the first Resistance network in the town, called Musée de l'Homme.
            </p>
          </div>
        </div>

        <!-- Liberation -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="h-48 relative">
            <img 
              src="/photos/paris_ww2_liberation_1944_de_gaulle.webp" 
              alt="Liberation of Paris 1944" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 class="text-2xl font-bold text-white">Liberation</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-gray-700 leading-relaxed">
              How did the Allies finally free Paris after four years of occupation? We will talk about the fights that took place in the city in August 1944, and you will see how closely Paris came to being greatly damaged.
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile Version with Swipe Carousel -->
      <div class="md:hidden">
        <div class="relative max-w-sm mx-auto">
          <div class="overflow-hidden rounded-xl">
            <div class="flex transition-transform duration-300 ease-in-out" id="topics-carousel">
              <!-- The Fall -->
              <div class="min-w-full">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="h-48 relative">
                    <img 
                      src="/photos/fall_of_paris_ww2_1940.webp" 
                      alt="Fall of Paris 1940" 
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 class="text-2xl font-bold text-white">The Fall of Paris</h3>
                    </div>
                  </div>
                  <div class="p-6">
                    <p class="text-gray-700 leading-relaxed">
                      How did the German army reach Paris, the French Capital, in only 35 days of combat? What happened in the city during these 35 crucial days?
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- The Resistance -->
              <div class="min-w-full">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="h-48 relative">
                    <img 
                      src="/photos/resistance_ww2_paris.webp" 
                      alt="Resistance in Paris" 
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 class="text-2xl font-bold text-white">The Resistance</h3>
                    </div>
                  </div>
                  <div class="p-6">
                    <p class="text-gray-700 leading-relaxed">
                      How did the Resistance start in the city? We will follow the steps of an early resistance fighter who was part of the first Resistance network in the town, called Musée de l'Homme.
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Liberation -->
              <div class="min-w-full">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div class="h-48 relative">
                    <img 
                      src="/photos/paris_ww2_liberation_1944_de_gaulle.webp" 
                      alt="Liberation of Paris 1944" 
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 class="text-2xl font-bold text-white">Liberation</h3>
                    </div>
                  </div>
                  <div class="p-6">
                    <p class="text-gray-700 leading-relaxed">
                      How did the Allies finally free Paris after four years of occupation? We will talk about the fights that took place in the city in August 1944, and you will see how closely Paris came to being greatly damaged.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Indicators -->
          <div class="flex justify-center mt-4 space-x-2" id="topics-indicators">
            <button class="w-3 h-3 rounded-full bg-gray-800 transition-all duration-200" data-index="0"></button>
            <button class="w-3 h-3 rounded-full bg-gray-300 transition-all duration-200" data-index="1"></button>
            <button class="w-3 h-3 rounded-full bg-gray-300 transition-all duration-200" data-index="2"></button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tour Stops Section -->
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Our 4 Historic Stops
      </h2>
      
      <!-- Stop 1: Introduction & History Catch-up -->
      <div class="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
            <h3 class="text-2xl font-bold text-gray-800">Boulevard Saint-Michel - Introduction</h3>
          </div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Begin your journey at this iconic boulevard with a presentation of the tour and a quick history quiz to put everyone on the same page! Discover how Paris looked on the eve of the German invasion and understand the strategic importance of this vibrant student quarter.
          </p>
        </div>
        <div class="relative">
          <img 
            src="/photos/left_bank/Paris_WW2_Sorbonne.webp" 
            alt="Boulevard Saint-Michel area" 
            class="rounded-lg shadow-lg w-full h-64 object-cover"
          />
        </div>
      </div>

      <!-- Stop 2: The Fall of Paris -->
      <div class="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div class="md:order-2">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
            <h3 class="text-2xl font-bold text-gray-800">Palais du Luxembourg - The Fall</h3>
          </div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Walk through the gardens of this magnificent palace and discover how Paris fell to the German army in only 35 days of combat. Learn about the crucial 35 days that changed the city forever and how the Nazis transformed this symbol of French culture into their military command center.
          </p>
        </div>
        <div class="md:order-1 relative">
          <img 
            src="/photos/left_bank/Paris_WW2_Luxembourg_palace.webp" 
            alt="Palais du Luxembourg during occupation" 
            class="rounded-lg shadow-lg w-full h-64 object-cover"
          />
        </div>
      </div>

      <!-- Stop 3: The Resistance -->
      <div class="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
            <h3 class="text-2xl font-bold text-gray-800">La Sorbonne - The Resistance</h3>
          </div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Visit the historic university where early resistance movements began. Follow the journey of a French female Resistance fighter who was part of the first Resistance network in the town, called Musée de l'Homme. Discover how students and professors organized clandestine networks and risked everything for freedom.
          </p>
        </div>
        <div class="relative">
          <img 
            src="/photos/left_bank/Paris_WW2_resistance_2.webp" 
            alt="Resistance memorial at Sorbonne" 
            class="rounded-lg shadow-lg w-full h-64 object-cover"
          />
        </div>
      </div>

      <!-- Stop 4: Liberation -->
      <div class="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div class="md:order-2">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
            <h3 class="text-2xl font-bold text-gray-800">Notre-Dame de Paris - Liberation</h3>
          </div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Conclude our tour at this iconic cathedral, witness to the liberation of Paris in August 1944. Learn more about the fights that took place in Paris 81 years ago. Stand where General de Gaulle proclaimed the freedom of the capital and discover how closely Paris came to being greatly damaged.
          </p>
        </div>
        <div class="md:order-1 relative">
          <img 
            src="/photos/left_bank/Paris_WW2_liberation_barricades.webp" 
            alt="Liberation barricades near Notre-Dame" 
            class="rounded-lg shadow-lg w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Experience the History
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="/photos/left_bank/Paris_WW2_bullet_holes_2.webp" alt="Bullet holes from the war" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_WW2_german_attack.webp" alt="German attack on Paris" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_ww2_group_photo.webp" alt="Tour group photo" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_WW2_guide.webp" alt="Your guide Clément" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_WW2_last_stop.webp" alt="Final stop of the tour" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_WW2_resistance.webp" alt="Resistance memorial" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_WW2_tour_guided_group_photo_2.webp" alt="Another group photo" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <img src="/photos/left_bank/Paris_WW2_tour_guided_group_photo_3.webp" alt="Group enjoying the tour" class="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      
      <!-- Booking Section moved here -->
      <div class="mt-16 max-w-2xl mx-auto">
        <BookTour tourFilter="left-bank" />
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="w-full py-8 bg-gray-100 border-t border-gray-200 text-center text-gray-600 text-sm">
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
      <div class="hidden md:block">
        © {new Date().getFullYear()} Paris History Tours<br/>
        <span class="text-xs">By Clément Daguet</span>
      </div>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex flex-col items-center md:items-start">
          <h4 class="font-semibold text-gray-800 mb-2">Contact</h4>
          <div class="flex flex-col gap-2 items-center md:items-start">
            <a href="https://wa.me/33620622480" target="_blank" class="text-gray-700 hover:text-gray-900 underline transition">WhatsApp</a>
            <a href="mailto:clemdaguetschott@gmail.com" class="text-gray-700 hover:text-gray-900 underline transition">Email</a>
          </div>
        </div>
      </div>
      <div class="md:hidden">
        © {new Date().getFullYear()} Paris History Tours<br/>
        <span class="text-xs">By Clément Daguet</span>
      </div>
    </div>
  </footer>
</BaseLayout>

<script>
  // Mobile topics carousel functionality
  let currentTopicIndex = 0;
  const totalTopics = 3;
  const topicsCarousel = document.getElementById('topics-carousel');
  const topicsIndicators = document.querySelectorAll('#topics-indicators button');

  function updateTopicsCarousel() {
    const offset = -currentTopicIndex * 100;
    if (topicsCarousel) {
      topicsCarousel.style.transform = `translateX(${offset}%)`;
    }
    
    topicsIndicators.forEach((indicator, index) => {
      indicator.classList.toggle('bg-gray-800', index === currentTopicIndex);
      indicator.classList.toggle('bg-gray-300', index !== currentTopicIndex);
    });
  }

  function nextTopic() {
    currentTopicIndex = (currentTopicIndex + 1) % totalTopics;
    updateTopicsCarousel();
  }

  // Indicators click
  topicsIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentTopicIndex = index;
      updateTopicsCarousel();
    });
  });

  // Touch/Swipe support for topics
  let topicsTouchStartX = 0;
  let topicsTouchEndX = 0;
  const minSwipeDistance = 50;

  if (topicsCarousel) {
    topicsCarousel.addEventListener('touchstart', (e) => {
      topicsTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    topicsCarousel.addEventListener('touchend', (e) => {
      topicsTouchEndX = e.changedTouches[0].screenX;
      handleTopicsSwipe();
    }, { passive: true });
  }

  function handleTopicsSwipe() {
    const deltaX = topicsTouchEndX - topicsTouchStartX;
    
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - previous
        currentTopicIndex = (currentTopicIndex - 1 + totalTopics) % totalTopics;
      } else {
        // Swipe left - next
        currentTopicIndex = (currentTopicIndex + 1) % totalTopics;
      }
      updateTopicsCarousel();
    }
  }

  // Auto-play topics carousel
  setInterval(nextTopic, 5000);
</script>