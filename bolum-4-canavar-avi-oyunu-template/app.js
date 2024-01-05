const app = Vue.createApp({
    data() {
        return {
            player_heal: 100,
            monster_heal: 100,
            game_is_on:false,
            attack_multiple:10,
            special_attack_multiple:25,
            multiple_heal_up:20,
            attack_monster:15,
            log_text:{
                attack:"OYUNCU ATAĞI: ",
                special_attack:"ÖZEL OYUNCU ATAĞI: ",
                monster_attack:"CANAVAR ATAĞI: ",
                heal_up: "İLK YARDIM ",
                give_up:"OYUNCU PES ETTİ!!"
            },
            logs:[]
        };
    },
    methods: {
        start_game() {
            this.player_heal = 100;
            this.monster_heal = 100;
            this.game_is_on = true;
            this.logs = []
        },
        attack() {
            var point = Math.ceil(Math.random() * this.attack_multiple)
            this.monster_heal -= point;
            this.add_log({turn:"human",text:this.log_text.attack+"("+point+" Hasar)"});
            this.monster_attack()
        },
        special_attack() {
            var point = Math.ceil(Math.random() * this.special_attack_multiple)
            this.monster_heal -= point;
            this.add_log({turn:"human",text:this.log_text.special_attack+"("+point+" Hasar)"});
            this.monster_attack()
        },
        heal_up() {
            var point = Math.ceil(Math.random() * this.multiple_heal_up)
            this.player_heal += point;
            this.add_log({turn:"human",text:this.log_text.heal_up+"("+point+" Can)"});
        },
        give_up() {
            this.player_heal = 0;
            this.game_is_on = false;
            alert(this.log_text.give_up)
        },
        monster_attack(){
            var point = Math.ceil(Math.random() * this.attack_monster)
            this.player_heal -= point;
            this.add_log({turn:"monster",text: this.log_text.monster_attack+"("+point+" Hasar)"});
        },
        add_log(log){
            this.logs.push(log)
        }
    },
    watch:{
        player_heal: function(value){
            if(value <= 0){
                this.player_heal = 0
                if(confirm("Oyunu KAYBETTİN! Tekrar denemek ister misin?")){
                    this.start_game()
                }
            }else if(value >= 100){
                this.player_heal = 100
            }
        },
        monster_heal: function(value){
            if(value <= 0){
                this.monster_heal = 0
                if(confirm("Oyunu KAZANDIN! Tekrar denemek ister misin?")){
                    this.start_game()
                }
            }else if(value >= 100){
                this.monster_heal = 100
            }
        }
    },
    computed:{
        user_progress: function(){
            return {
                width: this.player_heal + '%'
            }
        },
        monster_progress:function(){
            return {
                width: this.monster_heal + '%'
            }
        }

    }
});

app.mount("#app");
