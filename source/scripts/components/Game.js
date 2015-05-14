var Missile = require("<scripts>/components/Missile")
var Starship = require("<scripts>/components/Starship")
var GameFrame = require("<scripts>/components/GameFrame")

var MissileStore = Phlux.createStore({
    initiateStore: function() {
        this.firebase = new Firebase("https://projstar.firebaseio.com/missiles")
        this.firebase.on("child_added", this.setViaFirebase.bind(this))
        this.firebase.on("child_changed", this.setViaFirebase.bind(this))
        this.firebase.on("child_removed", this.removeViaFirebase.bind(this))
    },
    setViaFirebase: function(child) {
        var key = child.key()
        var value = child.val()
        this.data[key] = value
        var today = Date.now()
        //var tick = today - value.birthday
        //this.update(tick, key)
    },
    removeViaFirebase: function(child) {
        var key = child.key()
        delete this.data[key]
    },
    update: function(tick, key) {
        if(key == undefined) {
            for(var key in this.data) {
                this.update(tick, key)
            }
        } else {
            var missile = this.data[key]
            missile.position.x += tick / 4
        }
    }
})

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
        Phlux.connectStore(StarshipStore, "starship"),
        Phlux.connectStore(MissileStore, "missiles")
    ],
    render: function() {
        return (
            <GameFrame>
                {this.renderEntities(Missile, this.state["missiles"])}
                <Starship data={this.state["starship"]}/>
            </GameFrame>
        )
    },
    renderEntities: function(Class, data) {
        var renderings = []
        for(var index in data) {
            renderings.push(
                <Class key={index}
                    data={data[index]}/>
            )
        }
        return renderings
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            StarshipStore.update(tick)
            MissileStore.update(tick)
        })
    }
})

module.exports = Game
