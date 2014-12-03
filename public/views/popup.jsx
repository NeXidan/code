var doc = require('../../services/doc')

var Popup = React.createClass({
    getInitialState: function() {
        return {
            content: ''
        };
    },
    handleChange: function() {
        this.setState({
            content: this.refs.textarea.getDOMNode().value
        });
    },
    handleSave: function() {
        doc.create(/*this.state.content,*/ function(d) {
            var win = window.open('/' + d._id, '_blank');
            win.focus();
        })
    },
    render: function() {
        return (
            <div className="popup-wrap pos-fix">
                <div className="popup-close pos-abs" onClick={this.props.handlePopup}></div>
                <div className="popup--centered">
                    <div className="popup__content pos-rel">
                        <div className="popup__content__body">
                            <textarea ref="textarea" rows="10" className="popup__content__body__text" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="popup__content__footer">
                            <div className="popup__content__footer__btn-wrap">
                                <button className="btn btn--sm" onClick={this.handleSave}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
