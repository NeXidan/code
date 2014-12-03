var Index = React.createClass({
    getInitialState: function(){
        return ({
            popupOpen: false
        });
    },
    handlePopup: function(evt){
        this.setState({popupOpen: !this.state.popupOpen});
    },
    render: function() {
        return (
            <div className="main-wrap main-wrap--padding js-get-main-wrap">
                <div className="main main--centered">
                    <Header/>
                    <div className="steps-wrap">
                        <Step number="1" title="Создать проект" text="Создайте проект простым нажатием кнопки" />
                        <Step number="2" title="Поделиться ссылкой" text="Поделитесь ссылкой со своими друзьями" />
                        <Step number="3" title="Начать работать" text="Начните работать вместе" />
                    </div>
                    <button className="btn btn--lg btn--icon icon-plus js-get-create-doc" onClick={this.handlePopup}>Создать</button>
                    {this.state.popupOpen && <Popup handlePopup={this.handlePopup}/>}
                </div>
            </div>
        );
    }
});
