var Missile = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        if(this.props.data.position != undefined
        && this.props.data.dimensions != undefined
        && this.props.data.rotation != undefined) {
            return {
                position: "absolute",
                borderRadius: 0.075 + "em",
                width: this.props.data.dimensions.width + "em",
                height: this.props.data.dimensions.height + "em",
                top: this.props.data.position.y - (this.props.data.dimensions.height / 2) + "em",
                left: this.props.data.position.x - (this.props.data.dimensions.width / 2) + "em",
                transform: "rotate(" + this.props.data.rotation + "deg)",
                backgroundColor: "red"
            }
        }
    }
})

module.exports = Missile
