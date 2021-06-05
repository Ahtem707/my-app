import firebase from 'firebase'

class Ad {
    constructor (title, desc, ownerId, src = '', promo = false, id = null) {
      this.title = title
      this.desc = desc
      this.ownerId = ownerId
      this.src = src
      this.promo = promo
      this.id = id
    }
  }  

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd(state,payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
          state.ads = payload
        },
        updateAd (state, {title,desc,id}) {
          const ad = state.ads.find( a => {
            return a.id == id
          })
          ad.title = title,
          ad.desc = desc
        },
        deleteAd (state, {id}) {
          const ad = state.ads.find( a => {
            return a.id == id
          })
          console.log(ad)
          console.log(state.ads)
          delete state.ads[ad]
          console.log(state.ads)
        }
    },
    actions: {
      async createAd ({commit, getters}, payload) {
        commit('clearError')
        commit('setLoading', true)
        
        const image = payload.image
        const imageExt = payload.image.name.slice(payload.image.name.lastIndexOf("."))
        try {
          const newAd = new Ad(
            payload.title,
            payload.desc,
            getters.user.id,
            '',
            payload.promo,
            payload.id
          )
          const fbValue = await firebase.database().ref('ads').push(newAd)
      
          await firebase.storage().ref().child(`ads/${fbValue.key + imageExt}`).put(image).then(snapshot => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              const src = downloadURL
              firebase.database().ref("ads").child(fbValue.key).update({ src })
              commit('setLoading', false)
              commit('createAd', {
                ...newAd,
                id: fbValue.key,
                src
              })
            })
          })
        } catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
        }
      },  
      async fetchAds({commit}) {
        commit('clearError')
        commit('setLoading', true)
        try {
          const fbVal = await firebase.database().ref('ads').once('value')
          const ads = fbVal.val()
          const resultAds = []
          Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resultAds.push(
              new Ad(
                ad.title,
                ad.desc,
                ad.ownerId,
                ad.src,
                ad.promo,
                key
              )
            )
          })
          commit('loadAds', resultAds)
          commit('setLoading', false)
        }  catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
        }
      },
      async updateAd({commit}, {title,desc,id}) {
        commit('clearError')
        commit('setLoading', true)
        try {
          await firebase.database().ref('ads').child(id).update({
            title: title,
            desc: desc
          })
          commit('updateAd',{
            title,desc,id
          })
          commit('setLoading', false)
        } catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
        }
      },
      async deleteAd({commit}, {id}) {
        commit('clearError')
        commit('setLoading', true)
        try {
          await firebase.database().ref('ads').child(id).remove()
          commit('deleteAd',{
            id
          })
          commit('setLoading', false)
        } catch (error) {
          commit('setError', error.message)
          commit('setLoading', false)
          throw error
        }
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
        myAds(state, getters) {
          return state.ads.filter(ad => {
              return ad.ownerId == getters.user.id
          })
        },
        adById(state) {
            return adId => {
              return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}