var Body = React.createClass({
    getInitialState(){
        return { skills: [] }
    },

    handleDelete(id) {
        $.ajax({
            url: '/api/v1/skills/' + id,
            type: 'DELETE',
            success: () => {
                this.removeIdeaFromDOM(id);
            }
        });
    },

    removeIdeaFromDOM(id) {
        var newSkills = this.state.skills.filter((skill) => {
            return skill.id != id;
        })

        this.setState({ skills: newSkills });
    },

    componentDidMount(){
        $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
    },

    handleSubmit(skill) {
        var newState = this.state.skills.concat(skill);
        this.setState({ skills: newState })
    },

    render() {
        return(
            <div>
                <NewSkills handleSubmit={this.handleSubmit} />
                <AllSkills skills={this.state.skills} handleDelete={this.handleDelete} />
            </div>
        )
    }
});
