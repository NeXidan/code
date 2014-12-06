var React = require('react');
var Doc = require('../../models/doc');

var Popup = React.createClass({
    getInitialState: function () {
        return {
            name: ''
        };
    },

    render: function () {
        return (
            <div className='popup-wrap pos-fix'>
                <div className='popup-close pos-abs' onClick={this.props.handlePopup}></div>
                <div className='popup--centered'>
                    <div className='popup__content pos-rel'>
                        <div className='popup__content__body'>
                            <input ref='input' className='popup__content__body__input' onChange={this.handleChange}/>
                        </div>
                        <div className='popup__content__footer'>
                            <div className='popup__content__footer__btn-wrap'>
                                <button className='btn btn--sm' onClick={this.handleSave}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    handleChange: function () {
        this.setState({
            name: this.refs.input.getDOMNode().value
        });
    },

    handleSave: function () {
        Doc.create(this.state.name, function (d) {
            setTimeout(function () {window.location.pathname = '/' + d._id;}, 300);
        });
    }
});

module.exports = Popup;
