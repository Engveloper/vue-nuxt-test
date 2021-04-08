export const state = () => ({
  fooddata: []
})

export const getters = {
  getterValue: state => {
    return state.value
  }
}

export const mutations = {
  updateFoodData: (state, payload) => {
    state.fooddata = payload
  }
}

export const actions = {
  async loadFoodData({state, commit}) {
    if (state.fooddata.length) {
      return
    }

    try {
      await fetch(
        'https://u6km5bb9yc.execute-api.us-east-2.amazonaws.com/prod/restaurants',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.AWS_API_KEY
          }
        }
      )
        .then(response => response.json())
        .then(data => commit('updateFoodData', data.fooddata))
    } catch (err) {
      console.log(err)
    }
  }
}
