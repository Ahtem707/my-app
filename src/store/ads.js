export default {
    state: {
        ads: [
            {
              title: "First ad",
              description: "Hello, I am description",
              promo: false,
              imageSrc: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
              id: "1",
            },
            {
              title: "Second ad",
              description: "Hello, I am description",
              promo: true,
              imageSrc: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
              id: "2",
            },
            {
              title: "Third ad",
              description: "Hello, I am description",
              promo: true,
              imageSrc: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
              id: "3",
            },
          ],
    },
    mutations: {
        createAd(state,playload) {
            state.ads.push(playload)
        }
    },
    actions: {
        createAd({commit},payload) {
            payload.id = 'fhfhf',
            commit('createAd',payload)
        }
    },
    getters: {
        ads(state) {
            return state.ads
        },
        promoAds(state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds(state) {
            return state.ads
        },
        adById(state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}