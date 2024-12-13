// Home component (fetching top anime)
const Home = {
    template: `
        <div>
            <h1 class="title">Top 3 Anime</h1>
            <p class="subtitle">By Matthew Martins</p>
            <div id="anime-container">
                <div v-for="anime in topAnime" :key="anime.mal_id" class="anime-card">
                    <h2 class="title is-4">{{ anime.title }}</h2>
                    <figure class="image is-inline-block">
                        <img :src="anime.images.jpg.large_image_url" :alt="anime.title" />
                    </figure>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            topAnime: []
        }
    },
    mounted() {
        fetch('https://api.jikan.moe/v4/top/anime')
            .then(response => response.json())
            .then(data => {
                this.topAnime = data.data.slice(0,3);
            })
            .catch(err => console.error(err));
    }
};

// About component (static content)
const About = {
    template: `
        <div>
            <h1 class="title">About This App</h1>
            <p>This single-page application displays the top anime from the Jikan API and is styled with Bulma. Built with Vue.js for routing and dynamic rendering.</p>
            <p>Created by Matthew Martins.</p>
        </div>
    `
};

// Set up the router
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Create the Vue app
const app = Vue.createApp({});
app.use(router);
app.mount('#app');

