<template>
  <div class="container-fluid field-background">
    <div class="container content">
      <h2 class="heading"> NFL Players: </h2>
      <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="(player, index) in players" :key="player.playerId"> 
          <div class="col">
            <div class="card">
              <div class="card-header breakdown">
                <h4>{{player.fullName}}</h4>
              </div>
              <img class = "card-img" :src="player.playerImage" alt="Player-Image">
              <div class="card-body">
                <h5>Team:</h5>
                <img class = "team-img" :src="player.teamImage" alt="Team-Image">
              </div>
              <div class="card-footer breakdown">
                <nuxt-link :to="`/players/${player.playerId}`" class="btn btn-primary">View Stats</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  async asyncData({ $axios }){
    try{
      let token = await $axios.$get('https://trumediaprojectapi.herokuapp.com/api/token');
      let nflPlayers = await $axios.$get('https://trumediaprojectapi.herokuapp.com/api/nfl/players');

      console.log(token);
      console.log(nflPlayers);

      return {
        token: token.result.token,
        players: nflPlayers.result
      }
    }catch(err){
      console.log(err);
    }
  }

}
</script>
