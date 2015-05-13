var Starship = React.createClass({
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
                width: this.props.data.dimensions.x + "em",
                height: this.props.data.dimensions.y + "em",
                top: this.props.data.position.y - (this.props.data.dimensions.y / 2) + "em",
                left: this.props.data.position.x - (this.props.data.dimensions.x / 2)  + "em",
                transform: "rotate(" + this.props.data.rotation + "deg)",
                backgroundColor: "#F50"
            }
        }
    }
})

module.exports = Starship
