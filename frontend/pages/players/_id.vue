<template>
    <div class="container-fluid">
        <div class="container-fluid profile-header"> 
            <img class = "player-img" :src="playerGames[0].playerImage" alt="Player-Image">
            <div class="profile-description">
                <h4>Name: {{playerGames[0].fullName}}</h4>
                <h4>Position: QB</h4>
                <h4>Team: {{playerGames[0].team}}</h4>
                <img class= "profile-header-team-img" :src="playerGames[0].teamImage" alt="Team-Image">
            </div>
        </div>
        <div class="container-fluid field-background">
        <div class="container year-breakdown ">
            <h3 class="heading"> {{playerGames[0].fullName}} 2018 Season Breakdown </h3>
            <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div v-for="(playerGame, index) in playerGames" :key="playerGame.week">
                    <div class="col">
                        <div class="card">
                            <div class="card-header breakdown">
                                <h4> Week {{playerGame.week}}: <br> {{playerGame.team}} vs. {{playerGame.opponent}}</h4>
                            </div>
                            <div class="card-body">
                                <img class = "profile-team-img" :src="playerGame.teamImage" alt="Team-Image">
                                <p>vs</p>
                                <img class = "profile-opp-img" :src="playerGame.opponentImage" alt="Opp-Image">
                                <p>Game Time: {{playerGame.gameDate}}</p>
                            </div>
                            <div class="card-footer breakdown">
                                <h5> Stats: </h5>
                                <h6 class="derived-rate">Yards/Attempt: {{Math.round(((playerGame.PsYds + playerGame.RshYds) / (playerGame.Att)) * 100) / 100 }}</h6>
                                <h6 class="derived-rate"> Completion%: {{Math.round((playerGame.Cmp / playerGame.Att) * 100) / 100}}</h6>
                                <h6 class="floating-stat"> Att: {{playerGame.Att}} </h6>
                                <h6> Cmp: {{playerGame.Cmp}}</h6>
                                <h6 class="floating-stat"> Sack: {{playerGame.Sack}}</h6>
                                <h6> Int: {{playerGame.Int}}</h6>
                                <h6 class="floating-stat"> PsYds: {{playerGame.PsYds}}</h6>
                                <h6> PsTD: {{playerGame.PsTD}}</h6>
                                <h6 class="floating-stat"> Rush: {{playerGame.Rush}}</h6>
                                <h6> RshYds: {{playerGame.RshYds}}</h6>
                                <h6> RshTD: {{playerGame.RshTD}}</h6>
                            </div>
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
    name: 'Player',
    async asyncData({ $axios, params }){
    try{
      let player = await $axios.$get(`https://trumediaprojectapi.herokuapp.com/api/nfl/player/${params.id}`);

      return {
        playerGames: player.result
      }
    }catch(err){
      console.log(err);
    }
  }
}
</script>