import './style.css'

// API Base URL - use environment variable in production, localhost in dev
const API_BASE = window.location.hostname === 'localhost' ? '' : '';
const API_URL = '/api/posts';

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-item h3');
const speed = 200;

const startCounter = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const inc = target / speed;

      const updateCount = () => {
        const currentCount = +entry.target.innerText.replace(/[^\d.]/g, '');
        if (currentCount < target) {
          const newValue = currentCount + inc;
          entry.target.innerText = newValue.toFixed(target % 1 === 0 ? 0 : 1) + (entry.target.getAttribute('data-target').includes('M') ? 'M+' : '+');
          setTimeout(updateCount, 1);
        } else {
          entry.target.innerText = target + (entry.target.getAttribute('data-target').includes('M') ? 'M+' : '+');
        }
      };
      updateCount();
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(startCounter, { threshold: 0.5 });
stats.forEach(stat => observer.observe(stat));

// Load blog posts from API
async function loadBlogPosts() {
  try {
    const response = await fetch(API_URL);
    const posts = await response.json();
    
    const blogContainer = document.querySelector('.blog-grid');
    
    if (posts.length > 0) {
      // Load first 4 posts into blog section
      const displayPosts = posts.slice(0, 4);
      blogContainer.innerHTML = displayPosts.map(post => `
        <div class="blog-card">
          <div class="blog-image" style="background-image: url('${post.image}')"></div>
          <div class="blog-content">
            <span class="blog-category">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="#">Ler Artigo →</a>
          </div>
        </div>
      `).join('');
    }
    
    // Load featured post (Newsletter do Dia)
    const featuredPost = posts.find(post => post.isFeatured);
    const newsletterSection = document.getElementById('newsletter-section');
    const featuredContainer = document.getElementById('featured-post');
    
    if (featuredPost) {
      newsletterSection.style.display = 'block';
      featuredContainer.innerHTML = `
        <div class="featured-post-card">
          <div class="featured-post-image" style="background-image: url('${featuredPost.image}')"></div>
          <div class="featured-post-content">
            <span class="blog-category">${featuredPost.category}</span>
            <h3>${featuredPost.title}</h3>
            <p>${featuredPost.excerpt}</p>
            <a href="#" class="btn-primary">Ler Artigo Completo</a>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

// Video Playback Handling (handle autoplay with/without sound)
function setupHeroVideo() {
  const video = document.getElementById('hero-video');
  if (!video) return;

  // Attempt to play with sound
  video.play().catch(error => {
    console.log("Autoplay with sound blocked, falling back to muted autoplay.");
    video.muted = true;
    video.play();
  });
}

// Load on page load
loadBlogPosts();
setupHeroVideo();

console.log('Paulo Agostinho Website Loaded');
