var Starship = require("<scripts>/components/Starship")
var GameFrame = require("<scripts>/components/GameFrame")

var StarshipStore = Phlux.createStore({
    initiateStore: function() {
        this.firebase = new Firebase("https://projstar.firebaseio.com/starship")
        this.firebase.on("value", function(data) {
            this.data = data.val()
            this.trigger()
        }.bind(this))
    },
    update: function(tick) {
        var starship = this.data
        if(starship.position != undefined) {
            if(Keyb.isDown("W") || Keyb.isDown("<up>")) {
                starship.position.y -= starship.acceleration * tick
            } if(Keyb.isDown("S") || Keyb.isDown("<down>")) {
                starship.position.y += starship.acceleration * tick
            } if(Keyb.isDown("A") || Keyb.isDown("<left>")) {
                starship.position.x -= starship.acceleration * tick
            } if(Keyb.isDown("D") || Keyb.isDown("<right>")) {
                starship.position.x += starship.acceleration * tick
            }
            this.firebase.update({"position": starship.position})
            this.trigger()
        }
    }
})

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(StarshipStore, "starship")
    ],
    render: function() {
        return (
            <GameFrame>
                <Starship data={this.state["starship"]}/>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            StarshipStore.update(tick)
        })
    }
})

module.exports = Game
